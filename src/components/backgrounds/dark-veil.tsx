"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

type DarkVeilProps = {
  speed?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
};

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uNoiseIntensity;
  uniform float uScanlineIntensity;
  uniform float uScanlineFrequency;
  uniform float uWarpAmount;
  uniform vec2 uResolution;

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float time = uTime * 0.18;
    float flow = fbm(p * 2.0 + vec2(time * 0.58, -time * 0.25));
    float veil = fbm(p * 3.4 + vec2(-time * 0.22, flow * 1.8));
    float warp = fbm(p * 1.3 + vec2(flow, time * 0.38));

    p += (warp - 0.5) * uWarpAmount;

    float bands = smoothstep(0.35, 0.92, fbm(p * 2.6 + vec2(time, -time * 0.62)));
    float glow = smoothstep(0.18, 0.95, veil) * 0.66 + bands * 0.62;
    float grain = (hash(uv * uResolution + uTime) - 0.5) * uNoiseIntensity;
    float scanline = sin(uv.y * uResolution.y * uScanlineFrequency) * uScanlineIntensity;

    float value = clamp(glow + grain + scanline, 0.0, 1.0);
    vec3 color = vec3(value);

    gl_FragColor = vec4(color, value);
  }
`;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

export default function DarkVeil({
  speed = 0.28,
  noiseIntensity = 0.03,
  scanlineIntensity = 0,
  scanlineFrequency = 0,
  warpAmount = 0.25,
  resolutionScale = 0.75
}: DarkVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || prefersReducedMotion) {
      return;
    }

    const renderer = new Renderer({
      canvas,
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power"
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const uniforms = {
      uTime: { value: 0 },
      uNoiseIntensity: { value: noiseIntensity },
      uScanlineIntensity: { value: scanlineIntensity },
      uScanlineFrequency: { value: scanlineFrequency },
      uWarpAmount: { value: warpAmount },
      uResolution: { value: new Vec2(1, 1) }
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    const mesh = new Mesh(gl, { geometry, program });

    let animationFrame = 0;
    let startTime = performance.now();

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const scaledWidth = Math.max(1, Math.floor(width * resolutionScale));
      const scaledHeight = Math.max(1, Math.floor(height * resolutionScale));

      renderer.setSize(scaledWidth, scaledHeight);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      uniforms.uResolution.value.set(scaledWidth, scaledHeight);
    };

    const render = (now: number) => {
      uniforms.uTime.value = ((now - startTime) / 1000) * speed;
      renderer.render({ scene: mesh });
      animationFrame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      geometry.remove();
      program.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      startTime = 0;
    };
  }, [
    noiseIntensity,
    prefersReducedMotion,
    resolutionScale,
    scanlineFrequency,
    scanlineIntensity,
    speed,
    warpAmount
  ]);

  if (prefersReducedMotion !== false) {
    return (
      <div className="h-full w-full bg-[radial-gradient(circle_at_32%_64%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_72%_48%,rgba(255,255,255,0.1),transparent_28%)]" />
    );
  }

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}

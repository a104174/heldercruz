"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

const smoothEasing = (time: number) => 1 - Math.pow(1 - time, 4);

function shouldPreventSmoothScroll(node: HTMLElement) {
  return node.closest("[data-lenis-prevent]") !== null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId: number | null = null;
    let lenis: Lenis | null = null;

    const destroyLenis = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      lenis?.destroy();
      lenis = null;
    };

    const initLenis = () => {
      if (motionQuery.matches || lenis) {
        return;
      }

      lenis = new Lenis({
        duration: 1.1,
        easing: smoothEasing,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        syncTouch: false,
        anchors: {
          offset: -96,
          duration: 1,
          easing: smoothEasing
        },
        stopInertiaOnNavigate: true,
        prevent: shouldPreventSmoothScroll
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };

      animationFrameId = requestAnimationFrame(raf);
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        destroyLenis();
        return;
      }

      initLenis();
    };

    initLenis();
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
      destroyLenis();
    };
  }, []);

  return children;
}

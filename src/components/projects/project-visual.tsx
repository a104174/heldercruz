import type { CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  compact?: boolean;
};

export function ProjectVisual({ project, className, compact }: ProjectVisualProps) {
  const style = {
    "--project-accent": project.accent
  } as CSSProperties;

  if (project.slug === "hausb") {
    return (
      <div
        className={cn(
          "group/visual relative overflow-hidden rounded-lg border border-line bg-[#111111]",
          compact ? "aspect-[4/3]" : "aspect-[16/10]",
          className
        )}
        aria-label={project.image.alt}
      >
        <Image
          src={compact ? "/hausb/hausb-home.webp" : "/hausb/mac2.webp"}
          alt=""
          fill
          className="object-cover object-top transition duration-700 group-hover/visual:scale-[1.03]"
          sizes={compact ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 900px, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.3))]" />
        <p className="sr-only">{project.image.label}</p>
      </div>
    );
  }

  if (project.slug === "xv-studio") {
    return (
      <div
        className={cn(
          "group/visual relative overflow-hidden rounded-lg border border-line bg-[#111111]",
          compact ? "aspect-[4/3]" : "aspect-[16/10]",
          className
        )}
        aria-label={project.image.alt}
      >
        <Image
          src={compact ? "/xvstudio/xvstudio-home-mobile.webp" : "/xvstudio/xvstudio-home.webp"}
          alt=""
          fill
          className="object-cover object-top transition duration-700 group-hover/visual:scale-[1.03]"
          sizes={compact ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 900px, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(0,0,0,0.32))]" />
        <p className="sr-only">{project.image.label}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-soft",
        compact ? "aspect-[4/3]" : "aspect-[16/10]",
        className
      )}
      style={style}
      aria-label={project.image.alt}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(230,230,230,0.35))]" />
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        <span className="h-2 w-20 rounded-full bg-neutral-300" />
      </div>
      <div className="absolute inset-x-5 bottom-5 top-14 grid grid-cols-5 gap-3">
        <div className="col-span-2 rounded-lg bg-[var(--project-accent)] p-4 text-white">
          <span className="block h-2 w-16 rounded-full bg-white/35" />
          <span className="mt-5 block h-8 w-24 rounded bg-white/15" />
          <span className="mt-3 block h-2 w-full rounded-full bg-white/25" />
          <span className="mt-2 block h-2 w-3/4 rounded-full bg-white/25" />
        </div>
        <div className="col-span-3 grid gap-3">
          <div className="rounded-lg border border-line bg-white p-4">
            <span className="block h-2 w-24 rounded-full bg-neutral-300" />
            <span className="mt-5 block h-8 w-full rounded bg-neutral-100" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-line bg-white p-4">
              <span className="block h-2 w-16 rounded-full bg-neutral-300" />
              <span className="mt-4 block h-8 rounded bg-neutral-100" />
            </div>
            <div className="rounded-lg border border-line bg-white p-4">
              <span className="block h-2 w-14 rounded-full bg-neutral-300" />
              <span className="mt-4 block h-8 rounded bg-neutral-100" />
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only">{project.image.label}</p>
    </div>
  );
}

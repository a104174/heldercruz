"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
import { PortfolioInteractiveButton } from "@/components/ui/portfolio-interactive-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { projects, type Project, type ProjectSlug } from "@/data/projects";
import { cn } from "@/lib/utils";

const visualVariants: Record<ProjectSlug, "browser" | "mobile" | "website"> = {
  "casa-benfica-lenzburg": "browser",
  "xv-studio": "mobile",
  hausb: "website"
};

function TagList({ project, align = "start" }: { project: Project; align?: "start" | "end" }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5",
        align === "end" ? "justify-start md:justify-end" : "justify-start"
      )}
    >
      {project.techStack.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-black/10 bg-[#fbfaf7] px-2.5 py-1 text-[8px] font-bold uppercase tracking-normal text-black/45 transition-all duration-300 group-hover:border-black/30 group-hover:bg-black group-hover:text-white"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="relative h-[58%] w-[68%] rounded-[22px] border border-white/75 bg-[#fbf8f7] shadow-[0_24px_36px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03] group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)]">
      <div className="absolute left-5 top-4 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-black/10 transition-colors duration-300 group-hover:bg-rose-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/10 transition-colors delay-75 duration-300 group-hover:bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/10 transition-colors delay-150 duration-300 group-hover:bg-emerald-400/60" />
      </div>
      <div className="absolute inset-x-6 top-12 h-4 w-[32%] rounded-full bg-black/[0.035] transition-all duration-700 ease-out group-hover:w-[50%]" />
      <div className="absolute left-6 right-6 top-20 grid h-24 grid-cols-[1fr_0.8fr_1.55fr] gap-3">
        <span className="rounded-xl bg-black/[0.025] transition-transform duration-500 ease-out group-hover:-translate-y-1" />
        <span className="rounded-xl bg-black/[0.025] transition-transform delay-75 duration-500 ease-out group-hover:-translate-y-1" />
        <span className="rounded-xl bg-black/[0.025] transition-transform delay-150 duration-500 ease-out group-hover:-translate-y-1" />
      </div>
      <div className="absolute bottom-6 left-6 right-6 top-48 rounded-xl bg-black/[0.025] transition-transform duration-700 ease-out group-hover:-translate-y-1.5" />
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="relative h-[79%] w-[68%] max-w-[380px] rounded-[22px] border border-white/75 bg-[#fbf8f7] shadow-[0_24px_34px_rgba(0,0,0,0.13)] transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03] group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)]">
      <div className="absolute inset-x-0 top-[28%] h-px bg-black/[0.035]" />
      <div className="absolute left-5 top-[18%] h-5 w-[46%] rounded-full bg-black/[0.035] transition-all duration-700 ease-out group-hover:w-[60%]" />
      <div className="absolute left-5 right-5 top-[36%] space-y-3">
        <span className="block h-2.5 w-[72%] rounded-full bg-black/[0.025] transition-all duration-500 ease-out group-hover:w-[90%]" />
        <span className="block h-2.5 w-full rounded-full bg-black/[0.018] transition-all delay-75 duration-500 ease-out group-hover:w-[85%]" />
        <span className="block h-2.5 w-[82%] rounded-full bg-black/[0.018] transition-all delay-150 duration-500 ease-out group-hover:w-[95%]" />
      </div>
      <div className="absolute bottom-6 left-5 right-5 grid h-[34%] grid-cols-2 gap-3">
        <span className="rounded-xl bg-black/[0.025] transition-transform duration-500 ease-out group-hover:-translate-y-1" />
        <span className="rounded-xl bg-black/[0.025] transition-transform delay-75 duration-500 ease-out group-hover:-translate-y-1" />
      </div>
    </div>
  );
}

function WebsiteMockup() {
  return (
    <div className="relative h-[79%] w-[68%] max-w-[380px] rounded-[22px] border border-white/75 bg-[#fbf8f7] shadow-[0_24px_34px_rgba(0,0,0,0.13)] transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03] group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.18)]">
      <div className="absolute left-5 top-5 h-3 w-8 rounded-full bg-black/[0.035] transition-all duration-500 group-hover:w-12" />
      <div className="absolute right-5 top-6 h-1.5 w-7 rounded-full bg-black/[0.025] transition-all duration-500 group-hover:w-10" />
      <div className="absolute left-5 right-5 top-14 h-[32%] rounded-xl bg-black/[0.018] transition-transform duration-700 ease-out group-hover:-translate-y-1">
        <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.035] transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="absolute left-1/2 top-[57%] h-5 w-[45%] -translate-x-1/2 rounded-full bg-black/[0.035] transition-all duration-700 ease-out group-hover:w-[65%]" />
      <div className="absolute bottom-14 left-8 right-8 space-y-4">
        <span className="block h-2.5 rounded-full bg-black/[0.025] transition-all duration-500 ease-out group-hover:w-[90%]" />
        <span className="block h-2.5 rounded-full bg-black/[0.018] transition-all delay-75 duration-500 ease-out group-hover:w-[75%]" />
      </div>
    </div>
  );
}

function WorkVisual({
  project,
  featured = false
}: {
  project: Project;
  featured?: boolean;
}) {
  const variant = visualVariants[project.slug];

  if (project.slug === "casa-benfica-lenzburg") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-[24px] border border-black/10 bg-[#111111]",
          featured ? "aspect-[16/9] min-h-[340px] md:min-h-[640px]" : "aspect-square min-h-[280px]"
        )}
        aria-label={project.image.alt}
      >
        <Image
          src={
            featured
              ? "/benfica/screenshot_1.5x_postspark_2026-06-22_21-23-52.webp"
              : "/benfica/screenshot_1.5x_postspark_2026-06-23_02-59-08.webp"
          }
          alt=""
          fill
          className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
          sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.34))] opacity-70 transition-opacity duration-700 group-hover:opacity-35" />
        <p className="sr-only">{project.image.label}</p>
      </div>
    );
  }

  if (project.slug === "hausb") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-[24px] border border-black/10 bg-[#111111]",
          featured ? "aspect-[16/9] min-h-[340px] md:min-h-[640px]" : "aspect-square min-h-[280px]"
        )}
        aria-label={project.image.alt}
      >
        <Image
          src={featured ? "/hausb/mac2.webp" : "/hausb/hausb-home.webp"}
          alt=""
          fill
          className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
          sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.34))] opacity-80 transition-opacity duration-700 group-hover:opacity-45" />
        <p className="sr-only">{project.image.label}</p>
      </div>
    );
  }

  if (project.slug === "xv-studio") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-[24px] border border-black/10 bg-[#111111]",
          featured ? "aspect-[16/9] min-h-[340px] md:min-h-[640px]" : "aspect-square min-h-[280px]"
        )}
        aria-label={project.image.alt}
      >
        <Image
          src={featured ? "/xvstudio/xvstudio-home.webp" : "/xvstudio/xvstudio-home-mobile.webp"}
          alt=""
          fill
          className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
          sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.34))] opacity-80 transition-opacity duration-700 group-hover:opacity-45" />
        <p className="sr-only">{project.image.label}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[24px] border border-black/10 bg-[#efede9] transition-colors duration-700 group-hover:bg-[#e6e4df]",
        featured ? "aspect-[16/9] min-h-[340px] md:min-h-[640px]" : "aspect-square min-h-[280px]"
      )}
      aria-label={project.image.alt}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.72),rgba(255,255,255,0)_42%)] transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60" />
      {variant === "browser" && <BrowserMockup />}
      {variant === "mobile" && <MobileMockup />}
      {variant === "website" && <WebsiteMockup />}
      <p className="sr-only">{project.image.label}</p>
    </div>
  );
}

function ProjectTile({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={cn("group", featured && "md:col-span-2")}>
      <Link
        href={project.href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <WorkVisual project={project} featured={featured} />
        <div
          className={cn(
            "mt-5 grid gap-3",
            featured ? "md:grid-cols-[1fr_auto] md:items-start" : "grid-cols-1"
          )}
        >
          <div>
            <h2 className="text-2xl font-medium leading-none tracking-normal text-black transition-transform duration-500 group-hover:translate-x-1 md:text-[28px]">
              {project.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-5 text-black/52 transition-colors duration-500 group-hover:text-black/70">
              {project.shortDescription}
            </p>
          </div>
          <TagList project={project} align={featured ? "end" : "start"} />
        </div>
      </Link>
    </article>
  );
}

export function WorkPage() {
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-40 lg:px-10">
        <AnimatedReveal className="max-w-[620px]">
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-black/38"
          >
            Portfolio / Work
          </motion.p>
          
          <TextAnimate 
            animation="blurIn" 
            as="h1" 
            duration={0.8}
            className="text-[48px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[72px] md:text-[80px]"
          >
            Selected Work
          </TextAnimate>
          
          <div className="mt-7 min-h-[84px] max-w-[600px] md:min-h-[56px]">
            <TypingAnimation 
              duration={25}
              className="text-left text-[15px] font-normal leading-7 text-black/56 tracking-normal"
            >
              Three real-world projects built for clients, combining clean interfaces, responsive design and practical business-focused features.
            </TypingAnimation>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-24 grid gap-x-16 gap-y-32 md:grid-cols-2">
          <ProjectTile project={featuredProject} featured />
          {secondaryProjects.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="mt-36">
          <div className="group flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-black/10 bg-[#efede9] px-6 py-16 text-center transition-all duration-700 hover:border-transparent hover:bg-[#111111] md:min-h-[430px]">
            <h2 className="text-[42px] font-semibold leading-none tracking-normal text-black transition-colors duration-700 group-hover:text-white sm:text-[58px] md:text-[72px]">
              Have a project in mind?
            </h2>
            <p className="mt-6 max-w-[520px] text-[13px] leading-6 text-black/48 transition-colors duration-700 group-hover:text-white/60">
              Let&apos;s discuss how we can work together to build something beautiful and functional.
            </p>
            <ContactTrigger asChild>
              <PortfolioInteractiveButton className="mt-8 transition-transform duration-500 group-hover:scale-110">
                Contacto
              </PortfolioInteractiveButton>
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

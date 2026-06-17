import Link from "next/link";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
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
          className="rounded-full border border-black/10 bg-[#fbfaf7] px-2.5 py-1 text-[8px] font-bold uppercase tracking-normal text-black/45"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="relative h-[58%] w-[68%] rounded-[22px] border border-white/75 bg-[#fbf8f7] shadow-[0_24px_36px_rgba(0,0,0,0.12)]">
      <div className="absolute left-5 top-4 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
      </div>
      <div className="absolute inset-x-6 top-12 h-4 w-[32%] rounded-full bg-black/[0.035]" />
      <div className="absolute left-6 right-6 top-20 grid h-24 grid-cols-[1fr_0.8fr_1.55fr] gap-3">
        <span className="rounded-xl bg-black/[0.025]" />
        <span className="rounded-xl bg-black/[0.025]" />
        <span className="rounded-xl bg-black/[0.025]" />
      </div>
      <div className="absolute bottom-6 left-6 right-6 top-48 rounded-xl bg-black/[0.025]" />
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="relative h-[79%] w-[68%] max-w-[380px] rounded-[22px] border border-white/75 bg-[#fbf8f7] shadow-[0_24px_34px_rgba(0,0,0,0.13)]">
      <div className="absolute inset-x-0 top-[28%] h-px bg-black/[0.035]" />
      <div className="absolute left-5 top-[18%] h-5 w-[46%] rounded-full bg-black/[0.035]" />
      <div className="absolute left-5 right-5 top-[36%] space-y-3">
        <span className="block h-2.5 w-[72%] rounded-full bg-black/[0.025]" />
        <span className="block h-2.5 w-full rounded-full bg-black/[0.018]" />
        <span className="block h-2.5 w-[82%] rounded-full bg-black/[0.018]" />
      </div>
      <div className="absolute bottom-6 left-5 right-5 grid h-[34%] grid-cols-2 gap-3">
        <span className="rounded-xl bg-black/[0.025]" />
        <span className="rounded-xl bg-black/[0.025]" />
      </div>
    </div>
  );
}

function WebsiteMockup() {
  return (
    <div className="relative h-[79%] w-[68%] max-w-[380px] rounded-[22px] border border-white/75 bg-[#fbf8f7] shadow-[0_24px_34px_rgba(0,0,0,0.13)]">
      <div className="absolute left-5 top-5 h-3 w-8 rounded-full bg-black/[0.035]" />
      <div className="absolute right-5 top-6 h-1.5 w-7 rounded-full bg-black/[0.025]" />
      <div className="absolute left-5 right-5 top-14 h-[32%] rounded-xl bg-black/[0.018]">
        <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.035]" />
      </div>
      <div className="absolute left-1/2 top-[57%] h-5 w-[45%] -translate-x-1/2 rounded-full bg-black/[0.035]" />
      <div className="absolute bottom-14 left-8 right-8 space-y-4">
        <span className="block h-2.5 rounded-full bg-black/[0.025]" />
        <span className="block h-2.5 rounded-full bg-black/[0.018]" />
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

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[24px] border border-black/10 bg-[#efede9]",
        featured ? "aspect-[16/9] min-h-[340px] md:min-h-[640px]" : "aspect-square min-h-[280px]"
      )}
      aria-label={project.image.alt}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.72),rgba(255,255,255,0)_42%)]" />
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
            <h2 className="text-2xl font-medium leading-none tracking-normal text-black md:text-[28px]">
              {project.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-5 text-black/52">
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
    <PageShell className="bg-[#f8f6f1]">
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-40 lg:px-10">
        <AnimatedReveal className="max-w-[620px]">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-black/38">
            Portfolio / Work
          </p>
          <h1 className="text-[48px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[72px] md:text-[80px]">
            Selected Work
          </h1>
          <p className="mt-7 max-w-[600px] text-[15px] leading-7 text-black/56">
            Three real-world projects built for clients, combining clean interfaces, responsive
            design and practical business-focused features.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-24 grid gap-x-16 gap-y-32 md:grid-cols-2">
          <ProjectTile project={featuredProject} featured />
          {secondaryProjects.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </AnimatedReveal>

        <AnimatedReveal delay={0.1} className="mt-36">
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-black/10 bg-[#efede9] px-6 py-16 text-center md:min-h-[430px]">
            <h2 className="text-[42px] font-semibold leading-none tracking-normal text-black sm:text-[58px] md:text-[72px]">
              Have a project in mind?
            </h2>
            <p className="mt-6 max-w-[520px] text-[13px] leading-6 text-black/48">
              Let&apos;s discuss how we can work together to build something beautiful and functional.
            </p>
            <ContactTrigger
              variant="ghost"
              size="sm"
              className="mt-8 !h-11 !rounded-full !bg-black !px-7 !text-[10px] !font-bold !uppercase !text-white hover:!bg-black/82"
            >
              Contact Me
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

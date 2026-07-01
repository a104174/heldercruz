import type { Metadata } from "next";
import Image from "next/image";
import { Database, GitBranch, Layers, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ProjectHero } from "@/components/projects/project-hero";
import {
  ProjectHorizontalGallery,
  type ProjectGalleryItem
} from "@/components/projects/project-horizontal-gallery";
import { TechnicalNotesSection } from "@/components/projects/technical-notes-section";
import { ProjectVisual } from "@/components/projects/project-visual";
import { PortfolioInteractiveLink } from "@/components/ui/portfolio-interactive-button";
import { getNextProject, getProjectBySlug, projects, type Project } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
    locale?: string;
  }>;
};

type ProjectDetailCopy = ReturnType<typeof getDictionary>["projectDetail"];
type ProjectScreenshot = {
  src: string;
  title: string;
  description: string;
};

function resolveProjectLocale(locale?: string): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}

function createProjectMeta(
  copy: ProjectDetailCopy,
  {
    role,
    stack,
    focus
  }: {
    role: string;
    stack: string;
    focus: string;
  }
) {
  return [
    { label: copy.metaLabels.role, value: role },
    { label: copy.metaLabels.type, value: copy.clientProject },
    { label: copy.metaLabels.stack, value: stack },
    { label: copy.metaLabels.focus, value: focus }
  ];
}

function ProjectMetaGrid({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <AnimatedReveal
      delay={0.05}
      className="mx-auto mt-14 grid max-w-[840px] gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <div key={item.label} className="border border-black/8 bg-[#efede9] px-5 py-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/32">
            {item.label}
          </p>
          <p className="mt-2 text-[12px] font-medium leading-5 text-black">{item.value}</p>
        </div>
      ))}
    </AnimatedReveal>
  );
}

const casaScreenshotImages = [
  "/benfica/screenshot_1.5x_postspark_2026-06-25_00-35-09.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_01-10-54.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_00-21-14.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_01-17-57.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_01-15-35.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_00-35-51.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_00-37-25.webp",
  "/benfica/screenshot_1.5x_postspark_2026-06-25_00-38-16.webp"
] as const;

const casaMobileScreenshotImages = [
  "/benfica/device-mockup_1.5x_postspark_2026-06-25_01-21-47.webp",
  "/benfica/device-mockup_1.5x_postspark_2026-06-25_01-22-15.webp"
] as const;

const casaChallengeIcons = [Database, GitBranch, Layers, Rocket] as const;

const hausbScreenshotImages = [
  "/hausb/hausb-home.webp",
  "/hausb/hausb-arquitetura.webp",
  "/hausb/hausb-construcao.webp",
  "/hausb/hausb-lsf.webp",
  "/hausb/hausb-about.webp",
  "/hausb/hausb-portfolio.webp",
  "/hausb/hausb-contacto.webp",
  "/hausb/hausb-mobile-menu.webp",
  "/hausb/hausb-mobile-construcao.webp"
] as const;

const xvStudioScreenshotImages = [
  "/xvstudio/xv-home.webp",
  "/xvstudio/xv-foto.webp",
  "/xvstudio/xv-laser.webp",
  "/xvstudio/xv-contacto.webp",
  "/xvstudio/xv-modal-contacto.webp",
  "/xvstudio/xv-backoffice.webp",
  "/xvstudio/xv-edicao.webp",
  "/xvstudio/xv-mobile-home.webp",
  "/xvstudio/xv-mobile-websites.webp"
] as const;

function toGalleryItems(
  screenshots: ProjectScreenshot[],
  projectName: string
): ProjectGalleryItem[] {
  return screenshots.map((screenshot) => ({
    title: screenshot.title,
    description: screenshot.description,
    image: screenshot.src,
    alt: `${screenshot.title} - ${projectName}`
  }));
}

function getCasaScreenshots(copy: ProjectDetailCopy): ProjectScreenshot[] {
  return casaScreenshotImages.map((src, index) => ({
    src,
    title: copy.casaScreenshots[index]?.title ?? "Casa Benfica Lenzburg",
    description: copy.casaScreenshots[index]?.description ?? ""
  }));
}

function getCasaMobileScreenshots(copy: ProjectDetailCopy): ProjectScreenshot[] {
  return casaMobileScreenshotImages.map((src, index) => ({
    src,
    title: copy.casaMobileScreenshots[index]?.title ?? "Casa Benfica Lenzburg",
    description: copy.casaMobileScreenshots[index]?.description ?? ""
  }));
}

function getHausbScreenshots(copy: ProjectDetailCopy): ProjectScreenshot[] {
  return hausbScreenshotImages.map((src, index) => ({
    src,
    title: copy.hausbScreenshots[index]?.title ?? "HAUSB",
    description: copy.hausbScreenshots[index]?.description ?? ""
  }));
}

function getXvStudioScreenshots(copy: ProjectDetailCopy): ProjectScreenshot[] {
  return xvStudioScreenshotImages.map((src, index) => ({
    src,
    title: copy.xvStudioScreenshots[index]?.title ?? "XV Studio",
    description: copy.xvStudioScreenshots[index]?.description ?? ""
  }));
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale: localeParam } = await params;
  const locale = resolveProjectLocale(localeParam);
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: "Project"
    };
  }

  return createLocalizedMetadata({
    locale,
    pathname: `/projects/${project.slug}`,
    title: project.title,
    description: project.shortDescription
  });
}

function HeroVisual() {
  return (
    <AnimatedReveal delay={0.08}>
      <div className="relative mt-28 overflow-hidden rounded-[34px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
        <Image
          src={casaScreenshotImages[0]}
          alt="Casa Benfica Lenzburg public website homepage mockup"
          width={1800}
          height={1440}
          priority
          className="h-auto w-full object-cover object-top"
          sizes="(min-width: 1280px) 1120px, 100vw"
        />
      </div>
    </AnimatedReveal>
  );
}

function ChallengeCard({
  challenge
}: {
  challenge: ProjectDetailCopy["casaChallenges"][number] & {
    icon: (typeof casaChallengeIcons)[number];
  };
}) {
  const Icon = challenge.icon;

  return (
    <article className="rounded-[20px] border border-black/10 bg-white px-7 py-6">
      <Icon aria-hidden="true" className="h-5 w-5 stroke-[1.7] text-black/70" />
      <h3 className="mt-8 text-lg font-medium leading-none tracking-normal text-black">
        {challenge.title}
      </h3>
      <p className="mt-4 text-[12px] leading-6 text-black/52">{challenge.description}</p>
    </article>
  );
}

function CasaScreenshotCard({
  screenshot,
  priority = false,
  className
}: {
  screenshot: ProjectScreenshot;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-sm", className)}>
      <div className="relative aspect-[5/4] overflow-hidden bg-[#111111]">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} mockup from Casa Benfica Lenzburg`}
          fill
          priority={priority}
          className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-none text-black">{screenshot.title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/55">{screenshot.description}</p>
      </div>
    </article>
  );
}

function CasaMobileScreenshotCard({
  screenshot,
  priority = false,
  className
}: {
  screenshot: ProjectScreenshot;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} - Casa Benfica Lenzburg`}
          fill
          priority={priority}
          className="object-cover object-center transition duration-700 group-hover:scale-[1.035]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-none text-black">{screenshot.title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/55">{screenshot.description}</p>
      </div>
    </article>
  );
}

function HausbScreenshotCard({
  screenshot,
  priority = false,
  className
}: {
  screenshot: ProjectScreenshot;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm", className)}>
      <div className="relative aspect-[5/4] overflow-hidden bg-[#111111]">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} - HAUSB`}
          fill
          priority={priority}
          className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-none text-black">{screenshot.title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/55">{screenshot.description}</p>
      </div>
    </article>
  );
}

function XvStudioScreenshotCard({
  screenshot,
  priority = false,
  className
}: {
  screenshot: ProjectScreenshot;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} - XV Studio`}
          fill
          priority={priority}
          className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-none text-black">{screenshot.title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/55">{screenshot.description}</p>
      </div>
    </article>
  );
}

function XvStudioProjectPage({
  project,
  locale,
  copy
}: {
  project: Project;
  locale: Locale;
  copy: ProjectDetailCopy;
}) {
  const nextProject = getNextProject(project.slug, locale);
  const xvStudioScreenshots = getXvStudioScreenshots(copy);
  const metaItems = createProjectMeta(copy, {
    role: project.role,
    stack: "Next.js / TypeScript",
    focus: copy.xvMetaFocus
  });

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-28 sm:px-8 md:pb-36 md:pt-36 lg:px-10">
        <AnimatedReveal className="mx-auto max-w-[920px] text-center">
          <span className="inline-flex rounded-full border border-black/10 bg-[#f2f0ec] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/38">
            {copy.caseStudy}
          </span>
          <h1 className="mt-6 text-[52px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[78px] md:text-[96px]">
            {project.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-[15px] leading-7 text-black/56">
            {project.longDescription}
          </p>
        </AnimatedReveal>

        <ProjectMetaGrid items={metaItems} />

        <AnimatedReveal delay={0.08} className="mt-16 overflow-hidden rounded-[34px] border border-black/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
          <Image
            src="/xvstudio/xv-home.webp"
            alt={project.image.alt}
            width={1440}
            height={1080}
            priority
            className="h-auto w-full object-cover object-top"
            sizes="(min-width: 1024px) 1120px, 100vw"
          />
        </AnimatedReveal>

        <div className="mt-24 md:mt-32">
          <ProjectHorizontalGallery
            eyebrow={copy.projectEcosystem}
            title={copy.xvGalleryTitle}
            titleClassName="tracking-[-0.055em]"
            description={copy.xvGalleryDescription}
            items={toGalleryItems(xvStudioScreenshots.slice(0, 7), copy.xvScreenshotAltContext)}
          />
        </div>

        <AnimatedReveal className="mt-28">
          <div className="max-w-[720px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              {copy.responsiveUi}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-5xl">
              {copy.xvMobileTitle}
            </h2>
            <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-black/56">
              {copy.xvMobileDescription}
            </p>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:gap-8">
            {xvStudioScreenshots.slice(7).map((screenshot) => (
              <XvStudioScreenshotCard key={screenshot.src} screenshot={screenshot} />
            ))}
          </div>
        </AnimatedReveal>

        <TechnicalNotesSection
          eyebrow={copy.caseStudy}
          title={copy.technicalNotes}
          notes={project.technicalNotes}
        />

        <AnimatedReveal className="mt-28 rounded-[28px] border border-black/10 bg-white p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/38">
                {copy.nextProject}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{nextProject.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-black/58">
                {nextProject.shortDescription}
              </p>
            </div>
            <PortfolioInteractiveLink href={nextProject.href}>
              {copy.viewProject}
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

function HausbProjectPage({
  project,
  locale,
  copy
}: {
  project: Project;
  locale: Locale;
  copy: ProjectDetailCopy;
}) {
  const nextProject = getNextProject(project.slug, locale);
  const hausbScreenshots = getHausbScreenshots(copy);
  const metaItems = createProjectMeta(copy, {
    role: project.role,
    stack: "Next.js / Tailwind CSS",
    focus: copy.hausbMetaFocus
  });

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-28 sm:px-8 md:pb-36 md:pt-36 lg:px-10">
        <AnimatedReveal className="mx-auto max-w-[920px] text-center">
          <span className="inline-flex rounded-full border border-black/10 bg-[#f2f0ec] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/38">
            {copy.caseStudy}
          </span>
          <h1 className="mt-6 text-[56px] font-semibold leading-[0.92] tracking-normal text-black sm:text-[82px] md:text-[104px]">
            {project.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-[15px] leading-7 text-black/56">
            {project.longDescription}
          </p>
        </AnimatedReveal>

        <ProjectMetaGrid items={metaItems} />

        <AnimatedReveal delay={0.08} className="mt-16 overflow-hidden rounded-[34px] border border-black/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
          <div className="relative aspect-[4/3] md:aspect-[16/10]">
            <Image
              src="/hausb/hausb-home.webp"
              alt={project.image.alt}
              fill
              priority
              className="object-cover object-top"
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
          </div>
        </AnimatedReveal>

        <div className="mt-24 md:mt-32">
          <ProjectHorizontalGallery
            eyebrow={copy.projectEcosystem}
            title={copy.hausbGalleryTitle}
            titleClassName="tracking-[-0.055em]"
            description={copy.hausbGalleryDescription}
            items={toGalleryItems(hausbScreenshots.slice(0, 7), copy.hausbScreenshotAltContext)}
          />
        </div>

        <AnimatedReveal className="mt-28">
          <div className="max-w-[720px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              {copy.responsiveUi}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-5xl">
              {copy.hausbMobileTitle}
            </h2>
            <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-black/56">
              {copy.hausbMobileDescription}
            </p>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:gap-8">
            {hausbScreenshots.slice(7).map((screenshot) => (
              <HausbScreenshotCard key={screenshot.src} screenshot={screenshot} />
            ))}
          </div>
        </AnimatedReveal>

        <TechnicalNotesSection
          eyebrow={copy.caseStudy}
          title={copy.technicalNotes}
          notes={project.technicalNotes}
        />

        <AnimatedReveal className="mt-28 rounded-[28px] border border-black/10 bg-white p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/38">
                {copy.nextProject}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{nextProject.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-black/58">
                {nextProject.shortDescription}
              </p>
            </div>
            <PortfolioInteractiveLink href={nextProject.href}>
              {copy.viewProject}
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

function CasaBenficaProjectPage({
  project,
  locale,
  copy
}: {
  project: Project;
  locale: Locale;
  copy: ProjectDetailCopy;
}) {
  const nextProject = getNextProject(project.slug, locale);
  const casaScreenshots = getCasaScreenshots(copy);
  const casaGalleryScreenshots = [
    casaScreenshots[0],
    casaScreenshots[1],
    casaScreenshots[3],
    casaScreenshots[4],
    casaScreenshots[5]
  ];
  const casaPublicScreenshots = casaScreenshots.slice(6);
  const casaMobileScreenshots = getCasaMobileScreenshots(copy);
  const metaItems = createProjectMeta(copy, {
    role: project.role,
    stack: "Next.js / Supabase",
    focus: copy.casaMetaFocus
  });

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-28 pt-28 sm:px-8 md:pb-36 md:pt-36 lg:px-10">
        <AnimatedReveal className="mx-auto max-w-[980px] text-center">
          <span className="inline-flex rounded-full border border-black/10 bg-[#f2f0ec] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/38">
            {copy.caseStudy}
          </span>
          <h1 className="mt-6 text-[48px] font-semibold leading-[0.96] tracking-normal text-black sm:text-[72px] md:text-[86px]">
            {project.title}
          </h1>
          <p className="mt-5 text-[15px] leading-6 text-black/54">
            {copy.casaIntro}
          </p>
        </AnimatedReveal>

        <ProjectMetaGrid items={metaItems} />

        <HeroVisual />

        <section className="mt-36">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:items-start lg:gap-16">
            <div className="max-w-[420px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                {copy.projectEcosystem}
              </p>
              <h2 className="mt-5 text-[34px] font-semibold leading-[0.95] tracking-tight text-black md:text-[46px]">
                {copy.casaSectionTitle}
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-black/60">
                {copy.casaSectionDescription}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {casaPublicScreenshots.map((screenshot, index) => (
                <AnimatedReveal
                  key={screenshot.src}
                  delay={index * 0.1}
                >
                  <CasaScreenshotCard screenshot={screenshot} />
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-24 md:mt-32">
          <ProjectHorizontalGallery
            eyebrow={copy.projectEcosystem}
            title={copy.casaGalleryTitle}
            description={copy.casaGalleryDescription}
            items={toGalleryItems(casaGalleryScreenshots, copy.casaScreenshotAltContext)}
          />
        </div>

        <AnimatedReveal className="mt-28">
          <div className="max-w-[720px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              {copy.responsiveUi}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-5xl">
              {copy.casaMobileTitle}
            </h2>
            <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-black/56">
              {copy.casaMobileDescription}
            </p>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:gap-8">
            {casaMobileScreenshots.map((screenshot) => (
              <CasaMobileScreenshotCard key={screenshot.src} screenshot={screenshot} />
            ))}
          </div>
        </AnimatedReveal>

        <section className="mt-36">
          <AnimatedReveal>
            <h2 className="text-center text-3xl font-medium leading-none tracking-normal text-black">
              {copy.casaChallengesTitle}
            </h2>
          </AnimatedReveal>
          <AnimatedReveal delay={0.08} className="mt-14 grid gap-6 md:grid-cols-2">
            {copy.casaChallenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.title}
                challenge={{ ...challenge, icon: casaChallengeIcons[index] }}
              />
            ))}
          </AnimatedReveal>
        </section>

        <AnimatedReveal className="mt-28 rounded-[28px] border border-black/10 bg-white p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/38">
                {copy.nextProject}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{nextProject.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-black/58">
                {nextProject.shortDescription}
              </p>
            </div>
            <PortfolioInteractiveLink href={nextProject.href}>
              {copy.viewProject}
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

function GenericProjectDetailPage({
  project,
  locale,
  copy
}: {
  project: Project;
  locale: Locale;
  copy: ProjectDetailCopy;
}) {
  const nextProject = getNextProject(project.slug, locale);

  return (
    <PageShell>
      <ProjectHero project={project} />

      <Section title="Overview">
        <AnimatedReveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-2xl font-semibold leading-tight text-ink md:text-3xl">
            A focused project built around real client needs, clean execution and a practical
            production path.
          </p>
          <p className="text-base leading-8 text-black/58 md:text-lg">{project.longDescription}</p>
        </AnimatedReveal>
      </Section>

      <Section className="border-y border-line bg-soft" title="My Role">
        <AnimatedReveal className="grid gap-5 md:grid-cols-3">
          <article className="rounded-lg border border-line bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/38">Role</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">{project.role}</h2>
          </article>
          <article className="rounded-lg border border-line bg-white p-6 md:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/38">Scope</p>
            <p className="mt-4 text-base leading-8 text-black/58">{project.shortDescription}</p>
          </article>
        </AnimatedReveal>
      </Section>

      <Section title="Tech Stack">
        <AnimatedReveal className="flex flex-wrap gap-2">
          {project.techStack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-neutral-700"
            >
              {item}
            </span>
          ))}
        </AnimatedReveal>
      </Section>

      <Section className="border-t border-line" title="What I Built">
        <AnimatedReveal className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6">
            <h2 className="text-xl font-semibold text-ink">Core delivery</h2>
            <p className="mt-4 text-base leading-8 text-black/58">
              I translated the project requirements into responsive interfaces and implementation
              patterns that can be expanded with more detailed mockups and case-study content.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-6">
            <h2 className="text-xl font-semibold text-ink">Production readiness</h2>
            <p className="mt-4 text-base leading-8 text-black/58">
              The structure is prepared for deployment, clear routing, reusable sections and future
              visual refinement without changing the content model.
            </p>
          </div>
        </AnimatedReveal>
      </Section>

      <Section className="border-t border-line bg-soft" title="Main Features">
        <AnimatedReveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feature) => (
            <div key={feature} className="rounded-lg border border-line bg-white p-5">
              <p className="text-base font-semibold text-ink">{feature}</p>
            </div>
          ))}
        </AnimatedReveal>
      </Section>

      <Section title="Visual Mockups">
        <AnimatedReveal className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <ProjectVisual project={project} />
          <div className="grid gap-5">
            <ProjectVisual project={project} compact />
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-xl font-semibold text-ink">Placeholder area</h2>
              <p className="mt-4 text-base leading-8 text-black/58">
                This section is ready for final screenshots, browser mockups and page-specific visual
                storytelling in the next phase.
              </p>
            </div>
          </div>
        </AnimatedReveal>
      </Section>

      <section className="px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TechnicalNotesSection
            eyebrow={copy.caseStudy}
            title={copy.technicalNotes}
            notes={project.technicalNotes}
            className="mt-0"
          />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <AnimatedReveal className="mx-auto max-w-7xl rounded-lg border border-line bg-white p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/38">
                {copy.nextProject}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{nextProject.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-black/58">
                {nextProject.shortDescription}
              </p>
            </div>
            <PortfolioInteractiveLink href={nextProject.href}>
              {copy.viewProject}
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug, locale: localeParam } = await params;
  const locale = resolveProjectLocale(localeParam);
  const dictionary = getDictionary(locale);
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  if (project.slug === "casa-benfica-lenzburg") {
    return (
      <CasaBenficaProjectPage
        project={project}
        locale={locale}
        copy={dictionary.projectDetail}
      />
    );
  }

  if (project.slug === "xv-studio") {
    return (
      <XvStudioProjectPage
        project={project}
        locale={locale}
        copy={dictionary.projectDetail}
      />
    );
  }

  if (project.slug === "hausb") {
    return <HausbProjectPage project={project} locale={locale} copy={dictionary.projectDetail} />;
  }

  return (
    <GenericProjectDetailPage
      project={project}
      locale={locale}
      copy={dictionary.projectDetail}
    />
  );
}

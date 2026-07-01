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

const casaFeatures = [
  {
    title: "Public Website",
    description:
      "A highly performant, SEO-optimized landing site designed to showcase the venue, menu, and upcoming events with an editorial flair."
  },
  {
    title: "Reservation Backoffice",
    description:
      "A secure internal portal for staff to manage table bookings, track customer preferences, and handle real-time availability updates."
  },
  {
    title: "Restaurant Billing System",
    description:
      "An integrated solution for tracking orders, generating invoices, and reporting daily revenue metrics securely."
  }
];

const casaScreenshots = [
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_00-35-09.webp",
    title: "Public website",
    description: "Homepage and public presence with events, albums, restaurant and reservation paths."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_01-10-54.webp",
    title: "Reservation flow",
    description: "Date, group size and availability selection for restaurant bookings."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_00-21-14.webp",
    title: "Reservation backoffice",
    description: "Operational view for capacity, upcoming days and manual booking actions."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_01-17-57.webp",
    title: "Email management",
    description: "Backoffice tooling for contacts, groups, campaigns and email composition."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_01-15-35.webp",
    title: "Work schedules",
    description: "Staff planning interface for shifts, teams and monthly service organization."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_00-35-51.webp",
    title: "Member sign-up",
    description: "Public family membership form with a focused registration experience."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_00-37-25.webp",
    title: "Albums",
    description: "Public gallery browsing for events and community moments."
  },
  {
    src: "/benfica/screenshot_1.5x_postspark_2026-06-25_00-38-16.webp",
    title: "Contact page",
    description: "Contact details, schedule and location presented in a clear public page."
  }
];

const casaFeatureScreenshots = [
  casaScreenshots[0],
  casaScreenshots[2],
  casaScreenshots[3]
];

const casaChallenges = [
  {
    title: "Managing real business data",
    description:
      "Ensuring absolute data integrity and security for live reservations and billing records within Supabase.",
    icon: Database
  },
  {
    title: "Creating admin workflows",
    description:
      "Designing intuitive role-based access control and approval flows for staff with varying technical proficiencies.",
    icon: GitBranch
  },
  {
    title: "Interface simplicity",
    description:
      "Distilling complex operational data into clean, accessible UI components that reduce cognitive load for users.",
    icon: Layers
  },
  {
    title: "Production readiness",
    description:
      "Optimizing Next.js server components and API routes to handle real-world traffic spikes and ensure high availability.",
    icon: Rocket
  }
];

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

const xvStudioScreenshots = [
  {
    src: "/xvstudio/xv-home.webp",
    title: "Homepage",
    description: "A polished service landing page with strong visual rhythm and clear positioning."
  },
  {
    src: "/xvstudio/xv-foto.webp",
    title: "Photography services",
    description: "Photography service pages combining visual storytelling, equipment and production detail."
  },
  {
    src: "/xvstudio/xv-laser.webp",
    title: "Laser & NFC",
    description: "A specialized service page for precision laser work and NFC-enabled products."
  },
  {
    src: "/xvstudio/xv-contacto.webp",
    title: "Contact page",
    description: "A direct contact and social presence page designed to make collaboration easy."
  },
  {
    src: "/xvstudio/xv-modal-contacto.webp",
    title: "Guided contact flow",
    description: "Step-based project input for collecting scope, goals and useful context."
  },
  {
    src: "/xvstudio/xv-backoffice.webp",
    title: "Backoffice",
    description: "Internal management surface for keeping content and business operations organized."
  },
  {
    src: "/xvstudio/xv-edicao.webp",
    title: "Editing services",
    description: "Post-production services presented through clear packages and practical detail."
  },
  {
    src: "/xvstudio/xv-mobile-home.webp",
    title: "Mobile homepage",
    description: "Responsive landing state tuned for narrow screens."
  },
  {
    src: "/xvstudio/xv-mobile-websites.webp",
    title: "Mobile websites",
    description: "Web service pages adapted for focused browsing on narrow screens."
  }
];

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

function getHausbScreenshots(copy: ProjectDetailCopy): ProjectScreenshot[] {
  return hausbScreenshotImages.map((src, index) => ({
    src,
    title: copy.hausbScreenshots[index]?.title ?? "HAUSB",
    description: copy.hausbScreenshots[index]?.description ?? ""
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
          src={casaScreenshots[0].src}
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

function FeatureCard({
  feature,
  index
}: {
  feature: (typeof casaFeatures)[number];
  index: number;
}) {
  const screenshot = casaFeatureScreenshots[index];

  return (
    <article className="overflow-hidden rounded-[20px] border border-black/10 bg-[#efede9]">
      <div className="relative h-52 overflow-hidden bg-black">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} mockup from Casa Benfica Lenzburg`}
          fill
          className="object-cover object-top transition duration-700 hover:scale-[1.035]"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_56%,rgba(239,237,233,0.32))]" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium leading-none tracking-normal text-black">{feature.title}</h3>
        <p className="mt-4 text-[13px] leading-6 text-black/54">{feature.description}</p>
      </div>
    </article>
  );
}

function ChallengeCard({ challenge }: { challenge: (typeof casaChallenges)[number] }) {
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
  screenshot: (typeof casaScreenshots)[number];
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
  screenshot: (typeof xvStudioScreenshots)[number];
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} screenshot from XV Studio website`}
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
          <div className="relative aspect-[4/3] md:aspect-[16/10]">
            <Image
              src="/xvstudio/xv-home.webp"
              alt="XV Studio homepage screenshot"
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
            title={copy.xvGalleryTitle}
            description={copy.xvGalleryDescription}
            items={toGalleryItems(xvStudioScreenshots.slice(0, 7), "XV Studio")}
          />
        </div>

        <AnimatedReveal className="mt-28 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              {copy.responsiveUi}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-black md:text-4xl">
              {copy.xvMobileTitle}
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-black/56">
              {copy.xvMobileDescription}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {xvStudioScreenshots.slice(7).map((screenshot) => (
              <XvStudioScreenshotCard key={screenshot.src} screenshot={screenshot} />
            ))}
          </div>
        </AnimatedReveal>

        <Section className="mt-28 border-y border-line bg-transparent px-0" title={copy.technicalNotes}>
          <AnimatedReveal className="grid gap-4 md:grid-cols-3">
            {project.technicalNotes.map((note) => (
              <article key={note} className="rounded-lg border border-line bg-white p-6">
                <p className="text-sm leading-7 text-black/62">{note}</p>
              </article>
            ))}
          </AnimatedReveal>
        </Section>

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

        <AnimatedReveal className="mt-28 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              {copy.responsiveUi}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-black md:text-4xl">
              {copy.hausbMobileTitle}
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-black/56">
              {copy.hausbMobileDescription}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {hausbScreenshots.slice(7).map((screenshot) => (
              <HausbScreenshotCard key={screenshot.src} screenshot={screenshot} />
            ))}
          </div>
        </AnimatedReveal>

        <Section className="mt-28 border-y border-line bg-transparent px-0" title={copy.technicalNotes}>
          <AnimatedReveal className="grid gap-4 md:grid-cols-3">
            {project.technicalNotes.map((note) => (
              <article key={note} className="rounded-lg border border-line bg-white p-6">
                <p className="text-sm leading-7 text-black/62">{note}</p>
              </article>
            ))}
          </AnimatedReveal>
        </Section>

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
  copy
}: {
  project: Project;
  copy: ProjectDetailCopy;
}) {
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

        <AnimatedReveal className="mx-auto mt-36 max-w-[760px] text-center">
          <h2 className="text-3xl font-medium leading-none tracking-normal text-black">
            {copy.casaSectionTitle}
          </h2>
          <p className="mt-8 text-[14px] leading-7 text-black/54">
            {copy.casaSectionDescription}
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-28 grid gap-6 md:grid-cols-3">
          {casaFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </AnimatedReveal>

        <div className="mt-24 md:mt-32">
          <ProjectHorizontalGallery
            eyebrow={copy.projectEcosystem}
            title={copy.casaGalleryTitle}
            description={copy.casaGalleryDescription}
            items={toGalleryItems(casaScreenshots.slice(0, 6), "Casa Benfica Lenzburg")}
          />
        </div>

        <AnimatedReveal className="mt-28 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              {copy.casaCommunityEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-black md:text-4xl">
              {copy.casaCommunityTitle}
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-black/56">
              {copy.casaCommunityDescription}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {casaScreenshots.slice(6).map((screenshot) => (
              <CasaScreenshotCard key={screenshot.src} screenshot={screenshot} />
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
            {casaChallenges.map((challenge) => (
              <ChallengeCard key={challenge.title} challenge={challenge} />
            ))}
          </AnimatedReveal>
        </section>

        <AnimatedReveal className="mt-36 border-t border-black/10 pt-32 text-center">
          <p className="mx-auto max-w-[760px] text-3xl font-medium leading-[1.08] tracking-normal text-black md:text-[34px]">
            {copy.casaClosing}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PortfolioInteractiveLink href="/projects">
              {copy.backToProjects}
            </PortfolioInteractiveLink>
            <PortfolioInteractiveLink href="/contact">{copy.contact}</PortfolioInteractiveLink>
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

      <Section className="border-y border-line bg-soft" title={copy.technicalNotes}>
        <AnimatedReveal className="grid gap-4 md:grid-cols-3">
          {project.technicalNotes.map((note) => (
            <article key={note} className="rounded-lg border border-line bg-white p-6">
              <p className="text-sm leading-7 text-black/62">{note}</p>
            </article>
          ))}
        </AnimatedReveal>
      </Section>

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
    return <CasaBenficaProjectPage project={project} copy={dictionary.projectDetail} />;
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

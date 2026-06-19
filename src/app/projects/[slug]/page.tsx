import type { Metadata } from "next";
import Image from "next/image";
import { Database, GitBranch, Layers, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectVisual } from "@/components/projects/project-visual";
import {
  PortfolioInteractiveButton,
  PortfolioInteractiveLink
} from "@/components/ui/portfolio-interactive-button";
import { getNextProject, getProjectBySlug, projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const casaMeta = [
  { label: "Role", value: "Full-stack Developer" },
  { label: "Type", value: "Client Project" },
  { label: "Stack", value: "Next.js / Supabase" },
  { label: "Focus", value: "Website + Backoffice" }
];

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

const hausbScreenshots = [
  {
    src: "/hausb/hausb-home.webp",
    title: "Homepage",
    description: "Landing page focused on a clean first impression and direct service positioning."
  },
  {
    src: "/hausb/hausb-arquitetura.webp",
    title: "Architecture page",
    description: "A service page with structured content, strong image rhythm and clear hierarchy."
  },
  {
    src: "/hausb/hausb-contrucao.webp",
    title: "Construction page",
    description: "A focused page for construction services with consistent visual language."
  },
  {
    src: "/hausb/hausb-about.webp",
    title: "About section",
    description: "Brand presentation with company context and a quieter editorial layout."
  },
  {
    src: "/hausb/hausb-portfolio.webp",
    title: "Portfolio page",
    description: "Project showcase page designed to support visual browsing and trust."
  },
  {
    src: "/hausb/hausb-mobile-menu.webp",
    title: "Mobile navigation",
    description: "Responsive menu state prepared for compact screens and touch navigation."
  }
];

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project"
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article"
    }
  };
}

function BrowserPreview() {
  return (
    <div className="relative mx-auto flex aspect-[2.22] w-[82%] max-w-[840px] overflow-hidden rounded-[24px] border border-black/18 bg-[#eceae5] shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
      <div className="absolute left-5 top-4 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[#ef767a]" />
        <span className="h-2 w-2 rounded-full bg-black/18" />
        <span className="h-2 w-2 rounded-full bg-black/18" />
      </div>
      <div className="mt-14 grid w-full grid-cols-[0.36fr_1fr] gap-6 px-8 pb-8">
        <div className="rounded-sm bg-[#fbfaf7] p-6">
          <span className="block h-3 w-28 rounded-full bg-black/12" />
          <span className="mt-4 block h-3 w-20 rounded-full bg-black/12" />
          <span className="mt-4 block h-3 w-44 max-w-full rounded-full bg-black/12" />
        </div>
        <div className="space-y-6 rounded-sm bg-[#fbfaf7] p-7">
          <span className="block h-28 rounded-sm border border-black/8 bg-[#efede9]" />
          <div className="grid grid-cols-2 gap-5">
            <span className="block h-24 rounded-sm border border-black/8 bg-[#efede9]" />
            <span className="block h-24 rounded-sm border border-black/8 bg-[#efede9]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <AnimatedReveal delay={0.08}>
      <div className="relative mt-28 overflow-hidden rounded-[34px] border border-black/12 bg-black p-10 shadow-[0_24px_80px_rgba(0,0,0,0.12)] md:p-16">
        <Image
          src="/benfica/telemovel1.webp"
          alt=""
          fill
          priority
          className="scale-125 object-cover opacity-45 blur-sm"
          sizes="(min-width: 1024px) 1120px, 100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(95,185,190,0.42),transparent_45%),linear-gradient(135deg,rgba(2,13,15,0.78),rgba(1,9,10,0.98))]" />
        <div className="relative z-10 flex min-h-[420px] items-center justify-center">
          <BrowserPreview />
        </div>
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
  return (
    <article className="overflow-hidden rounded-[20px] border border-black/10 bg-[#efede9]">
      <div className="relative h-44 overflow-hidden bg-black">
        <Image
          src="/benfica/telemovel1.webp"
          alt=""
          fill
          className={cn(
            "object-cover opacity-70",
            index === 0 && "rotate-[-8deg] scale-125",
            index === 1 && "scale-150 blur-[1px]",
            index === 2 && "scale-125 blur-sm"
          )}
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(239,237,233,0.42))]" />
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

function HausbScreenshotCard({
  screenshot,
  priority = false,
  className
}: {
  screenshot: (typeof hausbScreenshots)[number];
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm", className)}>
      <div className="relative aspect-[5/4] overflow-hidden bg-[#111111]">
        <Image
          src={screenshot.src}
          alt={`${screenshot.title} screenshot from HAUSB website`}
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

function HausbProjectPage({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);

  return (
    <PageShell className="bg-[#fbfaf7]">
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-28 sm:px-8 md:pb-36 md:pt-36 lg:px-10">
        <AnimatedReveal className="mx-auto max-w-[920px] text-center">
          <span className="inline-flex rounded-full border border-black/10 bg-[#f2f0ec] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/38">
            Case Study
          </span>
          <h1 className="mt-6 text-[56px] font-semibold leading-[0.92] tracking-normal text-black sm:text-[82px] md:text-[104px]">
            {project.title}
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-[15px] leading-7 text-black/56">
            {project.longDescription}
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-16 overflow-hidden rounded-[34px] border border-black/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
          <div className="relative aspect-[4/3] md:aspect-[16/10]">
            <Image
              src="/hausb/mac2.webp"
              alt="HAUSB website displayed on a desktop mockup"
              fill
              priority
              className="object-cover object-top"
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
          </div>
        </AnimatedReveal>

        <AnimatedReveal className="mx-auto mt-32 grid max-w-[980px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <h2 className="text-3xl font-semibold leading-tight text-black md:text-5xl">
            A clean business website with real responsive screens.
          </h2>
          <p className="text-[15px] leading-8 text-black/56">
            The HAUSB website was built around clear service communication, calm visual hierarchy
            and responsive pages that feel consistent across desktop and mobile. These screenshots
            show the production-facing layouts rather than abstract placeholders.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-20 grid gap-6 md:grid-cols-2">
          {hausbScreenshots.slice(0, 4).map((screenshot, index) => (
            <HausbScreenshotCard
              key={screenshot.src}
              screenshot={screenshot}
              priority={index < 2}
              className={index === 0 ? "md:col-span-2" : undefined}
            />
          ))}
        </AnimatedReveal>

        <AnimatedReveal className="mt-28 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/38">
              Responsive UI
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-black md:text-4xl">
              Mobile states included from the start.
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-black/56">
              The visual system carries through smaller screens, including service pages and
              navigation states that keep the experience direct and usable.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {hausbScreenshots.slice(4).map((screenshot) => (
              <HausbScreenshotCard key={screenshot.src} screenshot={screenshot} />
            ))}
          </div>
        </AnimatedReveal>

        <Section className="mt-28 border-y border-line bg-transparent px-0" title="Technical Notes">
          <AnimatedReveal className="grid gap-4 md:grid-cols-3">
            {project.technicalNotes.map((note) => (
              <article key={note} className="rounded-lg border border-line bg-white p-6">
                <p className="text-sm leading-7 text-muted">{note}</p>
              </article>
            ))}
          </AnimatedReveal>
        </Section>

        <AnimatedReveal className="mt-28 rounded-[28px] border border-black/10 bg-white p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                Next Project
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{nextProject.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                {nextProject.shortDescription}
              </p>
            </div>
            <PortfolioInteractiveLink href={nextProject.href}>
              Ver projeto
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

function CasaBenficaProjectPage({ project }: { project: Project }) {
  return (
    <PageShell className="bg-[#fbfaf7]">
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-28 pt-28 sm:px-8 md:pb-36 md:pt-36 lg:px-10">
        <AnimatedReveal className="mx-auto max-w-[980px] text-center">
          <span className="inline-flex rounded-full border border-black/10 bg-[#f2f0ec] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/38">
            Case Study
          </span>
          <h1 className="mt-6 text-[48px] font-semibold leading-[0.96] tracking-normal text-black sm:text-[72px] md:text-[86px]">
            {project.title}
          </h1>
          <p className="mt-5 text-[15px] leading-6 text-black/54">
            A public website and internal backoffice system built for a real business.
          </p>
        </AnimatedReveal>

        <AnimatedReveal
          delay={0.05}
          className="mx-auto mt-14 grid max-w-[840px] gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {casaMeta.map((item) => (
            <div key={item.label} className="border border-black/8 bg-[#efede9] px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/32">
                {item.label}
              </p>
              <p className="mt-2 text-[12px] font-medium leading-5 text-black">{item.value}</p>
            </div>
          ))}
        </AnimatedReveal>

        <HeroVisual />

        <AnimatedReveal className="mx-auto mt-36 max-w-[760px] text-center">
          <h2 className="text-3xl font-medium leading-none tracking-normal text-black">
            From public presence to internal operations
          </h2>
          <p className="mt-8 text-[14px] leading-7 text-black/54">
            Casa Benfica Lenzburg required a comprehensive digital overhaul. The challenge was
            twofold: creating a compelling public-facing website to attract patrons and establish a
            strong local brand presence, while simultaneously developing a robust internal backoffice
            system to streamline their reservation and billing operations. This dual-natured project
            demanded a seamless integration between front-end aesthetics and back-end utility.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-28 grid gap-6 md:grid-cols-3">
          {casaFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </AnimatedReveal>

        <section className="mt-36">
          <AnimatedReveal>
            <h2 className="text-center text-3xl font-medium leading-none tracking-normal text-black">
              Core Challenges
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
            Built as a practical digital system for a real client, combining public-facing design
            with internal operational tools.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PortfolioInteractiveLink href="/projects">
              Voltar aos projetos
            </PortfolioInteractiveLink>
            <ContactTrigger asChild>
              <PortfolioInteractiveButton>Contacto</PortfolioInteractiveButton>
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

function GenericProjectDetailPage({ project }: { project: Project }) {
  const nextProject = getNextProject(project.slug);

  return (
    <PageShell>
      <ProjectHero project={project} />

      <Section title="Overview">
        <AnimatedReveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-2xl font-semibold leading-tight text-ink md:text-3xl">
            A focused project built around real client needs, clean execution and a practical
            production path.
          </p>
          <p className="text-base leading-8 text-muted md:text-lg">{project.longDescription}</p>
        </AnimatedReveal>
      </Section>

      <Section className="border-y border-line bg-soft" title="My Role">
        <AnimatedReveal className="grid gap-5 md:grid-cols-3">
          <article className="rounded-lg border border-line bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Role</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">{project.role}</h2>
          </article>
          <article className="rounded-lg border border-line bg-white p-6 md:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Scope</p>
            <p className="mt-4 text-base leading-8 text-muted">{project.shortDescription}</p>
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
            <p className="mt-4 text-base leading-8 text-muted">
              I translated the project requirements into responsive interfaces and implementation
              patterns that can be expanded with more detailed mockups and case-study content.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-6">
            <h2 className="text-xl font-semibold text-ink">Production readiness</h2>
            <p className="mt-4 text-base leading-8 text-muted">
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
              <p className="mt-4 text-base leading-8 text-muted">
                This section is ready for final screenshots, browser mockups and page-specific visual
                storytelling in the next phase.
              </p>
            </div>
          </div>
        </AnimatedReveal>
      </Section>

      <Section className="border-y border-line bg-soft" title="Technical Notes">
        <AnimatedReveal className="grid gap-4 md:grid-cols-3">
          {project.technicalNotes.map((note) => (
            <article key={note} className="rounded-lg border border-line bg-white p-6">
              <p className="text-sm leading-7 text-muted">{note}</p>
            </article>
          ))}
        </AnimatedReveal>
      </Section>

      <section className="px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <AnimatedReveal className="mx-auto max-w-7xl rounded-lg border border-line bg-white p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                Next Project
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{nextProject.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                {nextProject.shortDescription}
              </p>
            </div>
            <PortfolioInteractiveLink href={nextProject.href}>
              Ver projeto
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "casa-benfica-lenzburg") {
    return <CasaBenficaProjectPage project={project} />;
  }

  if (project.slug === "hausb") {
    return <HausbProjectPage project={project} />;
  }

  return <GenericProjectDetailPage project={project} />;
}

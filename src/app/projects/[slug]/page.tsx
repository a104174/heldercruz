import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ButtonLink } from "@/components/ui/button";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
            <ButtonLink href={nextProject.href} variant="secondary">
              View Project
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

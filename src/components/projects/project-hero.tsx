import { ArrowUpRight } from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { ProjectMeta } from "@/components/projects/project-meta";
import { ProjectVisual } from "@/components/projects/project-visual";
import type { Project } from "@/data/projects";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <AnimatedReveal className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Selected Work
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.longDescription}</p>
            {project.liveUrl && (
              <ButtonLink href={project.liveUrl} className="mt-8" target="_blank" rel="noreferrer">
                Live website
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
          <ProjectMeta project={project} />
        </AnimatedReveal>
        <AnimatedReveal delay={0.1} className="mt-12">
          <ProjectVisual project={project} />
        </AnimatedReveal>
      </Container>
    </section>
  );
}

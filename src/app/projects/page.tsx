import type { Metadata } from "next";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Three real-world projects built for clients, combining clean interfaces, responsive design and practical business-focused features."
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <Section
        className="pt-20 md:pt-28"
        eyebrow="Work"
        title="Selected Work"
        intro="Three real-world projects built for clients, combining clean interfaces, responsive design and practical business-focused features."
      >
        <AnimatedReveal className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatedReveal>
      </Section>
    </PageShell>
  );
}

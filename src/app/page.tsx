import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Mail, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { experienceItems } from "@/data/experience";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Software Engineer",
  description:
    "Hélder Cruz is a Software Engineer crafting clean, scalable and user-focused web applications."
};

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "Vercel",
  "Docker",
  "Postman",
  "Resend",
  "Figma"
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="pb-16 pt-20 md:pb-24 md:pt-28">
        <Container>
          <AnimatedReveal className="max-w-5xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-muted">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-ink" />
              Hélder Cruz · Software Engineer
            </p>
            <h1 className="text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
              Software Engineer crafting digital products.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">
              I build clean, scalable and user-focused web applications, combining frontend
              engineering, backend systems and polished user experiences.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projects" size="lg">
                View Projects
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ContactTrigger variant="secondary" size="lg">
                <Mail aria-hidden="true" className="h-4 w-4" />
                Contact Me
              </ContactTrigger>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      <Section
        title="Featured Projects"
        intro="Three real client projects across public websites, backoffice systems, contact flows and deployment-ready frontend work."
      >
        <AnimatedReveal className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatedReveal>
      </Section>

      <Section className="border-y border-line bg-soft" title="About" eyebrow="Profile">
        <AnimatedReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <p className="text-2xl font-semibold leading-tight text-ink md:text-3xl">
            Software Engineer graduated in Computer Engineering from Universidade do Minho.
          </p>
          <div className="space-y-6 text-base leading-8 text-muted md:text-lg">
            <p>
              I work across frontend, backend, databases, backoffice systems and deployment,
              with a focus on shipping clean interfaces and practical features for real clients.
            </p>
            <ButtonLink href="/about" variant="secondary">
              More About Me
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </AnimatedReveal>
      </Section>

      <Section title="Skills / Stack" intro="A practical stack for modern product engineering.">
        <AnimatedReveal className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-neutral-700"
            >
              {skill}
            </span>
          ))}
        </AnimatedReveal>
      </Section>

      <Section className="border-t border-line" title="Experience" eyebrow="Background">
        <AnimatedReveal className="grid gap-4 md:grid-cols-3">
          {experienceItems.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-line bg-white p-6">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
                {index === 0 ? (
                  <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                ) : index === 1 ? (
                  <Sparkles aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <GraduationCap aria-hidden="true" className="h-4 w-4" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm font-medium text-muted">{item.organization}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </AnimatedReveal>
      </Section>

      <section className="px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <AnimatedReveal className="mx-auto max-w-7xl rounded-lg bg-ink px-6 py-12 text-white md:px-10 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                Have a project in mind?
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Let&apos;s build something clean, fast and useful.
              </h2>
            </div>
            <ContactTrigger variant="dark" size="lg">
              <Mail aria-hidden="true" className="h-4 w-4" />
              Contact Me
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

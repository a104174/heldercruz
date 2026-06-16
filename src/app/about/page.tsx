import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Hélder Cruz, Software Engineer graduated in Computer Engineering from Universidade do Minho."
};

const skills = [
  "Frontend engineering",
  "Backend logic",
  "Database design",
  "Backoffice systems",
  "Responsive interfaces",
  "Deployment"
];

export default function AboutPage() {
  return (
    <PageShell>
      <Section className="pt-20 md:pt-28" eyebrow="About" title="Engineer first. Product-minded always.">
        <AnimatedReveal className="max-w-4xl space-y-6 text-base leading-8 text-muted md:text-lg">
          <p>
            I&apos;m Hélder Cruz, a Software Engineer graduated in Computer Engineering from
            Universidade do Minho. I focus on building clean, scalable and user-focused web
            applications, combining frontend development, backend logic, databases and deployment.
            I&apos;ve worked on real client projects, including business websites, reservation
            systems and backoffice platforms.
          </p>
        </AnimatedReveal>
      </Section>

      <Section className="border-y border-line bg-soft" title="Academic Background">
        <AnimatedReveal className="rounded-lg border border-line bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-ink">Computer Engineering · Universidade do Minho</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-muted md:text-lg">
            A foundation across software engineering, databases, distributed systems, computer
            networks, security, human-computer interaction and artificial intelligence.
          </p>
        </AnimatedReveal>
      </Section>

      <Section title="How I Work">
        <AnimatedReveal className="grid gap-5 md:grid-cols-3">
          {[
            "I like simple systems that are easy to reason about and evolve.",
            "I care about interfaces that feel polished without getting in the way.",
            "I build with deployment, maintainability and real user flows in mind."
          ].map((item) => (
            <article key={item} className="rounded-lg border border-line bg-white p-6">
              <p className="text-base leading-7 text-muted">{item}</p>
            </article>
          ))}
        </AnimatedReveal>
      </Section>

      <Section className="border-t border-line" title="Skills">
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

      <section className="px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <AnimatedReveal className="mx-auto max-w-7xl rounded-lg bg-ink p-6 text-white md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
                Have something useful to build?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ContactTrigger variant="dark">
                <Mail aria-hidden="true" className="h-4 w-4" />
                Contact Me
              </ContactTrigger>
              <ButtonLink href="/projects" variant="dark">
                View Work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { experienceItems } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience timeline for Hélder Cruz, including Complear internship, freelance projects and Computer Engineering at Universidade do Minho."
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <Section
        className="pt-20 md:pt-28"
        eyebrow="Experience"
        title="Practical engineering across teams, clients and academic foundations."
        intro="A compact view of the work and training behind the portfolio."
      >
        <AnimatedReveal className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-line sm:block" />
          <div className="space-y-5">
            {experienceItems.map((item, index) => (
              <article key={item.title} className="relative rounded-lg border border-line bg-white p-6 sm:ml-12">
                <span className="absolute -left-[3.25rem] top-7 hidden h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-ink sm:flex">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  {item.organization}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </AnimatedReveal>
      </Section>
    </PageShell>
  );
}

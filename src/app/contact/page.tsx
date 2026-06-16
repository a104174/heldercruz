import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hélder Cruz for software engineering projects and collaborations."
};

export default function ContactPage() {
  return (
    <PageShell>
      <Section
        className="pt-20 md:pt-28"
        eyebrow="Contact"
        title="Have a project in mind?"
        intro="Send the context, goals and constraints. I will read it properly and get back to you."
      >
        <AnimatedReveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <p className="text-2xl font-semibold leading-tight text-ink md:text-3xl">
              Let&apos;s build something clean, fast and useful.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.links.linkedin} variant="secondary">
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                LinkedIn
              </ButtonLink>
              <ButtonLink href={siteConfig.links.github} variant="secondary">
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                GitHub
              </ButtonLink>
              <ButtonLink href={siteConfig.links.email} variant="secondary">
                <Mail aria-hidden="true" className="h-4 w-4" />
                Email
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-5 md:p-8">
            <ContactForm />
          </div>
        </AnimatedReveal>
      </Section>
    </PageShell>
  );
}

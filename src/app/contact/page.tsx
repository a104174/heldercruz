import type { Metadata } from "next";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
  MapPin,
  MessageCircle,
  type LucideIcon
} from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hélder Cruz for software engineering projects and collaborations."
};

type ContactItem = {
  detail: string;
  href?: string;
  icon: LucideIcon;
  label: string;
  note?: string;
};

const isConfiguredHref = (href?: string) => Boolean(href && href !== "#");
const isExternalHref = (href: string) => /^https?:\/\//.test(href);
const cleanEmailLabel = siteConfig.links.email.replace(/^mailto:/i, "");

const contactItems: ContactItem[] = [
  {
    detail: cleanEmailLabel,
    href: siteConfig.links.email,
    icon: Mail,
    label: "Email",
    note: "Best for project context and opportunities"
  },
  {
    detail: "Available on request",
    icon: MessageCircle,
    label: "Phone / WhatsApp",
    note: "Shared after initial contact"
  },
  {
    detail: isConfiguredHref(siteConfig.links.linkedin)
      ? "LinkedIn profile"
      : "Available on request",
    href: siteConfig.links.linkedin,
    icon: BriefcaseBusiness,
    label: "LinkedIn",
    note: "Professional updates and background"
  },
  {
    detail: isConfiguredHref(siteConfig.links.github)
      ? "GitHub profile"
      : "Available on request",
    href: siteConfig.links.github,
    icon: Code2,
    label: "GitHub",
    note: "Code, experiments and selected work"
  },
  {
    detail: "Portugal-based",
    icon: MapPin,
    label: "Location / Availability",
    note: "Available for remote opportunities and selected freelance projects"
  }
];

function ContactCard({ item }: { item: ContactItem }) {
  const Icon = item.icon;
  const hasHref = isConfiguredHref(item.href);
  const cardClassName =
    "group flex min-h-[116px] items-start gap-4 rounded-[24px] border border-black/10 bg-white/70 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]";

  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-ink">{item.label}</span>
          {hasHref ? (
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          ) : null}
        </span>
        <span className="mt-2 block break-words text-base font-semibold text-ink">
          {item.detail}
        </span>
        {item.note ? (
          <span className="mt-1 block text-sm leading-6 text-muted">{item.note}</span>
        ) : null}
      </span>
    </>
  );

  if (!hasHref || !item.href) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <a
      href={item.href}
      target={isExternalHref(item.href) ? "_blank" : undefined}
      rel={isExternalHref(item.href) ? "noopener noreferrer" : undefined}
      className={cardClassName}
    >
      {content}
    </a>
  );
}

export default function ContactPage() {
  return (
    <PageShell className="text-ink">
      <section className="px-5 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32 lg:px-8">
        <Container className="px-0">
          <AnimatedReveal className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Contact
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl md:text-7xl">
              Let&apos;s build something that works.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
              Have a project, opportunity or idea in mind? Send me a message and I&apos;ll
              get back to you.
            </p>
          </AnimatedReveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <AnimatedReveal delay={0.06} className="space-y-4">
              {contactItems.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </AnimatedReveal>

            <AnimatedReveal
              delay={0.1}
              className={cn(
                "rounded-[32px] border border-black/10 bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.08)]",
                "sm:p-7 md:p-9 lg:sticky lg:top-28"
              )}
            >
              <div className="mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Message
                </p>
                <h2 className="text-2xl font-semibold leading-tight text-ink md:text-3xl">
                  Send the details directly.
                </h2>
              </div>
              <ContactForm idPrefix="contact-page" variant="simple" />
            </AnimatedReveal>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { Code, Database, Maximize2, MessageSquare, Rocket, Server } from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
import { experienceItems } from "@/data/experience";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience timeline for Hélder Cruz, including Complear internship, freelance projects and Computer Engineering at Universidade do Minho."
};

const timelineMeta = [
  {
    organization: "Complear",
    period: "2023"
  },
  {
    organization: "Independent",
    period: "2022 - Present"
  },
  {
    organization: "Universidade do Minho",
    period: "2018 - 2023"
  }
];

const skillCards = [
  {
    title: "Frontend development",
    icon: Maximize2,
    className: "md:col-span-2 bg-[#efede9]"
  },
  {
    title: "Backend logic",
    icon: Server,
    className: "bg-black text-white"
  },
  {
    title: "Database-driven applications",
    icon: Database,
    className: "bg-[#efede9]"
  },
  {
    title: "Client communication",
    icon: MessageSquare,
    className: "bg-[#efede9]"
  },
  {
    title: "Deployment and production setup",
    icon: Rocket,
    className: "bg-[#dedbd8]"
  }
];

export default function ExperiencePage() {
  return (
    <PageShell className="bg-[#fbfaf7]">
      <section className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-32 sm:px-8 md:pb-36 md:pt-40 lg:px-10">
        <AnimatedReveal className="max-w-[900px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f2f0ec] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/48">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Experience
          </span>
          <h1 className="mt-10 max-w-[860px] text-[48px] font-semibold leading-[1.02] tracking-normal text-black sm:text-[68px] md:text-[82px]">
            Experience shaped by real projects, teamwork and engineering foundations.
          </h1>
          <p className="mt-10 max-w-[560px] text-[15px] leading-7 text-black/56">
            A mix of academic background, internship experience and freelance client work.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="mt-36">
          <div className="mx-auto grid max-w-[1040px] gap-y-16 md:grid-cols-[1fr_70px_1fr] md:gap-y-24">
            {experienceItems.map((item, index) => {
              const meta = timelineMeta[index];
              const titleBlock = (
                <div
                  className={cn(
                    "text-left md:self-center",
                    index !== 1 && "md:text-right",
                    index === 1 && "md:col-start-3"
                  )}
                >
                  <h2 className="text-3xl font-medium leading-[1.08] tracking-normal text-black md:text-[34px]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-black/36">
                    {meta.organization} · {meta.period}
                  </p>
                </div>
              );
              const descriptionBlock = (
                <div
                  className={cn(
                    "rounded-[28px] border border-black/10 bg-[#efede9] px-8 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.06)] md:self-center",
                    index === 1 && "md:col-start-1 md:row-start-2",
                    index !== 1 && "md:col-start-3"
                  )}
                >
                  <p className="text-[13px] leading-6 text-black/52">{item.description}</p>
                </div>
              );

              return (
                <div key={item.title} className="contents">
                  {index === 1 ? descriptionBlock : titleBlock}
                  <div
                    className={cn(
                      "hidden items-center justify-center md:flex",
                      index === 1 && "md:col-start-2 md:row-start-2",
                      index === 2 && "md:row-start-3"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-black" />
                  </div>
                  {index === 1 ? titleBlock : descriptionBlock}
                </div>
              );
            })}
          </div>
        </AnimatedReveal>

        <section className="mt-36">
          <AnimatedReveal>
            <h2 className="text-3xl font-medium leading-none tracking-normal text-black">
              Skills in Practice
            </h2>
          </AnimatedReveal>
          <AnimatedReveal delay={0.08} className="mt-14 grid gap-6 md:grid-cols-3">
            {skillCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className={cn(
                    "relative flex min-h-[210px] flex-col justify-end overflow-hidden rounded-[10px] border border-black/10 p-8",
                    card.className
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "absolute right-7 top-7 h-6 w-6 stroke-[1.5]",
                      card.className.includes("text-white") ? "text-white/38" : "text-black/25"
                    )}
                  />
                  <h3 className="max-w-[280px] text-3xl font-medium leading-[1.05] tracking-normal">
                    {card.title}
                  </h3>
                </article>
              );
            })}
          </AnimatedReveal>
        </section>

        <AnimatedReveal className="mt-36">
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[34px] bg-[#e9e7e3] px-6 py-16 text-center">
            <h2 className="max-w-[850px] text-[46px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[66px] md:text-[78px]">
              Looking for someone
              <br />
              who can build practical
              <br />
              digital products?
            </h2>
            <ContactTrigger
              variant="ghost"
              size="sm"
              className="mt-10 !h-11 !rounded-full !bg-black !px-7 !text-[10px] !font-bold !uppercase !text-white hover:!bg-black/82"
            >
              Let&apos;s Talk
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

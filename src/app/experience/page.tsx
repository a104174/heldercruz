"use client";

import Link from "next/link";
import {
  Brain,
  Code,
  Code2,
  Cpu,
  Database,
  LineChart,
  Maximize2,
  MessageSquare,
  Monitor,
  Plane,
  Rocket,
  Server,
  Shield,
  Workflow
} from "lucide-react";
import { motion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PortfolioInteractiveLink } from "@/components/ui/portfolio-interactive-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { getExperienceItems } from "@/data/experience";
import { useDictionary, useLocale } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const timelineMeta = [
  {
    period: "2025"
  },
  {
    period: "2025 - Present"
  },
  {
    period: "2022 - 2026"
  }
];

const skillCards = [
  {
    icon: Maximize2,
    className: "md:col-span-2 bg-[#efede9] hover:bg-white"
  },
  {
    icon: Server,
    className: "bg-black text-white hover:bg-[#1a1a1a]"
  },
  {
    icon: Database,
    className: "bg-[#efede9] hover:bg-white"
  },
  {
    icon: MessageSquare,
    className: "bg-[#efede9] hover:bg-white"
  },
  {
    icon: Rocket,
    className: "bg-[#dedbd8] hover:bg-[#efede9]"
  }
];

const foundationAreas = [
  { icon: Database },
  { icon: Code2 },
  { icon: Workflow },
  { icon: Shield },
  { icon: Brain },
  { icon: Cpu },
  { icon: Monitor },
  { icon: LineChart }
];

function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <AnimatedReveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center flex flex-col items-center"
      )}
    >
      {eyebrow ? (
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/38">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[34px] font-semibold leading-[0.98] tracking-normal text-black sm:text-[46px] md:text-[56px]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/58 md:text-base">
          {intro}
        </p>
      ) : null}
    </AnimatedReveal>
  );
}

export default function ExperiencePage() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const localizedExperienceItems = getExperienceItems(locale);

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-32 sm:px-8 md:pb-36 md:pt-40 lg:px-10">
        
        {/* HERO SECTION COREOGRAFADA */}
        <div className="max-w-[900px]">
          {/* Efeito de movimento removido, mantendo apenas a respiração de opacidade */}
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-black/38"
          >
            {dictionary.experience.eyebrow}
          </motion.p>

          <TextAnimate
            animation="blurIn"
            as="h1"
            duration={0.6}
            className="max-w-[900px] text-[48px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[72px] md:text-[80px]"
          >
            {dictionary.experience.heroTitle}
          </TextAnimate>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-7 min-h-[84px] max-w-[600px] md:min-h-[56px]"
          >
            <TypingAnimation
              duration={7}
              className="text-left text-[15px] font-normal leading-7 tracking-normal text-black/56"
            >
              {dictionary.experience.heroIntro}
            </TypingAnimation>
          </motion.div>
        </div>

        {/* TIMELINE COESA (ENTRA TODA DE UMA VEZ) */}
        <AnimatedReveal delay={1} className="relative mt-36">
          {/* Linha vertical condutora da Timeline */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-[1px] -translate-x-1/2 bg-black/10 md:block" />

          <div className="relative z-10 mx-auto flex max-w-[1040px] flex-col gap-y-16 md:gap-y-24">
            {localizedExperienceItems.map((item, index) => {
              const meta = timelineMeta[index];
              const isReversed = index % 2 !== 0;

              return (
                <div 
                  key={item.title} 
                  className="grid gap-6 md:grid-cols-[1fr_70px_1fr] md:gap-0"
                >
                  {/* Bloco de Título */}
                  <div
                    className={cn(
                      "order-1 md:self-center transition-transform duration-500",
                      isReversed ? "md:order-3 md:text-left" : "md:order-1 md:text-right"
                    )}
                  >
                    <h2 className="text-3xl font-medium leading-[1.08] tracking-normal text-black md:text-[34px]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-black/36">
                      {item.organization} · {meta.period}
                    </p>
                  </div>

                  {/* Bloco do Ponto (Dot) */}
                  <div className="order-2 hidden items-center justify-center md:flex md:order-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-black ring-[10px] ring-[#fbfaf7] transition-all duration-500 hover:scale-150 hover:bg-[#ff4b2b]" />
                  </div>

                  {/* Bloco da Descrição */}
                  <div
                    className={cn(
                      "group order-3 md:self-center",
                      isReversed ? "md:order-1" : "md:order-3"
                    )}
                  >
                    <div className="rounded-[28px] border border-black/10 bg-[#efede9] px-8 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)]">
                      <p className="text-[13px] leading-6 text-black/52 transition-colors duration-500 group-hover:text-black/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedReveal>

        {/* SKILLS IN PRACTICE */}
        <section className="mt-36">
          <AnimatedReveal>
            <h2 className="text-3xl font-medium leading-none tracking-normal text-black">
              {dictionary.experience.skillsTitle}
            </h2>
          </AnimatedReveal>
          <AnimatedReveal delay={0.08} className="mt-14 grid gap-6 md:grid-cols-3">
            {skillCards.map((card, index) => {
              const Icon = card.icon;
              const title = dictionary.experience.skillCards[index];

              return (
                <article
                  key={title}
                  className={cn(
                    "group relative flex min-h-[210px] flex-col justify-end overflow-hidden rounded-[24px] border border-black/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]",
                    card.className
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "absolute right-7 top-7 h-6 w-6 stroke-[1.5] transition-all duration-500 group-hover:scale-125 group-hover:rotate-12",
                      card.className.includes("text-white") ? "text-white/38 group-hover:text-white/80" : "text-black/25 group-hover:text-black/70"
                    )}
                  />
                  <h3 className="max-w-[280px] text-3xl font-medium leading-[1.05] tracking-normal transition-transform duration-500 group-hover:translate-x-1">
                    {title}
                  </h3>
                </article>
              );
            })}
          </AnimatedReveal>
        </section>

        {/* BASES ACADÉMICAS */}
        <section className="mt-36">
          <SectionHeading
            title={dictionary.experience.foundationTitle}
            intro={dictionary.experience.foundationIntro}
          />

          <AnimatedReveal delay={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foundationAreas.map((area, index) => {
              const Icon = area.icon;
              const title = dictionary.experience.foundationAreas[index];

              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  className="group rounded-[22px] border border-black/10 bg-[#efede9] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <div className="w-fit rounded-full bg-black/5 p-2.5 transition-colors duration-300 group-hover:bg-black">
                    <Icon aria-hidden="true" className="h-5 w-5 stroke-[1.8] text-black/48 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 text-[13px] font-semibold leading-5 text-black transition-transform duration-300 group-hover:translate-x-1">
                    {title}
                  </h3>
                </motion.article>
              );
            })}
          </AnimatedReveal>

          <AnimatedReveal delay={0.12} className="mt-6">
            <Link
              href="https://github.com/dium-li3/2526-G42"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dictionary.experience.airportRepositoryLabel}
              className="group grid gap-8 rounded-[28px] border border-black/10 bg-[#efede9] p-7 text-black shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:bg-white hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:grid-cols-[0.72fr_1.28fr] md:p-9"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] transition-colors duration-300 group-hover:border-black/15 group-hover:bg-black/[0.06]">
                  <Plane aria-hidden="true" className="h-5 w-5 text-black/62 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-none transition-transform duration-300 group-hover:translate-x-1">
                  {dictionary.experience.airportTitle}
                </h3>
              </div>
              <p className="max-w-2xl text-[14px] leading-7 text-black/62 md:text-[15px]">
                {dictionary.experience.airportDescription}
              </p>
            </Link>
          </AnimatedReveal>
        </section>

        {/* CTA FINAL */}
        <AnimatedReveal className="mt-36">
          <div className="group flex min-h-[430px] flex-col items-center justify-center rounded-[34px] border border-black/5 bg-[#e9e7e3] px-6 py-16 text-center transition-all duration-700 hover:border-transparent hover:bg-[#111111]">
            <h2 className="max-w-[850px] text-[46px] font-semibold leading-[0.94] tracking-normal text-black transition-colors duration-700 group-hover:text-white sm:text-[66px] md:text-[78px]">
              {dictionary.experience.ctaTitle}
            </h2>
            <PortfolioInteractiveLink
              href="/contact"
              className="mt-10 transition-transform duration-500 group-hover:scale-110"
            >
              {dictionary.common.contact}
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

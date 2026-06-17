"use client";

import { Code, Database, Maximize2, MessageSquare, Rocket, Server } from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
import { PortfolioInteractiveButton } from "@/components/ui/portfolio-interactive-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { experienceItems } from "@/data/experience";
import { cn } from "@/lib/utils";

/* 
  NOTA: Como este ficheiro agora usa "use client", a metadata tem de ser 
  movida para um ficheiro experience/layout.tsx
  
  import type { Metadata } from "next";
  export const metadata: Metadata = {
    title: "Experience",
    description: "Experience timeline for Hélder Cruz, including Complear internship, freelance projects and Computer Engineering at Universidade do Minho."
  };
*/

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
    className: "md:col-span-2 bg-[#efede9] hover:bg-white"
  },
  {
    title: "Backend logic",
    icon: Server,
    className: "bg-black text-white hover:bg-[#1a1a1a]"
  },
  {
    title: "Database-driven applications",
    icon: Database,
    className: "bg-[#efede9] hover:bg-white"
  },
  {
    title: "Client communication",
    icon: MessageSquare,
    className: "bg-[#efede9] hover:bg-white"
  },
  {
    title: "Deployment and production setup",
    icon: Rocket,
    className: "bg-[#dedbd8] hover:bg-[#efede9]"
  }
];

export default function ExperiencePage() {
  return (
    <PageShell className="bg-[#fbfaf7]">
      <section className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-32 sm:px-8 md:pb-36 md:pt-40 lg:px-10">
        <AnimatedReveal className="max-w-[900px]">
          {/* Badge a respirar suavemente para indicar que a página está viva */}
          <span className="inline-flex animate-pulse items-center gap-2 rounded-full border border-black/10 bg-[#f2f0ec] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/48 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Experience
          </span>
          
          {/* Efeito Blur In (Magic UI) no Título principal */}
          <TextAnimate 
            animation="blurIn" 
            as="h1" 
            duration={0.8}
            className="mt-10 max-w-[860px] text-[48px] font-semibold leading-[1.02] tracking-normal text-black sm:text-[68px] md:text-[82px]"
          >
            Experience shaped by real projects, teamwork and engineering foundations.
          </TextAnimate>
          
          {/* Efeito Typewriter do Magic UI */}
          <div className="mt-10 min-h-[56px] max-w-[560px]">
            <TypingAnimation 
              duration={30}
              className="text-left text-[15px] font-normal leading-7 tracking-normal text-black/56"
            >
              A mix of academic background, internship experience and freelance client work.
            </TypingAnimation>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="relative mt-36">
          {/* Linha vertical condutora da Timeline (Visível apenas em Desktop) */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-[1px] -translate-x-1/2 bg-black/10 md:block" />

          {/* Timeline robusta com CSS Grid e Order */}
          <div className="relative z-10 mx-auto flex max-w-[1040px] flex-col gap-y-16 md:gap-y-24">
            {experienceItems.map((item, index) => {
              const meta = timelineMeta[index];
              const isReversed = index % 2 !== 0;

              return (
                <div key={item.title} className="grid gap-6 md:grid-cols-[1fr_70px_1fr] md:gap-0">
                  
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
                      {meta.organization} · {meta.period}
                    </p>
                  </div>

                  {/* Bloco do Ponto (Dot) */}
                  <div className="order-2 hidden items-center justify-center md:flex md:order-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-black ring-[10px] ring-[#fbfaf7] transition-all duration-500 hover:scale-150 hover:bg-[#ff4b2b]" />
                  </div>

                  {/* Bloco da Descrição com Hover Interativo */}
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
                    {card.title}
                  </h3>
                </article>
              );
            })}
          </AnimatedReveal>
        </section>

        <AnimatedReveal className="mt-36">
          <div className="group flex min-h-[430px] flex-col items-center justify-center rounded-[34px] border border-black/5 bg-[#e9e7e3] px-6 py-16 text-center transition-all duration-700 hover:border-transparent hover:bg-[#111111]">
            <h2 className="max-w-[850px] text-[46px] font-semibold leading-[0.94] tracking-normal text-black transition-colors duration-700 group-hover:text-white sm:text-[66px] md:text-[78px]">
              Looking for someone
              <br />
              who can build practical
              <br />
              digital products?
            </h2>
            <ContactTrigger asChild>
              <PortfolioInteractiveButton className="mt-10 transition-transform duration-500 group-hover:scale-110">
                Contacto
              </PortfolioInteractiveButton>
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

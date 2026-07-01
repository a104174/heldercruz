"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import {
  Dumbbell,
  Gamepad2,
  GraduationCap,
  Layers,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { PageShell } from "@/components/layout/page-shell";
import {
  PortfolioInteractiveLink
} from "@/components/ui/portfolio-interactive-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { useDictionary } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const skillGroups = [
  {
    titleKey: "languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "SQL"]
  },
  {
    titleKey: "webSoftware",
    skills: ["React", "Next.js", "Node.js", "Vue", "REST APIs"]
  },
  {
    titleKey: "dataInfrastructure",
    skills: ["PostgreSQL", "Supabase", "Docker", "Vercel", "Cloudflare", "Netlify"]
  },
  {
    titleKey: "tools",
    skills: ["Git", "GitHub", "Figma", "Resend", "AI Tools"]
  }
] as const;

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

function SoftCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-[28px] border border-black/10 bg-[#efede9] p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.18)] md:p-7",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const dictionary = useDictionary();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-28 pt-32 sm:px-8 md:pb-36 md:pt-44 lg:px-10">
        
        {/* HERO */}
        <section className="flex flex-col items-start">
          <AnimatedReveal className="flex w-full max-w-[900px] flex-col items-start text-left">
            <motion.p 
              animate={{ opacity: [0.6, 1, 0.6], y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-black/38"
            >
              {dictionary.about.eyebrow}
            </motion.p>

            <TextAnimate
              animation="blurIn"
              as="h1"
              duration={0.65}
              className="max-w-[900px] text-left text-[48px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[72px] md:text-[86px]"
            >
              {dictionary.about.heroTitle}
            </TextAnimate>
          </AnimatedReveal>

          <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center w-full max-w-[1040px]">
            
            <AnimatedReveal delay={0.95}>
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[34px] border border-black/10 bg-[#111] shadow-[0_28px_90px_-20px_rgba(0,0,0,0.2)] transition-shadow duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
                <Image
                  src="/pages/about/helder.JPG"
                  alt="Portrait of Hélder Cruz"
                  fill
                  className="object-cover object-[58%_38%] brightness-[0.95] contrast-[1.1] saturate-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
                  sizes="(min-width: 768px) 500px, calc(100vw - 40px)"
                  priority
                />
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={1.08} className="flex flex-col justify-center">
              <p className="text-[15px] leading-8 text-black/70 md:text-[16px] xl:text-[17px]">
                {dictionary.about.heroIntro}
              </p>
            </AnimatedReveal>

          </div>
        </section>

        {/* HISTÓRIA E INTRODUÇÃO (TIMELINE MINIMALISTA E CLARA) */}
        <section className="mt-36 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            title={dictionary.about.storyTitle}
            intro={dictionary.about.storyIntro}
          />

          <AnimatedReveal delay={0.08}>
            <div className="relative px-1 py-2 md:px-3">
                
              {/* Linha Fixa Ultra Discreta */}
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-[14px] top-4 w-px bg-black/[0.04] md:left-[22px]"
              />
                
              {/* ANIMAÇÃO AUTÓNOMA 1: O fluxo de dados contínuo (gota a cair) */}
              <div className="absolute bottom-4 left-[14px] top-4 w-px overflow-hidden md:left-[22px]">
                <motion.div
                  animate={{ y: ["-100%", "300%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="h-[30%] w-full bg-gradient-to-b from-transparent via-black/20 to-transparent"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                {dictionary.about.storyJourneySteps.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="grid grid-cols-[28px_1fr] items-start gap-4"
                  >
                    {/* Ponto Cirúrgico */}
                    <div className="relative flex justify-center pt-1.5">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-black/5 bg-[#fbfaf7] shadow-sm">
                        {/* ANIMAÇÃO AUTÓNOMA 2: Respiração assíncrona das bolinhas */}
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ 
                            duration: 3, 
                            delay: index * 0.5, /* Delay sequencial cria um efeito de onda */
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-black/40"
                        />
                      </div>
                    </div>

                    {/* Texto Super Compacto e Direto */}
                    <div>
                      <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-black/90">
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">
                          0{index + 1} ·
                        </span>
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-black/60">
                        {item.text}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </AnimatedReveal>
        </section>

        {/* PROJETOS REAIS */}
        <section className="mt-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title={dictionary.about.clientWorkTitle}
              intro={dictionary.about.clientWorkIntro}
            />
            <AnimatedReveal delay={0.08} className="shrink-0">
              <PortfolioInteractiveLink href="/projects">{dictionary.common.viewSelectedProjects}</PortfolioInteractiveLink>
            </AnimatedReveal>
          </div>

          <AnimatedReveal delay={0.12} className="mt-12 grid gap-5 lg:grid-cols-3">
            {dictionary.about.clientProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={cn(
                  "group rounded-[28px] border border-black/10 bg-[#efede9] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.18)]",
                  index === 0 && "lg:col-span-1"
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 transition-colors duration-300 group-hover:text-black/60">
                  0{index + 1}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-none text-black transition-transform duration-300 group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="mt-6 text-[13px] leading-7 text-black/58">{project.text}</p>
              </motion.article>
            ))}
          </AnimatedReveal>
        </section>

        {/* PRINCIPIOS */}
        <section className="mt-36">
          <SectionHeading
            title={dictionary.about.approachTitle}
            intro={dictionary.about.approachIntro}
          />

          <AnimatedReveal delay={0.08} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dictionary.about.principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group flex min-h-[260px] flex-col justify-between rounded-[26px] border border-black/10 bg-[#efede9] p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/32 transition-colors duration-300 group-hover:text-[#ff4b2b]">
                  {dictionary.about.principleLabel}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold leading-5 text-black transition-transform duration-300 group-hover:translate-x-1">
                    {principle.title}
                  </h3>
                  <p className="mt-5 text-[13px] leading-6 text-black/56">{principle.text}</p>
                </div>
              </motion.article>
            ))}
          </AnimatedReveal>
        </section>

        {/* VALORES */}
        <section className="mt-36">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeading
              title={dictionary.about.valuesTitle}
              intro={dictionary.about.valuesIntro}
            />

            <AnimatedReveal delay={0.08}>
              <div className="max-w-[720px] lg:ml-auto">
                <div className="divide-y divide-black/10 border-y border-black/10">
                  {dictionary.about.coreValues.map((value, index) => (
                    <motion.article
                      key={value.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      className="grid gap-4 py-6 sm:grid-cols-[72px_0.7fr_1fr] sm:items-start"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/28">
                        0{index + 1}
                      </span>
                      <h3 className="text-[18px] font-semibold leading-5 text-black">
                        {value.title}
                      </h3>
                      <p className="text-[13px] leading-6 text-black/56">
                        {value.text}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </section>

        {/* BEYOND CODE */}
        <AnimatedReveal className="mt-36">
          <div className="group flex flex-col items-center justify-between gap-10 rounded-[32px] border border-black/10 bg-[#efede9] p-7 transition-all duration-700 hover:bg-white hover:shadow-xl md:flex-row md:p-9 lg:gap-16 lg:p-12">
            
            {/* Lado Esquerdo: Toda a Narrativa (Título, Texto, Ícones) */}
            <div className="flex flex-col md:max-w-[55%] lg:max-w-[50%]">
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 transition-colors duration-300 group-hover:text-black/60">
                  {dictionary.about.beyondCodeEyebrow}
                </p>
                <h2 className="text-3xl font-semibold leading-none text-black transition-transform duration-500 group-hover:translate-x-1 lg:text-4xl">
                  {dictionary.about.beyondCodeTitle}
                </h2>
              </div>
              
              <p className="mt-6 text-[14px] leading-relaxed text-black/60 transition-colors duration-500 group-hover:text-black/80 lg:text-[15px]">
                {dictionary.about.beyondCodeText}
              </p>

              <div className="mt-8 flex gap-5 text-black/40">
                <Trophy aria-hidden="true" className="h-5 w-5 transition-colors duration-300 group-hover:text-yellow-600" />
                <Dumbbell aria-hidden="true" className="h-5 w-5 transition-colors duration-300 group-hover:text-black" />
                <Users aria-hidden="true" className="h-5 w-5 transition-colors duration-300 group-hover:text-blue-600" />
              </div>
            </div>

            {/* Lado Direito: A Imagem Larga e Nítida */}
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[24px] border border-black/10 bg-black/5 shadow-md transition-transform duration-700 group-hover:-translate-y-1 sm:max-w-[360px] md:aspect-[4/5] md:w-[45%] lg:w-[420px]">
              <Image
                src="/pages/about/esports-champion.jpg"
                alt="Esports championship moment"
                fill
                /* O Segredo da Nitidez: Forçar o carregamento de resoluções muito superiores ao contentor */
                sizes="(min-width: 1024px) 800px, (min-width: 768px) 600px, 100vw"
                quality={95}
                className="object-cover grayscale-[40%] saturate-[0.8] contrast-[1.05] transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:saturate-100"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-black/80 shadow-sm backdrop-blur-md">
                University Esports · &apos;26
              </span>
            </div>
            
          </div>
        </AnimatedReveal>


        {/* SKILLS GROUPS */}
        <section className="mt-36">
          <SectionHeading
            align="center"
            title={dictionary.about.skillsTitle}
            intro={dictionary.about.skillsIntro}
          />

          <AnimatedReveal delay={0.08} className="mt-12 grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, groupIndex) => (
              <SoftCard key={group.titleKey} className="hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-black/5 p-2 transition-colors duration-300 group-hover:bg-black">
                    <GraduationCap aria-hidden="true" className="h-5 w-5 text-black/40 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-black/60 transition-colors duration-300 group-hover:text-black">
                    {dictionary.about.skillGroupTitles[group.titleKey]}
                  </h3>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {group.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (groupIndex * 0.1) + (index * 0.04) }}
                      className="cursor-default rounded-full border border-black/10 bg-[#fbfaf7] px-3 py-1.5 text-[11px] font-semibold text-black/58 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-black hover:text-white hover:shadow-md"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </SoftCard>
            ))}
          </AnimatedReveal>
        </section>

        {/* CTA FINAL */}
        <AnimatedReveal className="mt-36">
          <div className="group flex min-h-[390px] flex-col items-center justify-center rounded-[34px] border border-black/10 bg-[#efede9] px-6 py-16 text-center shadow-sm transition-all duration-700 hover:border-transparent hover:bg-[#111111]">
            <h2 className="max-w-[760px] text-[42px] font-semibold leading-[0.92] tracking-normal text-black transition-colors duration-700 group-hover:text-white sm:text-[62px] md:text-[76px]">
              {dictionary.about.ctaTitle}
            </h2>
            <p className="mt-7 max-w-[520px] text-[14px] leading-7 text-black/54 transition-colors duration-700 group-hover:text-white/62">
              {dictionary.about.ctaText}
            </p>
            <PortfolioInteractiveLink
              href="/contact"
              className="mt-10 transition-transform duration-500 group-hover:scale-105"
            >
              {dictionary.common.contact}
            </PortfolioInteractiveLink>
          </div>
        </AnimatedReveal>
      </div>
    </PageShell>
  );
}

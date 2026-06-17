"use client";

import Image from "next/image";
import { Layers, Search, Server, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";
import { PortfolioInteractiveButton } from "@/components/ui/portfolio-interactive-button";
import { TypingAnimation } from "@/components/ui/typing-animation";

const workValues = [
  {
    title: "Clean interfaces",
    icon: Layers
  },
  {
    title: "Reliable systems",
    icon: Server
  },
  {
    title: "Practical business value",
    icon: TrendingUp
  },
  {
    title: "Attention to detail",
    icon: Search
  }
];

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
  "Python",
  "Resend",
  "Figma"
];

export default function AboutPage() {
  return (
    <PageShell className="bg-[#f8f6f1]">
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-28 pt-32 sm:px-8 md:pb-36 md:pt-44 lg:px-10">
        <AnimatedReveal className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          {/* Efeito "Alive": Pulse suave contínuo para mostrar que a página está ativa */}
          <motion.span 
            animate={{ opacity: [0.6, 1, 0.6], y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full border border-black/10 bg-[#fbfaf7] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/42 shadow-sm"
          >
            About
          </motion.span>
          
          <h1 className="mt-8 text-[56px] font-semibold leading-[0.86] tracking-normal text-black sm:text-[82px] md:text-[102px]">
            Building
            <br />
            software that
            <br />
            feels simple,
            <br />
            useful and
            <br />
            polished.
          </h1>
          
          {/* Efeito Typewriter do Magic UI */}
          <div className="mt-8 flex min-h-[48px] max-w-[560px] items-center justify-center text-[13px] leading-6 text-black/60">
            <TypingAnimation 
              duration={30}
              className="font-normal text-[13px] leading-6 tracking-normal"
            >
              I am Hélder Cruz, a Software Engineer graduated in Computer Engineering from Universidade do Minho.
            </TypingAnimation>
          </div>
        </AnimatedReveal>

        <div id="vision" className="mt-36 grid gap-10 md:grid-cols-[1fr_1.08fr] md:items-center">
          <AnimatedReveal className="max-w-[460px]">
            <h2 className="text-2xl font-medium leading-none tracking-normal text-black">
              Personal Intro
            </h2>
            <p className="mt-8 text-[14px] leading-7 text-black/56">
              I focus on building clean, scalable and user-focused web applications, combining
              frontend development, backend logic, databases and deployment. I have worked on real
              client projects, including business websites, reservation systems and backoffice
              platforms.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.08}>
            <div className="group relative aspect-[1.35] min-h-[300px] overflow-hidden rounded-[34px] border border-black/10 bg-[#efede9] shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-1">
              <Image
                src="/pages/about/helder.JPG"
                alt="Portrait of Hélder Cruz"
                fill
                className="object-cover object-[58%_42%] brightness-[0.92] contrast-[1.12] saturate-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:contrast-[1.05]"
                sizes="(min-width: 768px) 580px, calc(100vw - 40px)"
                priority
              />
            </div>
          </AnimatedReveal>
        </div>

        <AnimatedReveal className="mx-auto mt-36 max-w-[820px]">
          <div className="group rounded-[34px] border border-black/10 bg-[#efede9] px-8 py-14 text-center transition-all duration-500 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] md:px-16">
            <h2 className="text-2xl font-medium leading-none tracking-normal text-black transition-transform duration-500 group-hover:scale-[1.02]">
              Computer Engineering
            </h2>
            <p className="mx-auto mt-8 max-w-[620px] text-[13px] leading-6 text-black/52 transition-colors duration-500 group-hover:text-black/70">
              Graduated in Computer Engineering from Universidade do Minho, with foundations in
              software engineering, databases, distributed systems, computer networks, security,
              human-computer interaction and artificial intelligence.
            </p>
          </div>
        </AnimatedReveal>

        <section className="mt-36">
          <AnimatedReveal>
            <h2 className="text-center text-2xl font-medium leading-none tracking-normal text-black">
              How I Work
            </h2>
          </AnimatedReveal>
          <AnimatedReveal delay={0.08} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workValues.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group flex min-h-[168px] flex-col justify-between rounded-[24px] border border-black/10 bg-[#efede9] p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]"
                >
                  {/* Ícone com animação no hover */}
                  <div className="rounded-full bg-black/5 p-3 w-fit transition-all duration-500 group-hover:bg-black group-hover:shadow-md">
                    <Icon aria-hidden="true" className="h-5 w-5 stroke-[1.8] text-black transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="text-[13px] font-semibold leading-5 tracking-normal text-black transition-transform duration-500 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                </motion.article>
              );
            })}
          </AnimatedReveal>
        </section>

        <section className="mt-36">
          <AnimatedReveal>
            <h2 className="text-center text-2xl font-medium leading-none tracking-normal text-black">
              Skills
            </h2>
          </AnimatedReveal>
          <AnimatedReveal
            delay={0.08}
            className="mx-auto mt-10 flex max-w-[760px] flex-wrap justify-center gap-3"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className="cursor-default rounded-full border border-black/10 bg-[#efede9] px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-black/42 transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg hover:border-black"
              >
                {skill}
              </motion.span>
            ))}
          </AnimatedReveal>
        </section>

        <AnimatedReveal className="mt-36">
          <div className="group flex min-h-[430px] flex-col items-center justify-center rounded-[34px] border border-black/10 bg-[#efede9] px-6 py-16 text-center transition-all duration-700 hover:bg-[#111111] hover:border-transparent">
            <h2 className="max-w-[660px] text-[44px] font-semibold leading-[0.9] tracking-normal text-black transition-colors duration-700 group-hover:text-white sm:text-[64px] md:text-[76px]">
              Want to build
              <br />
              something together?
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

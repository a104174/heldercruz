import type { Metadata } from "next";
import { Clock, Layers, Search, Server, TrendingUp } from "lucide-react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Hélder Cruz, Software Engineer graduated in Computer Engineering from Universidade do Minho."
};

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
          <span className="rounded-full border border-black/10 bg-[#fbfaf7] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/42">
            About
          </span>
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
          <p className="mt-8 max-w-[560px] text-[13px] leading-6 text-black/52">
            I am Hélder Cruz, a Software Engineer graduated in Computer Engineering from
            Universidade do Minho.
          </p>
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
            <div className="flex aspect-[1.35] min-h-[300px] items-center justify-center rounded-[34px] border border-black/10 bg-[#efede9]">
              <Clock aria-hidden="true" className="h-28 w-28 stroke-[1.6] text-black" />
            </div>
          </AnimatedReveal>
        </div>

        <AnimatedReveal className="mx-auto mt-36 max-w-[820px]">
          <div className="rounded-[34px] border border-black/10 bg-[#efede9] px-8 py-14 text-center md:px-16">
            <h2 className="text-2xl font-medium leading-none tracking-normal text-black">
              Computer Engineering
            </h2>
            <p className="mx-auto mt-8 max-w-[620px] text-[13px] leading-6 text-black/52">
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
            {workValues.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="flex min-h-[168px] flex-col justify-between rounded-[24px] border border-black/10 bg-[#efede9] p-7"
                >
                  <Icon aria-hidden="true" className="h-5 w-5 stroke-[1.8] text-black" />
                  <h3 className="text-[13px] font-semibold leading-5 tracking-normal text-black">
                    {item.title}
                  </h3>
                </article>
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
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-black/10 bg-[#efede9] px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-black/42"
              >
                {skill}
              </span>
            ))}
          </AnimatedReveal>
        </section>

        <AnimatedReveal className="mt-36">
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[34px] border border-black/10 bg-[#efede9] px-6 py-16 text-center">
            <h2 className="max-w-[660px] text-[44px] font-semibold leading-[0.9] tracking-normal text-black sm:text-[64px] md:text-[76px]">
              Want to build
              <br />
              something together?
            </h2>
            <ContactTrigger
              variant="ghost"
              size="sm"
              className="mt-10 !h-11 !rounded-full !bg-black !px-7 !text-[10px] !font-bold !uppercase !text-white hover:!bg-black/82"
            >
              Contact Me
            </ContactTrigger>
          </div>
        </AnimatedReveal>
      </section>
    </PageShell>
  );
}

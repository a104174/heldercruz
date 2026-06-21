"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUpRight,
  Database,
  FileText,
  Folder,
  GitBranch,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { HomeServicesBento } from "@/components/home/home-services-bento";
import {
  PortfolioInteractiveButton,
  PortfolioInteractiveLink
} from "@/components/ui/portfolio-interactive-button";
import { TextAnimate } from "@/components/ui/text-animate";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { cn } from "@/lib/utils";
import { projects, type Project, type ProjectSlug } from "@/data/projects";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Vercel",
  "GitHub",
  "Resend"
];

const heroImage = "/hausb/mac2.webp";
const heroTitle = "Software Engineer crafting digital products.";
const heroTitleWords = heroTitle.split(" ");

const projectDescriptions: Record<ProjectSlug, string> = {
  "casa-benfica-lenzburg":
    "Public website, reservation backoffice and restaurant billing system.",
  "xv-studio": "Multi-page service website with custom layouts and step-based contact flow.",
  hausb: "Modern business website focused on clean presentation and responsive design."
};

const focusCards = [
  {
    title: "Frontend Development",
    text: "Clean responsive interfaces with polished interaction details.",
    image: "/hausb/hausb-home.webp"
  },
  {
    title: "Backoffice Systems",
    text: "Practical internal tools for reservations, billing and operations.",
    image: "/xvstudio/xvstudio-backoffice.webp"
  },
  {
    title: "API Integrations",
    text: "Reliable connections between forms, emails, databases and deployments.",
    image: "/xvstudio/xvstudio-contact-project.webp"
  },
  {
    title: "Product Delivery",
    text: "Built with attention to detail, performance and usability.",
    image: "/hausb/hausb-portfolio.webp"
  }
];

const insightCards = [
  {
    title: "Engineering clean interfaces",
    eyebrow: "Frontend",
    image: "/hausb/hausb-arquitetura.webp"
  },
  {
    title: "From polished websites to business tools",
    eyebrow: "Systems",
    image: "/xvstudio/xvstudio-sites.webp"
  },
  {
    title: "Useful products for real client workflows",
    eyebrow: "Delivery",
    image: "/hausb/hausb-about.webp"
  }
];

function imageStyle(url: string, overlay = "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))") {
  return {
    backgroundImage: `${overlay}, url("${url}")`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  } satisfies CSSProperties;
}

function HomeContactButton() {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <ContactTrigger asChild>
        <PortfolioInteractiveButton>Contacto</PortfolioInteractiveButton>
      </ContactTrigger>
    </motion.div>
  );
}

function SectionShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-[1728px] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </section>
  );
}

function useMinViewportWidth(width: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [width]);

  return matches;
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroEntrance = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  return (
    <SectionShell className="flex flex-col items-center pb-28 pt-40 text-center sm:pt-44 md:pb-40 md:pt-56">
      <div className="flex max-w-5xl flex-col items-center">
        <h1
          aria-label={heroTitle}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.02] text-black sm:text-6xl md:text-7xl lg:text-[82px]"
        >
          {shouldReduceMotion ? (
            <span aria-hidden="true">{heroTitle}</span>
          ) : (
            <span aria-hidden="true">
              {heroTitleWords.map((word, index) => (
                <span key={word} className="inline-block whitespace-nowrap">
                  <TextAnimate
                    as="span"
                    animation="blurInUp"
                    by="character"
                    once
                    accessible={false}
                    delay={index * 0.08}
                    duration={0.5}
                  >
                    {word}
                  </TextAnimate>
                  {index < heroTitleWords.length - 1 ? " " : null}
                </span>
              ))}
            </span>
          )}
        </h1>
        <motion.p
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={heroEntrance}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.55,
            delay: shouldReduceMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-7 max-w-3xl text-base leading-7 text-[#6e6a63] sm:text-lg sm:leading-8"
        >
          I build clean, scalable and user-focused web applications, combining frontend
          engineering, backend systems and polished user experiences.
        </motion.p>
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={heroEntrance}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <PortfolioInteractiveLink href="/projects">Ver projetos</PortfolioInteractiveLink>
          <HomeContactButton />
        </motion.div>
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.985, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.7,
          delay: shouldReduceMotion ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative z-10 mt-12 h-[360px] w-full max-w-[1450px] overflow-hidden rounded-[28px] border border-black/10 bg-[#151515] shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:h-[520px] md:rounded-[40px] lg:h-[760px]"
      >
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
          style={imageStyle(heroImage, "linear-gradient(transparent, transparent)")}
        />
      </motion.div>
    </SectionShell>
  );
}

function TechStrip() {
  const loopedTechnologies = [...technologies, ...technologies];

  return (
    <section className="border-t border-[#dfddd6]/70 py-12">
      <div className="home-marquee mx-auto flex max-w-[1728px] overflow-hidden px-5 text-[#858178] [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] sm:px-8 lg:px-10">
        <div className="flex w-max items-center gap-14 [animation:home-marquee_34s_linear_infinite] sm:gap-20 lg:gap-24">
          {loopedTechnologies.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="whitespace-nowrap text-lg font-semibold transition-colors duration-300 hover:text-black text-[#77736b] sm:text-xl md:text-2xl"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingVisual({
  className,
  image,
  children,
  enableFloat,
  floatDelay = 0,
  floatDuration = 5
}: {
  className: string;
  image?: string;
  children: ReactNode;
  enableFloat: boolean;
  floatDelay?: number;
  floatDuration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const shouldFloat = enableFloat && !shouldReduceMotion;

  return (
    <motion.div
      animate={shouldFloat ? { y: [0, -12, 0] } : { y: 0 }}
      transition={
        shouldFloat
          ? {
              duration: floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: floatDelay
            }
          : { duration: 0 }
      }
      className={cn(
        "relative min-w-0 2xl:absolute",
        className
      )}
    >
      <AnimatedReveal className="relative h-full min-h-[inherit] w-full overflow-hidden rounded-[28px] border border-white/45 bg-white/20 shadow-[0_18px_55px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
        {image ? <div className="absolute inset-0" style={imageStyle(image)} /> : null}
        <div className="absolute inset-0 bg-white/5" />
        <div className="relative z-10 h-full">{children}</div>
      </AnimatedReveal>
    </motion.div>
  );
}

function CollageSection() {
  const shouldReduceMotion = useReducedMotion();
  const isFloatingLayout = useMinViewportWidth(1536);
  const shouldFloat = isFloatingLayout && !shouldReduceMotion;

  return (
    <section className="relative z-10 isolate w-full overflow-visible bg-[#fbfaf7]">
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#fbfaf7]" />
      <div className="relative z-10 mx-auto w-full max-w-[1728px] overflow-visible px-5 py-20 sm:px-8 md:py-24 lg:px-10 2xl:min-h-[1120px] 2xl:py-32">
        <AnimatedReveal className="pointer-events-none relative z-10 flex items-center justify-center 2xl:absolute 2xl:inset-0">
          <h2 className="text-center text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.94] text-black 2xl:text-[118px]">
            Engineering
            <br />
            Intelligence
          </h2>
        </AnimatedReveal>

        <div className="relative z-20 mx-auto mt-12 grid w-full max-w-[760px] grid-cols-1 gap-5 md:gap-6 min-[1180px]:max-w-[1120px] min-[1180px]:grid-cols-2 2xl:absolute 2xl:inset-0 2xl:mt-0 2xl:block 2xl:max-w-none">
          <FloatingVisual
            image="/hausb/hausb-home.webp"
            enableFloat={isFloatingLayout}
            className="min-h-[235px] 2xl:left-[8%] 2xl:top-[8%] 2xl:h-[250px] 2xl:w-[340px]"
            floatDuration={6}
          >
            <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/45 bg-white/35 p-4 shadow-lg backdrop-blur-xl">
              <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-black">
                <span>Deploying</span>
                <span>78%</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "78%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-1.5 rounded-full bg-black" 
                />
              </div>
            </div>
          </FloatingVisual>

          <FloatingVisual
            image="/hausb/hausb-mobile-menu.webp"
            enableFloat={isFloatingLayout}
            className="min-h-[290px] 2xl:right-[10%] 2xl:top-[12%] 2xl:h-[310px] 2xl:w-[280px]"
            floatDelay={1}
            floatDuration={5}
          >
            <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/45 shadow-sm backdrop-blur-xl">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Sparkles aria-hidden="true" className="h-4 w-4 text-black" />
              </motion.div>
            </div>
          </FloatingVisual>

          <motion.div
            animate={shouldFloat ? { y: [0, -8, 0] } : { y: 0 }}
            transition={
              shouldFloat
                ? { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                : { duration: 0 }
            }
            className="relative min-h-[180px] min-w-0 2xl:absolute 2xl:left-[4%] 2xl:top-[46%] 2xl:min-h-0 2xl:w-[280px]"
          >
            <AnimatedReveal className="flex h-full min-h-[inherit] rounded-[24px] border border-white/50 bg-white/35 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-black">API Sync</span>
                  <span className="relative h-6 w-11 rounded-full bg-black">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"
                    />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff416c] to-[#ff4b2b] text-white shadow-md">
                    <GitBranch aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-black">Contact Flow</span>
                    <span className="text-xs text-[#6e6a63]">Connected</span>
                  </span>
                </div>
              </div>
            </AnimatedReveal>
          </motion.div>

          <FloatingVisual
            image="/xvstudio/xvstudio-contact.webp"
            enableFloat={isFloatingLayout}
            className="min-h-[220px] 2xl:right-[5%] 2xl:top-[48%] 2xl:h-[220px] 2xl:w-[330px]"
            floatDelay={2}
            floatDuration={7}
          >
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/55 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-xl">
              <motion.span 
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.85)]" 
              />
              <span className="text-[10px] font-bold uppercase text-black">Database Layer</span>
            </div>
          </FloatingVisual>

          <FloatingVisual
            image="/hausb/hausb-mobile-construcao.webp"
            enableFloat={isFloatingLayout}
            className="min-h-[245px] 2xl:left-[14%] 2xl:top-[70%] 2xl:h-[250px] 2xl:w-[380px]"
            floatDelay={0.5}
          >
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/55 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-xl">
              <MonitorSmartphone aria-hidden="true" className="h-4 w-4 text-black" />
              <span className="text-[10px] font-bold uppercase text-black">Responsive UI</span>
            </div>
          </FloatingVisual>

          <FloatingVisual
            image="/hausb/hausb-portfolio.webp"
            enableFloat={isFloatingLayout}
            className="min-h-[230px] 2xl:right-[15%] 2xl:top-[76%] 2xl:h-[230px] 2xl:w-[360px]"
            floatDelay={1.5}
            floatDuration={5.5}
          >
            <div className="absolute bottom-5 left-5 right-5 rounded-[18px] border border-white/45 bg-white/35 p-4 backdrop-blur-xl">
              <span className="text-xs font-bold text-black">Client Portal</span>
              <p className="mt-1 text-xs leading-5 text-black/70">Ready for handoff and iteration.</p>
            </div>
          </FloatingVisual>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <SectionShell className="relative flex items-center justify-center py-28 text-center md:py-44">
      <div className="pointer-events-none absolute right-[6%] top-8 h-64 w-64 opacity-20 md:h-96 md:w-96">
        <motion.span 
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-[#ff4b2b]/45" 
        />
        <span className="absolute inset-x-1/4 inset-y-0 rounded-full border border-[#ff4b2b]/35" />
        <span className="absolute inset-x-0 inset-y-1/4 rounded-full border border-[#ff4b2b]/35" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-[#ff4b2b]/25" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-[#ff4b2b]/25" />
      </div>
      <AnimatedReveal>
        <p className="relative z-10 mx-auto max-w-5xl text-balance text-2xl font-light leading-tight text-black sm:text-3xl md:text-5xl">
          Engineering clean interfaces and reliable systems for digital products that feel simple,
          useful and effortless.
        </p>
      </AnimatedReveal>
    </SectionShell>
  );
}

function FeatureRail({
  title,
  items
}: {
  title: ReactNode;
  items: Array<{ title: string; text: string }>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItemSize = `${100 / items.length}%`;

  useEffect(() => {
    if (shouldReduceMotion || items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [items.length, shouldReduceMotion]);

  return (
    <div className="flex h-full max-w-xl flex-col justify-center">
      <h2 className="mb-10 text-3xl font-bold leading-tight text-black md:text-4xl">{title}</h2>
      <div className="relative border-l-[3px] border-[#d9d7d0] pl-7">
        <motion.span
          aria-hidden="true"
          animate={{
            top: `${activeIndex * (100 / items.length)}%`,
            height: activeItemSize
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-[3px] w-[3px] bg-gradient-to-b from-[#ff416c] to-[#ff4b2b]"
        />
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={item.title}
              animate={{
                opacity: isActive ? 1 : 0.58
              }}
              whileHover={{ x: 4, opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
              className="py-[18px] first:pt-0 last:pb-0"
            >
              <motion.h3
                animate={{ color: isActive ? "#000000" : "#6a6a6a" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
                className="text-xl font-bold"
              >
                {item.title}
              </motion.h3>
              <motion.p
                animate={{ color: isActive ? "#706c64" : "#9f9b94" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
                className="mt-2 text-sm leading-7"
              >
                {item.text}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SystemsSection() {
  return (
    <SectionShell className="py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <AnimatedReveal className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[36px] border border-[#d9d7d0]/70 bg-gradient-to-br from-[#f4f3ef] to-[#e9e8e4] p-6 shadow-sm lg:min-h-[650px]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-md rounded-[18px] border border-[#d9d7d0]/70 bg-[#fffdf8] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.12)]"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-bold text-black">Workspace</span>
              <span className="h-2 w-10 rounded-full bg-[#d9d7d0]" />
            </div>
            <div className="space-y-3">
              {[
                { icon: Folder, label: "Frontend_App", color: "text-[#ff4b2b]" },
                { icon: Database, label: "Supabase_DB", color: "text-[#8a2387]" },
                { icon: FileText, label: "Contact_Flows", color: "text-[#e94057]" },
                { icon: ShieldCheck, label: "API_Backoffice", color: "text-[#f27121]" }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 5, backgroundColor: "#f0efeb" }}
                  className="flex items-center gap-4 rounded-[10px] p-3 transition"
                >
                  <item.icon aria-hidden="true" className={cn("h-5 w-5", item.color)} />
                  <span className="text-sm font-medium text-black">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="flex items-center">
          <FeatureRail
            title={
              <>
                The engineering foundation
                <br />
                for your product.
              </>
            }
            items={[
              {
                title: "Frontend Development",
                text: "Interfaces built with clear hierarchy, responsive layouts and reusable component patterns."
              },
              {
                title: "Backoffice Systems",
                text: "Internal workflows for reservations, billing, content and operational needs."
              },
              {
                title: "API Integrations",
                text: "Reliable connections between forms, email services, databases and deployed products."
              }
            ]}
          />
        </AnimatedReveal>
      </div>
    </SectionShell>
  );
}

function FocusSection() {
  return (
    <SectionShell className="flex flex-col items-center py-24 md:py-36">
      <AnimatedReveal className="text-center">
        <h2 className="text-3xl font-bold text-black md:text-4xl">Built for real client needs.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Frontend", "Backoffice", "APIs", "Data"].map((item, index) => (
            <motion.span
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold shadow-sm cursor-default",
                index === 0 ? "bg-black text-[#fbfaf7]" : "bg-white text-black"
              )}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </AnimatedReveal>

      <div className="mt-14 grid w-full gap-5 md:grid-cols-2">
        {focusCards.map((card, index) => (
          <AnimatedReveal
            key={card.title}
            delay={index * 0.04}
            className="group relative flex min-h-[360px] overflow-hidden rounded-[28px] border border-black/10 p-7 shadow-sm md:min-h-[420px]"
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
              style={imageStyle(card.image)}
            />
            <div className="absolute inset-0 bg-black/45 transition-opacity duration-500 group-hover:bg-black/60" />
            <div className="relative z-10 mt-auto max-w-md text-white">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/78">{card.text}</p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </SectionShell>
  );
}

function HomeProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <AnimatedReveal delay={index * 0.05}>
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Link
          href={project.href}
          className="group relative flex min-h-[420px] overflow-hidden rounded-[28px] border border-black/10 bg-[#151515] p-6 text-white shadow-sm transition-shadow hover:shadow-[0_26px_70px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <div
            className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                `radial-gradient(circle at 24% 18%, ${project.accent} 0, transparent 35%), ` +
                "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 42%, rgba(0,0,0,0.55))"
            }}
          />
          <div className="absolute left-6 right-6 top-6 h-44 rounded-[18px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
              </div>
              <span className="h-2 w-16 rounded-full bg-white/25" />
            </div>
            <div className="grid h-[100px] grid-cols-5 gap-3">
              <span className="col-span-2 rounded-[10px] bg-white/18" />
              <span className="col-span-3 rounded-[10px] bg-white/10" />
              <span className="col-span-3 rounded-[10px] bg-white/10" />
              <span className="col-span-2 rounded-[10px] bg-white/18" />
            </div>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase text-white/55">
              <span>{project.role}</span>
              {project.year ? <span>• {project.year}</span> : null}
            </div>
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">{projectDescriptions[project.slug]}</p>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-white/65 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white group-hover:scale-110"
              />
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatedReveal>
  );
}

function ProjectsSection() {
  return (
    <SectionShell className="py-20 md:py-28">
      <AnimatedReveal className="mb-12 text-center">
        <p className="mb-4 text-[11px] font-bold uppercase text-[#77736b]">Selected Work</p>
        <h2 className="text-3xl font-bold text-black md:text-4xl">Built and shipped for clients.</h2>
      </AnimatedReveal>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project, index) => (
          <HomeProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}

function QuoteSection() {
  return (
    <SectionShell className="flex flex-col items-center py-24 text-center md:py-36">
      <AnimatedReveal>
        <blockquote className="mx-auto max-w-5xl text-balance text-3xl font-normal leading-tight text-black md:text-5xl">
          “Good software should feel simple, useful and effortless.”
        </blockquote>
        <div className="mt-10 inline-flex items-center gap-4">
          <motion.span 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-md cursor-default"
          >
            HC
          </motion.span>
          <span className="text-left">
            <span className="block text-sm font-bold text-black">Hélder Cruz</span>
            <span className="text-xs font-medium text-[#77736b]">Software Engineer</span>
          </span>
        </div>
      </AnimatedReveal>
    </SectionShell>
  );
}

function InsightSection() {
  return (
    <SectionShell className="py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between gap-6">
        <AnimatedReveal>
          <p className="mb-3 text-[11px] font-bold uppercase text-[#77736b]">Latest Focus</p>
          <h2 className="text-3xl font-bold text-black md:text-4xl">Development focus</h2>
        </AnimatedReveal>
        <Link
          href="/work"
          className="hidden border-b border-black pb-1 text-sm font-bold text-black transition hover:text-[#ff4b2b] sm:inline-flex"
        >
          View Work
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {insightCards.map((card, index) => (
          <AnimatedReveal key={card.title} delay={index * 0.04}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link href="/work" className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                <div
                  className="mb-5 h-[360px] rounded-[28px] border border-black/10 shadow-xl transition-all duration-500 group-hover:shadow-2xl md:h-[430px]"
                  style={imageStyle(card.image)}
                />
                <p className="mb-2 text-xs font-bold text-[#77736b] transition-colors group-hover:text-black">{card.eyebrow}</p>
                <h3 className="text-xl font-bold text-black">{card.title}</h3>
              </Link>
            </motion.div>
          </AnimatedReveal>
        ))}
      </div>
    </SectionShell>
  );
}

function CtaSection() {
  return (
    <section className="px-5 py-24 sm:px-8 md:pt-28 md:pb-24 lg:px-10">
      <AnimatedReveal className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.span 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-10 flex h-12 w-12 items-center justify-center rounded-full border border-black text-sm font-bold text-black"
        >
          HC
        </motion.span>
        <Text3DFlip
          as="h2"
          className="justify-center bg-[#fbfaf7] font-sans text-4xl font-semibold leading-none tracking-[-0.05em] text-black sm:text-6xl md:text-7xl lg:text-8xl"
          textClassName="bg-[#fbfaf7] text-black"
          flipTextClassName="bg-[#fbfaf7] text-black"
          rotateDirection="top"
          staggerDuration={0.03}
          staggerFrom="center"
          transition={{ type: "spring", damping: 25, stiffness: 160 }}
        >
          Have a project in mind?
        </Text3DFlip>
        <p className="mt-5 text-base leading-7 text-[#6e6a63] sm:text-lg">
          Let&apos;s build something clean, fast and useful.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <HomeContactButton />
          <PortfolioInteractiveLink href="/projects">Ver projetos</PortfolioInteractiveLink>
        </div>
      </AnimatedReveal>
    </section>
  );
}

export function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-black">
      <HeroSection />
      <AnimatedReveal>
        <TechStrip />
      </AnimatedReveal>
      <CollageSection />
      <AnimatedReveal>
        <ManifestoSection />
      </AnimatedReveal>
      <AnimatedReveal>
        <SystemsSection />
      </AnimatedReveal>
      <AnimatedReveal>
        <HomeServicesBento />
      </AnimatedReveal>
      <AnimatedReveal>
        <FocusSection />
      </AnimatedReveal>
      <AnimatedReveal>
        <ProjectsSection />
      </AnimatedReveal>
      <AnimatedReveal>
        <QuoteSection />
      </AnimatedReveal>
      <AnimatedReveal>
        <InsightSection />
      </AnimatedReveal>
      <AnimatedReveal>
        <CtaSection />
      </AnimatedReveal>
    </main>
  );
}

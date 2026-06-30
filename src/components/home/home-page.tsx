"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Database,
  FileText,
  Folder,
  GitBranch,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { HomeServicesBento } from "@/components/home/home-services-bento";
import { PortfolioInteractiveLink } from "@/components/ui/portfolio-interactive-button";
import { TextAnimate } from "@/components/ui/text-animate";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { useDictionary, useLocalizedHref } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C",
  "C++",
  "Elixir",
  "SQL",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "Assembly",
  "Docker",
  "Git",
  "GitHub",
  "Vercel",
  "REST APIs"
];

const heroImage = "/hausb/hausb-arquitetura.webp";

const focusCards = [
  {
    title: "Frontend Development",
    text: "Clean responsive interfaces with polished interaction details.",
    image: "/hausb/hausb-lsf.webp"
  },
  {
    title: "Backoffice Systems",
    text: "Practical internal tools for reservations, billing and operations.",
    image: "/benfica/screenshot_1.5x_postspark_2026-06-25_01-10-54.webp"
  },
  {
    title: "API Integrations",
    text: "Reliable connections between forms, emails, databases and deployments.",
    image: "/xvstudio/xv-modal-contacto.webp"
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
    eyebrow: "Casa Benfica Lenzburg",
    image: "/benfica/screenshot_1.5x_postspark_2026-06-25_00-35-51.webp"
  },
  {
    title: "From polished websites to business tools",
    eyebrow: "HAUSB",
    image: "/hausb/hausb-mobile-construcao.webp"
  },
  {
    title: "Useful products for real client needs",
    eyebrow: "XV Studio",
    image: "/xvstudio/xv-laser.webp"
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
  const dictionary = useDictionary();

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <PortfolioInteractiveLink href="/contact">{dictionary.common.contact}</PortfolioInteractiveLink>
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
  const dictionary = useDictionary();
  const shouldReduceMotion = useReducedMotion();
  const heroTitle = dictionary.home.heroTitle;
  const heroTitleWords = heroTitle.split(" ");
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
            <span aria-hidden="true" className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-0">
              {heroTitleWords.map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block whitespace-nowrap">
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
          {dictionary.metadata.homeDescription}
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
          <PortfolioInteractiveLink href="/projects">{dictionary.common.viewProjects}</PortfolioInteractiveLink>
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
        className="relative z-10 mt-12 aspect-[4/3] w-full max-w-[1120px] overflow-hidden rounded-[28px] bg-[#fbfaf7] shadow-[0_30px_90px_rgba(0,0,0,0.18)] ring-1 ring-white/60 md:rounded-[40px]"
      >
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? false : { scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
        >
          <Image
            src={heroImage}
            alt="Portfolio project preview"
            fill
            priority
            quality={95}
            sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw"
            className="object-cover object-center"
          />
        </motion.div>
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
      data-collage-card
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
        "relative min-w-0",
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

function CollageVisuals({ layout }: { layout: "scene" | "grid" }) {
  const shouldReduceMotion = useReducedMotion();
  const isFloatingLayout = useMinViewportWidth(1280);
  const shouldFloat = isFloatingLayout && !shouldReduceMotion;
  const isScene = layout === "scene";

  return (
    <>
      <FloatingVisual
        image="/hausb/hausb-home.webp"
        enableFloat={isScene && isFloatingLayout}
        className={cn(
          isScene ? "absolute left-[3%] top-[4%] h-[24%] w-[24%]" : "min-h-[235px]"
        )}
        floatDuration={6}
      >
        <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/45 bg-white/35 p-4 shadow-lg backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase text-black">
            <span>Deploying</span>
            <span>78%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
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
        enableFloat={isScene && isFloatingLayout}
        className={cn(
          isScene ? "absolute right-[5%] top-[6%] h-[30%] w-[20%]" : "min-h-[290px]"
        )}
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
        data-collage-card
        animate={isScene && shouldFloat ? { y: [0, -8, 0] } : { y: 0 }}
        transition={
          isScene && shouldFloat
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            : { duration: 0 }
        }
        className={cn(
          "relative min-w-0",
          isScene ? "absolute left-[3%] top-[40%] h-[18%] w-[18%]" : "min-h-[180px]"
        )}
      >
        <AnimatedReveal className="flex h-full min-h-[inherit] rounded-[24px] border border-white/50 bg-white/35 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
          <div className="w-full">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-black">API Sync</span>
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-black">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"
                />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff416c] to-[#ff4b2b] text-white shadow-md">
                <GitBranch aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-black">Contact Flow</span>
                <span className="text-xs text-[#6e6a63]">Connected</span>
              </span>
            </div>
          </div>
        </AnimatedReveal>
      </motion.div>

      <FloatingVisual
        image="/xvstudio/xv-contacto.webp"
        enableFloat={isScene && isFloatingLayout}
        className={cn(
          isScene ? "absolute right-[2%] top-[42%] h-[22%] w-[22%]" : "min-h-[220px]"
        )}
        floatDelay={2}
        floatDuration={7}
      >
        <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/55 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-xl">
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.85)]"
          />
          <span className="truncate text-[10px] font-bold uppercase text-black">Database Layer</span>
        </div>
      </FloatingVisual>

      <FloatingVisual
        image="/hausb/hausb-mobile-construcao.webp"
        enableFloat={isScene && isFloatingLayout}
        className={cn(
          isScene ? "absolute bottom-[4%] left-[8%] h-[24%] w-[27%]" : "min-h-[245px]"
        )}
        floatDelay={0.5}
      >
        <div className="absolute bottom-5 left-5 flex max-w-[calc(100%-2.5rem)] items-center gap-2 rounded-full border border-white/55 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-xl">
          <MonitorSmartphone aria-hidden="true" className="h-4 w-4 shrink-0 text-black" />
          <span className="truncate text-[10px] font-bold uppercase text-black">Responsive UI</span>
        </div>
      </FloatingVisual>

      <FloatingVisual
        image="/hausb/hausb-portfolio.webp"
        enableFloat={isScene && isFloatingLayout}
        className={cn(
          isScene ? "absolute bottom-[3%] right-[9%] h-[22%] w-[25%]" : "min-h-[230px]"
        )}
        floatDelay={1.5}
        floatDuration={5.5}
      >
        <div className="absolute bottom-5 left-5 right-5 rounded-[18px] border border-white/45 bg-white/35 p-4 backdrop-blur-xl">
          <span className="text-xs font-bold text-black">Client Portal</span>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-black/70">Ready for handoff and iteration.</p>
        </div>
      </FloatingVisual>
    </>
  );
}

function CollageSection() {
  const dictionary = useDictionary();
  const titleWords = dictionary.home.collageTitle.split(" ");
  const firstLine = titleWords.slice(0, -1).join(" ");
  const secondLine = titleWords.at(-1) ?? "";

  return (
    <section className="relative z-10 isolate w-full overflow-hidden bg-[#fbfaf7] px-5 py-20 sm:px-8 md:py-24 xl:px-10 xl:py-28">
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#fbfaf7]" />

      <div className="relative z-10 mx-auto hidden w-full max-w-[1536px] xl:block">
        <div data-collage-scene className="@container/collage relative aspect-[1536/980] w-full">
          <AnimatedReveal className="pointer-events-none absolute left-[22%] top-[29%] z-10 flex w-[56%] items-center justify-center">
            <h2 data-collage-title className="metallic-title pb-[0.08em] text-center text-[clamp(4.5rem,7.7cqw,7.375rem)] font-bold leading-[1.02]">
              {firstLine}
              <br />
              {secondLine}
            </h2>
          </AnimatedReveal>

          <div className="absolute inset-0 z-20">
            <CollageVisuals layout="scene" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[900px] xl:hidden">
        <AnimatedReveal className="flex items-center justify-center">
          <h2 data-collage-title className="metallic-title pb-[0.08em] text-center text-[clamp(3rem,11vw,6.5rem)] font-bold leading-[1.02]">
            {firstLine}
            <br />
            {secondLine}
          </h2>
        </AnimatedReveal>

        <div className="mt-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          <CollageVisuals layout="grid" />
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  const dictionary = useDictionary();

  return (
    <SectionShell className="relative flex items-center justify-center py-28 text-center md:py-44">
      <div className="pointer-events-none absolute right-[6%] top-8 h-64 w-64 opacity-20 md:h-96 md:w-96">
        <motion.span 
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-[#4f4f4f]/45" 
        />
        <span className="absolute inset-x-1/4 inset-y-0 rounded-full border border-[#4f4f4f]/35" />
        <span className="absolute inset-x-0 inset-y-1/4 rounded-full border border-[#4f4f4f]/35" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-[#4f4f4f]/25" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-[#4f4f4f]/25" />
      </div>
      <AnimatedReveal>
        <p className="relative z-10 mx-auto max-w-5xl text-balance text-2xl font-light leading-tight text-black sm:text-3xl md:text-5xl">
          {dictionary.home.manifesto}
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
                { icon: Folder, label: "Interface Design", color: "text-[#ff4b2b]" },
                { icon: Database, label: "Database Layer", color: "text-[#8a2387]" },
                { icon: FileText, label: "Backoffice Systems", color: "text-[#e94057]" },
                { icon: ShieldCheck, label: "Built-in Security", color: "text-[#f27121]" }
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
                The structure behind
                <br />
                software that works.
              </>
            }
            items={[
              {
                title: "Interface Design",
                text: "Clean, responsive interfaces shaped around the way people actually use the product."
              },
              {
                title: "Backoffice Systems",
                text: "Internal tools for reservations, billing, content and every day-to-day operations."
              },
              {
                title: "Systems & Integrations",
                text: "Databases, APIs, email flows and security layers working quietly behind the scenes."
              }
            ]}
          />
        </AnimatedReveal>
      </div>
    </SectionShell>
  );
}

function FocusSection() {
  const dictionary = useDictionary();
  const titleText = dictionary.home.focusTitle;

  return (
    <SectionShell className="flex flex-col items-center py-20 md:py-28">
      <AnimatedReveal className="text-center">
        {/* Usamos flex e flex-wrap para garantir que as letras fluem corretamente em mobile */}
        <h2 aria-label={titleText} className="flex flex-wrap justify-center text-3xl font-bold text-black md:text-4xl">
          {titleText.split("").map((char, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -1.5, 0] 
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.05, // O delay matemático cria o efeito de onda
                ease: "easeInOut"
              }}
              // Se for um espaço, aplicamos uma largura fixa, caso contrário, mantemos inline-block para o transform funcionar
              className={char === " " ? "w-[0.25em]" : "inline-block"}
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </AnimatedReveal>

      <div className="mt-12 grid w-full max-w-[1240px] gap-5 md:grid-cols-2 lg:gap-6">
        {focusCards.map((card, index) => (
          <AnimatedReveal
            key={card.title}
            delay={index * 0.04}
            className="group relative flex aspect-[4/3] overflow-hidden rounded-[28px] border border-black/10 shadow-sm"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              quality={95}
              sizes="(min-width: 1280px) 610px, (min-width: 768px) 46vw, 92vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/22 to-black/5" />
            <div className="relative z-10 mt-auto max-w-md p-6 text-white sm:p-7">
              <h3 className="text-lg font-bold sm:text-xl">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/78">{card.text}</p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </SectionShell>
  );
}

function QuoteSection() {
  const dictionary = useDictionary();
  const quote = dictionary.home.quote;
  const quoteLines = [...dictionary.home.quoteLines];
  const quoteRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isQuoteInView = useInView(quoteRef, {
    amount: 0.45,
    once: true
  });
  const [typedQuote, setTypedQuote] = useState("");
  const [isQuoteComplete, setIsQuoteComplete] = useState(false);
  const visibleQuote = shouldReduceMotion ? quote : typedQuote;
  const visibleQuoteLength = visibleQuote.length;
  const isSignatureVisible = Boolean(shouldReduceMotion || isQuoteComplete);

  useEffect(() => {
    if (!isQuoteInView || shouldReduceMotion) {
      return;
    }

    let currentIndex = 0;
    const interval = window.setInterval(() => {
      currentIndex += 1;
      setTypedQuote(quote.slice(0, currentIndex));

      if (currentIndex >= quote.length) {
        window.clearInterval(interval);
        setIsQuoteComplete(true);
      }
    }, 42);

    return () => window.clearInterval(interval);
  }, [isQuoteInView, quote, shouldReduceMotion]);

  return (
    <SectionShell className="flex flex-col items-center py-24 text-center md:py-36">
      <div ref={quoteRef}>
        <blockquote
          aria-label={`“${quote}”`}
          className="mx-auto min-h-[7.5rem] max-w-5xl text-3xl font-normal leading-tight text-black sm:min-h-[6rem] md:min-h-[7.25rem] md:text-5xl"
        >
          {quoteLines.map((line, index) => {
            const lineStart = quoteLines
              .slice(0, index)
              .reduce((length, currentLine) => length + currentLine.length + 1, 0);
            const typedLineLength = Math.min(
              Math.max(visibleQuoteLength - lineStart, 0),
              line.length
            );
            const isActiveLine =
              !isSignatureVisible &&
              visibleQuoteLength >= lineStart &&
              visibleQuoteLength <= lineStart + line.length;

            return (
              <span key={line} aria-hidden="true" className="block">
                {index === 0 ? "“" : null}
                {line.slice(0, typedLineLength)}
                {isActiveLine ? (
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    className="ml-1 inline-block text-black"
                  >
                    |
                  </motion.span>
                ) : null}
                {isSignatureVisible && index === quoteLines.length - 1 ? "”" : null}
              </span>
            );
          })}
        </blockquote>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={isSignatureVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 12, filter: "blur(8px)" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 inline-flex items-center gap-4"
        >
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
        </motion.div>
      </div>
    </SectionShell>
  );
}

function InsightSection() {
  const dictionary = useDictionary();
  const localizeHref = useLocalizedHref();

  return (
    <SectionShell className="py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between gap-6">
        <AnimatedReveal>
          <p className="mb-3 text-[11px] font-bold uppercase text-[#77736b]">{dictionary.home.latestFocus}</p>
          <h2 className="text-3xl font-bold text-black md:text-4xl">{dictionary.home.builtAndShipped}</h2>
        </AnimatedReveal>
        <Link
          href={localizeHref("/projects")}
          className="hidden border-b border-black pb-1 text-sm font-bold text-black transition hover:text-[#ff4b2b] sm:inline-flex"
        >
          {dictionary.common.work}
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {insightCards.map((card, index) => (
          <AnimatedReveal key={card.title} delay={index * 0.04}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link href={localizeHref("/projects")} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
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
  const dictionary = useDictionary();

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
          {dictionary.home.ctaTitle}
        </Text3DFlip>
        <p className="mt-5 text-base leading-7 text-[#6e6a63] sm:text-lg">
          {dictionary.home.ctaText}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <HomeContactButton />
          <PortfolioInteractiveLink href="/projects">{dictionary.common.viewProjects}</PortfolioInteractiveLink>
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

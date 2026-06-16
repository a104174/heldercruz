"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  FileText,
  Folder,
  GitBranch,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigationSwitcher } from "@/components/home/home-navigation-switcher";
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
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop"
  },
  {
    title: "Backoffice Systems",
    text: "Practical internal tools for reservations, billing and operations.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop"
  },
  {
    title: "API Integrations",
    text: "Reliable connections between forms, emails, databases and deployments.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop"
  },
  {
    title: "Product Delivery",
    text: "Built with attention to detail, performance and usability.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1400&auto=format&fit=crop"
  }
];

const insightCards = [
  {
    title: "Engineering clean interfaces",
    eyebrow: "Frontend",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "From polished websites to business tools",
    eyebrow: "Systems",
    image: "https://images.unsplash.com/photo-1646388286080-62887d1b34ab?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Useful products for real client workflows",
    eyebrow: "Delivery",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  }
];

function imageStyle(url: string, overlay = "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))") {
  return {
    backgroundImage: `${overlay}, url("${url}")`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  } satisfies CSSProperties;
}

function HomeButtonLink({
  href,
  children,
  dark = false
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
          dark
            ? "bg-white text-black hover:bg-white/90 focus-visible:outline-white"
            : "bg-black text-white hover:bg-black/85 focus-visible:outline-black"
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function HomeContactButton({ dark = false }: { dark?: boolean }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <ContactTrigger
        variant="ghost"
        size="lg"
        className={cn(
          "!h-11 !rounded-full !px-6 !text-sm !font-bold transition",
          dark
            ? "!border !border-white/20 !bg-transparent !text-white hover:!bg-white hover:!text-black"
            : "!border !border-black/15 !bg-white !text-black hover:!border-black hover:!bg-white"
        )}
      >
        <Mail aria-hidden="true" className="h-4 w-4" />
        Contact Me
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

function HeroSection() {
  return (
    <SectionShell className="flex flex-col items-center pb-28 pt-40 text-center sm:pt-44 md:pb-40 md:pt-56">
      <AnimatedReveal className="flex max-w-5xl flex-col items-center">
        <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.02] text-black sm:text-6xl md:text-7xl lg:text-[82px]">
          Software Engineer crafting digital products.
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-7 text-[#6e6a63] sm:text-lg sm:leading-8">
          I build clean, scalable and user-focused web applications, combining frontend
          engineering, backend systems and polished user experiences.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <HomeButtonLink href="/projects">
            View Projects
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </motion.div>
          </HomeButtonLink>
          <HomeContactButton />
        </div>
      </AnimatedReveal>

      <AnimatedReveal
        delay={0.08}
        className="relative z-10 mt-12 h-[360px] w-full max-w-[1450px] overflow-hidden rounded-[28px] border border-black/10 bg-[#151515] shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:h-[520px] md:rounded-[40px] lg:h-[760px]"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={imageStyle(heroImage, "linear-gradient(transparent, transparent)")}
        />
      </AnimatedReveal>
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
  floatDelay = 0,
  floatDuration = 5
}: {
  className: string;
  image?: string;
  children: ReactNode;
  floatDelay?: number;
  floatDuration?: number;
}) {
  return (
    <AnimatedReveal
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/45 bg-white/20 shadow-[0_18px_55px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:absolute",
        className
      )}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ 
          duration: floatDuration, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: floatDelay
        }}
        className="h-full w-full"
      >
        {image ? <div className="absolute inset-0" style={imageStyle(image)} /> : null}
        <div className="absolute inset-0 bg-white/5" />
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </AnimatedReveal>
  );
}

function CollageSection() {
  return (
    <SectionShell className="relative overflow-hidden py-24 md:min-h-[1120px] md:py-32">
      <AnimatedReveal className="pointer-events-none relative z-0 flex items-center justify-center md:absolute md:inset-0">
        <h2 className="text-center text-[52px] font-bold leading-[0.94] text-black sm:text-[76px] lg:text-[118px]">
          Engineering
          <br />
          Intelligence
        </h2>
      </AnimatedReveal>

      <div className="relative z-10 mt-12 grid gap-5 md:absolute md:inset-0 md:mt-0 md:block">
        <FloatingVisual
          image="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"
          className="min-h-[235px] md:left-[8%] md:top-[8%] md:h-[250px] md:w-[340px]"
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
          image="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900&auto=format&fit=crop"
          className="min-h-[290px] md:right-[10%] md:top-[12%] md:h-[310px] md:w-[280px]"
          floatDelay={1}
          floatDuration={5}
        >
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/45 shadow-sm backdrop-blur-xl">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <Sparkles aria-hidden="true" className="h-4 w-4 text-black" />
            </motion.div>
          </div>
        </FloatingVisual>

        <AnimatedReveal className="relative rounded-[24px] border border-white/50 bg-white/35 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.1)] backdrop-blur-2xl md:absolute md:left-[4%] md:top-[46%] md:w-[280px]">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
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
          </motion.div>
        </AnimatedReveal>

        <FloatingVisual
          image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
          className="min-h-[220px] md:right-[5%] md:top-[48%] md:h-[220px] md:w-[330px]"
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
          image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop"
          className="min-h-[245px] md:left-[14%] md:top-[70%] md:h-[250px] md:w-[380px]"
          floatDelay={0.5}
        >
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/55 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-xl">
            <MonitorSmartphone aria-hidden="true" className="h-4 w-4 text-black" />
            <span className="text-[10px] font-bold uppercase text-black">Responsive UI</span>
          </div>
        </FloatingVisual>

        <FloatingVisual
          image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop"
          className="min-h-[230px] md:right-[15%] md:top-[76%] md:h-[230px] md:w-[360px]"
          floatDelay={1.5}
          floatDuration={5.5}
        >
          <div className="absolute bottom-5 left-5 right-5 rounded-[18px] border border-white/45 bg-white/35 p-4 backdrop-blur-xl">
            <span className="text-xs font-bold text-black">Client Portal</span>
            <p className="mt-1 text-xs leading-5 text-black/70">Ready for handoff and iteration.</p>
          </div>
        </FloatingVisual>
      </div>
    </SectionShell>
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
  items,
  activeSize = "h-1/3"
}: {
  title: ReactNode;
  items: Array<{ title: string; text: string }>;
  activeSize?: string;
}) {
  return (
    <div className="flex h-full max-w-xl flex-col justify-center">
      <h2 className="mb-10 text-3xl font-bold leading-tight text-black md:text-4xl">{title}</h2>
      <div className="relative space-y-9 border-l-[3px] border-[#d9d7d0] pl-7">
        <motion.span
          initial={{ height: 0 }}
          whileInView={{ height: activeSize === "h-1/3" ? "33%" : "25%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -left-[3px] top-0 w-[3px] bg-gradient-to-b from-[#ff416c] to-[#ff4b2b]"
        />
        {items.map((item, index) => (
          <motion.div 
            key={item.title}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(index > 0 && "opacity-60 transition hover:opacity-100")}
          >
            <h3 className="text-xl font-bold text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#706c64]">{item.text}</p>
          </motion.div>
        ))}
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

function StudioSection() {
  return (
    <SectionShell className="py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <AnimatedReveal className="order-2 flex items-center lg:order-1">
          <FeatureRail
            title={
              <>
                From polished websites
                <br />
                to practical tools.
              </>
            }
            activeSize="h-1/4"
            items={[
              {
                title: "Reliable Databases",
                text: "Schemas and queries shaped around the business workflow, not just the screen."
              },
              {
                title: "Responsive Interfaces",
                text: "Layouts tuned for desktop, tablet and mobile use."
              },
              {
                title: "Performance & Usability",
                text: "Small details that make products fast, readable and pleasant to use."
              },
              {
                title: "Production Delivery",
                text: "Deployment-ready applications with clean structure and maintainable code."
              }
            ]}
          />
        </AnimatedReveal>

        <AnimatedReveal
          delay={0.08}
          className="order-1 flex min-h-[520px] items-center justify-center overflow-hidden rounded-[36px] border border-[#d9d7d0]/70 bg-gradient-to-tr from-[#e0eafc] to-[#cfdef3] p-6 shadow-inner lg:order-2 lg:min-h-[650px]"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-lg rounded-[24px] border border-white/60 bg-white/80 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black text-[10px] font-bold">
                HC
              </span>
              <span className="text-xs font-bold uppercase text-[#706c64]">Product build</span>
            </div>
            <div className="rounded-[14px] border border-white/70 bg-white/65 p-5 shadow-sm">
              <p className="text-sm leading-7 text-black">
                Build a step-based contact flow, persist requests, notify by email and keep the UI
                calm on every device.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <motion.span 
                animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white shadow-md"
              >
                <Zap aria-hidden="true" className="h-4 w-4" />
              </motion.span>
            </div>
          </motion.div>
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
          href="/projects"
          className="hidden border-b border-black pb-1 text-sm font-bold text-black transition hover:text-[#ff4b2b] sm:inline-flex"
        >
          View Work
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {insightCards.map((card, index) => (
          <AnimatedReveal key={card.title} delay={index * 0.04}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link href="/projects" className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
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
    <section className="px-5 py-24 sm:px-8 md:py-36 lg:px-10">
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
          className="max-w-4xl text-balance text-4xl font-bold leading-tight text-black md:text-6xl lg:text-7xl"
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
          <HomeButtonLink href="/projects">
            View Projects
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </motion.div>
          </HomeButtonLink>
        </div>
      </AnimatedReveal>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HomeNavigationSwitcher />
      <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-black">
        <HeroSection />
        <TechStrip />
        <CollageSection />
        <ManifestoSection />
        <SystemsSection />
        <StudioSection />
        <FocusSection />
        <ProjectsSection />
        <QuoteSection />
        <InsightSection />
        <CtaSection />
      </main>
      <HomeFooter />
    </>
  );
}

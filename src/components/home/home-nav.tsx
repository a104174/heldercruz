"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" }
];

export function HomeNav() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="pointer-events-none fixed left-0 right-0 top-5 z-50 flex w-full items-center justify-center px-4 sm:top-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="pointer-events-auto flex h-14 w-full max-w-[700px] items-center justify-between rounded-full border border-white/10 bg-black/95 px-2 py-2 text-[#fbfaf7] shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-4 pl-1 sm:gap-8">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#fbfaf7]/80 bg-[#fbfaf7] p-1.5"
          >
            <Image
              src="/hc.png"
              alt="Hélder Cruz logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-4 sm:flex md:gap-6" aria-label="Home navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-1 py-2 text-[11px] font-semibold text-[#fbfaf7]/75 transition hover:text-[#fbfaf7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {link.label}
              </Link>
            ))}
            <ContactTrigger
              variant="ghost"
              size="sm"
              className="!h-auto !rounded-full !bg-transparent !px-1 !py-2 !text-[11px] !font-semibold !text-[#fbfaf7]/75 hover:!bg-transparent hover:!text-[#fbfaf7]"
            >
              Contact
            </ContactTrigger>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={siteConfig.links.resume}
            title="Resume PDF coming soon"
            className="hidden h-8 items-center rounded-full border border-[#fbfaf7]/20 px-4 text-[10px] font-bold uppercase text-[#fbfaf7]/70 transition hover:border-[#fbfaf7]/45 hover:text-[#fbfaf7] sm:inline-flex"
          >
            Resume
          </Link>
          <ContactTrigger
            variant="ghost"
            size="sm"
            className="!h-8 !rounded-full !border !border-[#fbfaf7]/30 !bg-transparent !px-3 !text-[10px] !font-bold !uppercase !text-[#fbfaf7] hover:!bg-[#fbfaf7] hover:!text-black sm:!px-4"
          >
            <span className="hidden sm:inline">Contact Me</span>
            <span className="sm:hidden">Contact</span>
            <ArrowRight aria-hidden="true" className="h-3 w-3" />
          </ContactTrigger>
        </div>
      </div>
    </motion.header>
  );
}

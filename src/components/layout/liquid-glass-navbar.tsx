"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavbarInteractiveLink } from "@/components/ui/portfolio-interactive-button";
import { siteConfig } from "@/config/site";
import { stripLocaleFromPathname, type Locale } from "@/i18n/locales";
import { useDictionary, useLanguageSwitcherHref, useLocale, useLocalizedHref } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "work", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "experience", href: "/experience" }
] as const;

const glassVariables = {
  "--x": "50%",
  "--y": "50%"
} as CSSProperties;

function isRouteActive(pathname: string, href: string) {
  const normalizedPathname = stripLocaleFromPathname(pathname);

  if (href === "/projects") {
    return (
      normalizedPathname === "/projects" ||
      normalizedPathname === "/work" ||
      normalizedPathname.startsWith("/projects/")
    );
  }

  return normalizedPathname === href;
}

function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
      <filter id="liquid-glass-distortion">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.003 0.005"
          numOctaves="2"
          seed="5"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="16"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

function NavHoverText({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("relative z-10 block h-[1em] overflow-hidden leading-none", className)}>
      <span className="block transition-transform duration-300 ease-out group-hover/nav-item:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover/nav-item:-translate-y-full">
        {children}
      </span>
    </span>
  );
}

export function LiquidGlassNavbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const dictionary = useDictionary();
  const localizeHref = useLocalizedHref();
  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const alternateLocale: Locale = locale === "en" ? "pt" : "en";
  const alternateHref = useLanguageSwitcherHref(alternateLocale);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--x", "50%");
    event.currentTarget.style.setProperty("--y", "50%");
  };

  const navItemClassName =
    "group/nav-item relative isolate inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-3.5 text-[13px] font-semibold text-black/64 transition duration-300 ease-out hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

  return (
    <>
      <motion.header
      className="pointer-events-none fixed left-0 right-0 top-5 z-50 flex w-full justify-center px-3 sm:top-6 sm:px-5"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
      }
      >
        <LiquidGlassFilter />
        <div className="w-[calc(100vw-1rem)] max-w-[780px] md:w-fit md:max-w-[calc(100vw-2rem)]">
          <motion.div
          className="liquid-glass-surface group/nav pointer-events-auto relative overflow-hidden rounded-full p-1.5 text-black"
          style={glassVariables}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="liquid-glass-content flex h-[48px] items-center justify-between gap-2 sm:h-[52px] md:justify-center md:gap-8 lg:gap-10">
            <Link
              href={localizeHref("/")}
              aria-label={dictionary.nav.goHome}
              className="flex min-w-0 items-center rounded-full px-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/hc.png"
                alt="Hélder Cruz logo"
                width={36}
                height={36}
                loading="eager"
                className="h-9 w-auto shrink-0 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.08)]"
                priority
              />
            </Link>

            <nav
              className="hidden items-center gap-1 rounded-full md:flex"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = isRouteActive(pathname, link.href);
                const label = dictionary.common[link.key];

                return (
                  <Link
                    key={link.href}
                    href={localizeHref(link.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(navItemClassName, active && "text-black")}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white/28 opacity-0 transition duration-300 ease-out group-hover/nav-item:opacity-100"
                    />
                    {active && (
                      <motion.span
                        layoutId="liquid-nav-active"
                        className="liquid-glass-active absolute inset-0 rounded-full"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                      />
                    )}
                    <NavHoverText>{label}</NavHoverText>
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
              <Link
                href={siteConfig.links.resume}
                title={dictionary.nav.openResume}
                aria-label={dictionary.nav.openResume}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-button group/nav-item hidden h-10 items-center gap-2 overflow-hidden rounded-full px-4 text-[10px] font-bold uppercase text-black/66 transition duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:inline-flex"
                onClick={() => setMenuOpen(false)}
              >
                <FileText
                  aria-hidden="true"
                  className="relative z-10 h-3.5 w-3.5 stroke-[1.8] transition duration-300 ease-out group-hover/nav-item:-translate-y-0.5 group-hover/nav-item:scale-105"
                />
                <NavHoverText>{dictionary.common.resume}</NavHoverText>
              </Link>
              <NavbarInteractiveLink
                href="/contact"
                aria-label={dictionary.nav.openContact}
                className="shadow-none"
                onClick={() => setMenuOpen(false)}
              >
                {dictionary.common.contact}
              </NavbarInteractiveLink>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="liquid-glass-button !h-10 !w-10 !rounded-full !px-0 !text-black hover:!bg-white/28 md:!hidden"
                onClick={() => setMenuOpen(true)}
                aria-label={dictionary.nav.openMenu}
                aria-controls="liquid-glass-mobile-menu"
                aria-expanded={menuOpen}
              >
                <Menu aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="liquid-glass-mobile-menu"
              className="pointer-events-auto fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#fbfaf7] px-6 py-6 text-black md:hidden"
              initial={shouldReduceMotion ? false : { opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <div className="flex items-center justify-between">
                <Link
                  href={localizeHref("/")}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-bold tracking-tighter text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  Hélder
                </Link>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                  aria-label={dictionary.nav.closeMenu}
                >
                  <X aria-hidden="true" className="h-5 w-5 text-black" />
                </button>
              </div>

              <nav className="mt-20 flex flex-col gap-6" aria-label={dictionary.nav.mobileNavigation}>
                {navLinks.map((link, index) => {
                  const label = dictionary.common[link.key];

                  return (
                    <motion.div
                      key={link.href}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.1 + index * 0.05,
                        duration: shouldReduceMotion ? 0 : 0.4
                      }}
                    >
                      <Link
                        href={localizeHref(link.href)}
                        aria-current={isRouteActive(pathname, link.href) ? "page" : undefined}
                        className="text-4xl font-semibold tracking-tight text-black transition-colors hover:text-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0 : 0.4 }}
                className="mt-auto flex flex-col gap-6 pb-8"
              >
                <div className="flex flex-col gap-3">
                  <Link
                    href={siteConfig.links.resume}
                    title={dictionary.nav.openResume}
                    aria-label={dictionary.nav.openResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border-b border-black/10 pb-4 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    onClick={() => setMenuOpen(false)}
                  >
                    {dictionary.common.resume}
                    <span className="text-black/40">PDF</span>
                  </Link>
                  <Link
                    href={alternateHref}
                    className="flex items-center justify-between border-b border-black/10 pb-4 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    onClick={() => setMenuOpen(false)}
                    aria-label={`${dictionary.nav.switchLanguage}: ${alternateLocale.toUpperCase()}`}
                  >
                    {dictionary.nav.switchLanguage}
                    <span className="font-bold uppercase">{alternateLocale.toUpperCase()}</span>
                  </Link>
                </div>

                <Link
                  href={localizeHref("/contact")}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-black text-[15px] font-semibold text-white transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  {dictionary.common.contact}
                </Link>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}

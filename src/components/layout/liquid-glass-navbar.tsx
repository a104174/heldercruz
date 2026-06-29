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
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" }
];

const glassVariables = {
  "--x": "50%",
  "--y": "50%"
} as CSSProperties;

function isRouteActive(pathname: string, href: string) {
  if (href === "/projects") {
    return pathname === "/projects" || pathname === "/work" || pathname.startsWith("/projects/");
  }

  return pathname === href;
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
  const shouldReduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
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

  const mobileItemClassName =
    "liquid-glass-menu-item relative flex h-11 w-full items-center justify-between rounded-full px-4 text-sm font-semibold text-black/70 transition duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

  return (
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
              href="/"
              aria-label="Go to homepage"
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

                return (
                  <Link
                    key={link.href}
                    href={link.href}
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
                    <NavHoverText>{link.label}</NavHoverText>
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
              <Link
                href={siteConfig.links.resume}
                title="Open Hélder Cruz resume"
                aria-label="Open Hélder Cruz resume"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-button group/nav-item hidden h-10 items-center gap-2 overflow-hidden rounded-full px-4 text-[10px] font-bold uppercase text-black/66 transition duration-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:inline-flex"
                onClick={() => setMenuOpen(false)}
              >
                <FileText
                  aria-hidden="true"
                  className="relative z-10 h-3.5 w-3.5 stroke-[1.8] transition duration-300 ease-out group-hover/nav-item:-translate-y-0.5 group-hover/nav-item:scale-105"
                />
                <NavHoverText>Resume</NavHoverText>
              </Link>
              <NavbarInteractiveLink
                href="/contact"
                aria-label="Open contact page"
                className="shadow-none"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavbarInteractiveLink>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="liquid-glass-button !h-10 !w-10 !rounded-full !px-0 !text-black hover:!bg-white/28 md:!hidden"
                onClick={() => setMenuOpen((current) => !current)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-controls="liquid-glass-mobile-menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Menu aria-hidden="true" className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="liquid-glass-mobile-menu"
              className="liquid-glass-surface group/nav pointer-events-auto relative mt-2 overflow-hidden rounded-[28px] p-2 text-black md:hidden"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <nav className="liquid-glass-content flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const active = isRouteActive(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(mobileItemClassName, active && "liquid-glass-menu-item-active")}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      {active && (
                        <motion.span
                          layoutId="liquid-mobile-active-dot"
                          className="h-1.5 w-1.5 rounded-full bg-black"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 34 }
                          }
                        />
                      )}
                    </Link>
                  );
                })}
                <Link
                  href={siteConfig.links.resume}
                  title="Open Hélder Cruz resume"
                  aria-label="Open Hélder Cruz resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileItemClassName}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Resume</span>
                  <FileText aria-hidden="true" className="h-4 w-4 stroke-[1.8]" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

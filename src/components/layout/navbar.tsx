"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" }
];

const aboutNavLinks = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Vision", href: "/about#vision" }
];

const experienceNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" }
];

const caseStudyNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" }
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAboutPage = pathname === "/about";
  const isExperiencePage = pathname === "/experience";
  const isCaseStudyPage = pathname.startsWith("/projects/");
  const links = isAboutPage
    ? aboutNavLinks
    : isExperiencePage
      ? experienceNavLinks
      : isCaseStudyPage
        ? caseStudyNavLinks
        : navLinks;

  if (pathname === "/") {
    return null;
  }

  const isActive = (href: string) =>
    pathname === href || (href === "/work" && pathname.startsWith("/projects"));

  const linkClassName = (href: string) =>
    cn(
      "rounded-full px-1 py-2 text-[10px] font-bold tracking-normal transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
      isAboutPage
        ? "text-black/38 hover:text-black focus-visible:outline-black"
        : "uppercase text-white/68 hover:text-white focus-visible:outline-white",
      isActive(href) &&
        (isAboutPage
          ? "text-black underline decoration-black underline-offset-4"
          : "text-white underline decoration-white underline-offset-4")
    );

  return (
    <header className="sticky top-4 z-40 flex w-full justify-center px-4 pt-4">
      <div
        className={cn(
          "w-full rounded-full p-2 shadow-[0_18px_55px_rgba(0,0,0,0.13)] backdrop-blur-xl",
          isAboutPage
            ? "max-w-[1120px] border border-black/8 bg-white/92 text-black"
            : isExperiencePage || isCaseStudyPage
              ? "max-w-[650px] border border-white/10 bg-black/95 text-white"
              : "max-w-[690px] border border-white/10 bg-black/95 text-white"
        )}
      >
        <div className="flex h-10 items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="Go to homepage"
            className={cn(
              "flex min-w-0 items-center gap-3 rounded-full pl-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
              isAboutPage ? "focus-visible:outline-black" : "focus-visible:outline-white"
            )}
            onClick={() => setMenuOpen(false)}
          >
            {isAboutPage ? (
              <span className="pl-4 text-2xl font-medium leading-none tracking-normal text-black">HC</span>
            ) : isExperiencePage || isCaseStudyPage ? (
              <span className="pl-3 text-2xl font-semibold leading-none tracking-normal text-white">HC</span>
            ) : (
              <>
                <Image
                  src="/hc.png"
                  alt="Hélder Cruz logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-full bg-white object-contain p-1"
                  priority
                />
                <span className="truncate text-sm font-bold tracking-normal text-white">
                  Hélder Cruz
                </span>
              </>
            )}
          </Link>

          <nav
            className={cn(
              "hidden items-center md:flex",
              isAboutPage ? "gap-7" : isExperiencePage || isCaseStudyPage ? "gap-6" : "gap-5"
            )}
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClassName(link.href)}>
                {link.label}
              </Link>
            ))}
            <ContactTrigger
              variant="ghost"
              size="sm"
              className={cn(
                "!h-auto !rounded-full !bg-transparent !px-1 !py-2 !text-[10px] !font-bold hover:!bg-transparent",
                isAboutPage
                  ? "!text-black/38 hover:!text-black"
                  : "!uppercase !text-white/68 hover:!text-white"
              )}
            >
              {isExperiencePage ? "Contact" : "Contact"}
            </ContactTrigger>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ContactTrigger
              variant="ghost"
              size="sm"
              className={cn(
                "hidden !h-8 !rounded-full !px-4 !text-[10px] !font-bold !uppercase md:!inline-flex",
                isAboutPage
                  ? "!bg-black !text-white hover:!bg-black/82"
                  : "!bg-white !text-black hover:!bg-white/90"
              )}
            >
              {isAboutPage ? "Hire Me" : isExperiencePage || isCaseStudyPage ? "Let's Talk" : "Connect"}
              <ArrowRight aria-hidden="true" className="h-3 w-3" />
            </ContactTrigger>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "!h-8 !w-8 !rounded-full !border !bg-transparent !px-0 md:!hidden",
                isAboutPage
                  ? "!border-black/10 !text-black hover:!bg-black/5"
                  : "!border-white/15 !text-white hover:!bg-white/10"
              )}
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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

        {menuOpen && (
          <div className="px-2 pb-2 pt-3 md:hidden">
            <nav
              className={cn(
                "flex flex-col gap-1 border-t pt-3",
                isAboutPage ? "border-black/10" : "border-white/10"
              )}
              aria-label="Mobile navigation"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(linkClassName(link.href), "px-3 py-3 text-left")}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <ContactTrigger
                variant="ghost"
                className={cn(
                  "!justify-start !rounded-full !bg-transparent !px-3 !py-3 !text-[10px] !font-bold",
                  isAboutPage
                    ? "!text-black/45 hover:!bg-black/5 hover:!text-black"
                    : "!uppercase !text-white/68 hover:!bg-white/10 hover:!text-white"
                )}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </ContactTrigger>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

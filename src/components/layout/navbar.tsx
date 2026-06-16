"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" }
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClassName = (href: string) =>
    cn(
      "rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
      pathname === href && "bg-soft text-ink"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
            HC
          </span>
          <span className="text-sm font-semibold tracking-normal text-ink">Hélder Cruz</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClassName(link.href)}>
              {link.label}
            </Link>
          ))}
          <ContactTrigger variant="ghost" size="sm">
            Contact
          </ContactTrigger>
          <button
            type="button"
            disabled
            title="Resume PDF coming soon"
            className="rounded-full px-3 py-2 text-sm font-medium text-neutral-400"
          >
            Resume
          </button>
        </nav>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-10 w-10 px-0 md:hidden"
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

      {menuOpen && (
        <div className="border-t border-line bg-white px-5 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(linkClassName(link.href), "px-4 py-3")}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <ContactTrigger
              variant="ghost"
              className="justify-start px-4 py-3"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </ContactTrigger>
            <button
              type="button"
              disabled
              title="Resume PDF coming soon"
              className="rounded-full px-4 py-3 text-left text-sm font-medium text-neutral-400"
            >
              Resume
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

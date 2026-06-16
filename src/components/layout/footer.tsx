"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Email", href: siteConfig.links.email }
];

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Link
            href="/"
            aria-label="Go to homepage"
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white p-2"
          >
            <Image
              src="/hc.png"
              alt="Hélder Cruz logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Portfolio</p>
          <p className="mt-4 max-w-md text-2xl font-semibold leading-tight">
            Software Engineer building clean, fast and useful digital products.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 md:max-w-md md:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

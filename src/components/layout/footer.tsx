"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const footerGroups = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" }
    ]
  },
  {
    title: "Projects",
    links: [
      { label: "Casa Benfica", href: "/projects/casa-benfica-lenzburg" },
      { label: "XV Studio", href: "/projects/xv-studio" },
      { label: "HAUSB", href: "/projects/hausb" }
    ]
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: siteConfig.links.linkedin },
      { label: "GitHub", href: siteConfig.links.github },
      { label: "Twitter", href: "#" }
    ]
  }
];

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  if (pathname === "/about") {
    return (
      <footer className="bg-black px-5 py-14 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              aria-label="Go to homepage"
              className="inline-flex text-2xl font-medium tracking-normal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              HC
            </Link>
            <p className="mt-8 text-[10px] leading-5 text-white/45">
              © 2024 Hélder Cruz. All rights reserved. Crafted for clarity.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium text-white/45">
            <Link href={siteConfig.links.linkedin} className="transition hover:text-white">
              LinkedIn
            </Link>
            <Link href={siteConfig.links.github} className="transition hover:text-white">
              GitHub
            </Link>
            <Link href="#" className="transition hover:text-white">
              Read.cv
            </Link>
            <Link href={siteConfig.links.email} className="transition hover:text-white">
              Email
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  if (pathname === "/experience") {
    return (
      <footer className="rounded-t-[20px] bg-black px-5 py-20 text-white sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-[1180px]">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="inline-flex text-[72px] font-semibold leading-none tracking-normal text-white/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-[88px]"
          >
            HC
          </Link>

          <div className="mt-24 flex flex-col gap-6 border-t border-white/12 pt-8 text-[10px] font-medium text-white/45 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Link href="#" className="transition hover:text-white">
                Twitter
              </Link>
              <Link href={siteConfig.links.github} className="transition hover:text-white">
                GitHub
              </Link>
              <Link href={siteConfig.links.linkedin} className="transition hover:text-white">
                LinkedIn
              </Link>
              <Link href="#" className="transition hover:text-white">
                Layers
              </Link>
              <Link href="#" className="transition hover:text-white">
                Medium
              </Link>
            </div>
            <p>© 2024 Hélder Cruz. Built for the modern web.</p>
          </div>
        </div>
      </footer>
    );
  }

  if (pathname.startsWith("/projects/")) {
    return (
      <footer className="rounded-t-[20px] bg-black px-5 py-20 text-white sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto flex min-h-[360px] w-full max-w-[1120px] flex-col justify-between">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="inline-flex text-[72px] font-semibold leading-none tracking-normal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-[84px]"
            >
              HC
            </Link>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase text-white/42">
              <Link href="#" className="transition hover:text-white">
                Twitter
              </Link>
              <Link href={siteConfig.links.github} className="transition hover:text-white">
                GitHub
              </Link>
              <Link href={siteConfig.links.linkedin} className="transition hover:text-white">
                LinkedIn
              </Link>
              <Link href="#" className="transition hover:text-white">
                Layers
              </Link>
              <Link href="#" className="transition hover:text-white">
                Medium
              </Link>
            </div>
          </div>

          <p className="pt-16 text-[10px] leading-5 text-white/45">
            © 2024 Hélder Cruz. Built for the modern web.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="rounded-t-[24px] bg-black px-5 py-14 text-white sm:px-8 md:rounded-t-[28px] md:py-20 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-[1.2fr_2.4fr]">
        <div>
          <Link
            href="/"
            aria-label="Go to homepage"
            className="inline-flex rounded-full text-2xl font-semibold tracking-normal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Hélder Cruz
          </Link>
          <p className="mt-6 max-w-[240px] text-xs leading-5 text-white/48">
            © 2024 Hélder Cruz. Engineered for clarity.
          </p>
        </div>

        <div className="grid gap-9 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/32">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-xs font-medium text-white/48 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

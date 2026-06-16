import Link from "next/link";
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
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
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

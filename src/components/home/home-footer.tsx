import { Globe, Mail, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerGroups = [
  {
    title: "Navigate",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "LinkedIn", href: siteConfig.links.linkedin },
      { label: "Email", href: siteConfig.links.email }
    ]
  },
  {
    title: "Projects",
    links: [
      { label: "Casa Benfica Lenzburg", href: "/projects/casa-benfica-lenzburg" },
      { label: "XV Studio", href: "/projects/xv-studio" },
      { label: "HAUSB", href: "/projects/hausb" }
    ]
  }
];

export function HomeFooter() {
  return (
    <footer className="relative z-20 rounded-t-[48px] bg-black px-5 pb-10 pt-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1728px]">
        <div className="grid gap-12 md:grid-cols-[1.1fr_2fr] lg:gap-20">
          <div className="flex flex-col gap-7">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white p-2"
            >
              <Image
                src="/hc.png"
                alt="Hélder Cruz logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/55">
              Software Engineer building clean, scalable and useful digital products for real client
              needs.
            </p>
            <div className="flex gap-3">
              <Link
                href={siteConfig.links.github}
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Share2 aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Globe aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.links.email}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-9 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-5 text-[10px] font-bold uppercase text-white">{group.title}</h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-white/55 transition hover:text-white"
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[11px] font-medium text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hélder Cruz. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/work" className="transition hover:text-white">
              Work
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
            <Link href={siteConfig.links.resume} className="transition hover:text-white">
              Resume
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

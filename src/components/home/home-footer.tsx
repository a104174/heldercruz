"use client";

import { Globe, Mail, Share2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { siteConfig } from "@/config/site";

const footerGroups = [
  {
    title: "Navigate",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Contacto", href: "/contact" }
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
    <footer className="min-h-[360px] overflow-hidden bg-black px-5 pb-10 pt-16 text-white sm:min-h-[400px] sm:px-8 sm:pt-20 lg:min-h-[440px] lg:px-10">
      <div className="relative mx-auto max-w-[1728px]">
        {/* Brilho de fundo subtil no topo do footer */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[80px]" />

        <div className="grid gap-12 md:grid-cols-[1.1fr_2fr] lg:gap-20">
          <AnimatedReveal className="flex flex-col gap-7">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white p-2 transition-transform duration-500 hover:scale-110"
            >
              <Image
                src="/hc.png"
                alt="Hélder Cruz logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain transition-transform duration-500 group-hover:rotate-12"
              />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/55">
              Software Engineer building clean, scalable and useful digital products for real client
              needs.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: siteConfig.links.github, label: "GitHub" },
                { icon: Globe, href: siteConfig.links.linkedin, label: "LinkedIn" },
                { icon: Mail, href: siteConfig.links.email, label: "Email" },
              ].map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <social.icon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedReveal>

          <div className="grid gap-9 sm:grid-cols-3">
            {footerGroups.map((group, groupIndex) => (
              <AnimatedReveal key={group.title} delay={0.1 + groupIndex * 0.05}>
                <h2 className="mb-5 text-[10px] font-bold uppercase text-white">{group.title}</h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`} className="group relative w-fit">
                      <Link
                        href={link.href}
                        className="inline-block text-sm font-medium text-white/55 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedReveal>
            ))}
          </div>
        </div>

        <AnimatedReveal delay={0.3} className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[11px] font-medium text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hélder Cruz. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/work" className="transition-colors duration-300 hover:text-white">
              Work
            </Link>
            <Link href="/contact" className="transition-colors duration-300 hover:text-white">
              Contacto
            </Link>
            <Link
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white"
            >
              Resume
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </footer>
  );
}

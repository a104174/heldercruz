"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/contact/social-icons";
import { siteConfig } from "@/config/site";
import { useDictionary, useLocalizedHref } from "@/i18n/use-i18n";

const navigateLinks = [
  { key: "work", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "experience", href: "/experience" },
  { key: "contact", href: "/contact" }
] as const;

const connectLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/heldercruz30", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/a104174", icon: GithubIcon },
  { label: "Twitter / X", href: "https://x.com/hcruz30", icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/hcruzz._/", icon: InstagramIcon },
  { label: "WhatsApp", href: "https://wa.me/351914096517", icon: MessageCircle },
  { label: "Email", href: siteConfig.links.email, icon: Mail }
];

export function HomeFooter() {
  const dictionary = useDictionary();
  const localizeHref = useLocalizedHref();

  return (
    <footer className="min-h-[360px] overflow-hidden bg-black px-5 pb-10 pt-16 text-white sm:min-h-[400px] sm:px-8 sm:pt-20 lg:min-h-[440px] lg:px-10">
      <div className="relative mx-auto max-w-[1728px]">
        {/* Subtle background glow at the top of the footer */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[80px]" />

        <div className="grid gap-12 md:grid-cols-[1fr_0.7fr_1fr] md:items-start lg:gap-20">
          <AnimatedReveal className="flex flex-col gap-7">
            <Link
              href={localizeHref("/")}
              aria-label={dictionary.nav.goHome}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white p-2 transition-transform duration-500 hover:scale-110"
            >
              <Image
                src="/hc.png"
                alt="Hélder Cruz logo"
                width={48}
                height={48}
                className="h-12 w-auto object-contain transition-transform duration-500 group-hover:rotate-12"
              />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/55">
              {dictionary.footer.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {connectLinks.map((social, index) => (
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
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <social.icon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <h2 className="mb-5 text-[10px] font-bold uppercase text-white">{dictionary.footer.navigate}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {navigateLinks.map((link) => (
                <li key={link.key} className="group relative w-fit">
                  <Link
                    href={localizeHref(link.href)}
                    className="inline-block text-sm font-medium text-white/55 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                  >
                    {dictionary.common[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <h2 className="mb-5 text-[10px] font-bold uppercase text-white">{dictionary.footer.connect}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {connectLinks.map((link) => (
                <li key={link.label} className="group relative w-fit">
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-block text-sm font-medium text-white/55 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedReveal>
        </div>

        <AnimatedReveal delay={0.3} className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[11px] font-medium text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hélder Cruz. {dictionary.footer.rights}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={localizeHref("/projects")} className="transition-colors duration-300 hover:text-white">
              {dictionary.common.work}
            </Link>
            <Link href={localizeHref("/contact")} className="transition-colors duration-300 hover:text-white">
              {dictionary.common.contact}
            </Link>
            <Link
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white"
            >
              {dictionary.common.resume}
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </footer>
  );
}

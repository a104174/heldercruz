"use client";

import { MessageCircle } from "lucide-react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AnimatedReveal } from "@/components/animations/animated-reveal";
import DarkVeil from "@/components/backgrounds/dark-veil";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/contact/social-icons";
import {
  useDictionary,
  useLanguageSwitcherHref,
  useLocale,
  useLocalizedHref
} from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const navigateLinks = [
  { key: "home", href: "/" },
  { key: "work", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" }
] as const;

const socialLinks = [
  { label: "GitHub", href: "https://github.com/a104174" },
  { label: "LinkedIn", href: "https://linkedin.com/in/heldercruz30" },
  { label: "X", href: "https://x.com/hcruz30" },
  { label: "Instagram", href: "https://www.instagram.com/hcruzz._/" }
] as const;

const footerCopy = {
  en: {
    home: "Home",
    getInTouch: "Get in Touch",
    topStatement: "Based in Portugal"
  },
  pt: {
    home: "Início",
    getInTouch: "Entrar em contacto",
    topStatement: "Baseado em Portugal"
  }
} as const;

const directEmail = "heldercruz.dev@gmail.com";

function FooterBackgroundSlot() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black"
    >
      {shouldReduceMotion ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_72%,rgba(255,255,255,0.2),transparent_42%),radial-gradient(circle_at_72%_54%,rgba(255,255,255,0.12),transparent_30%)]" />
      ) : (
        <div className="absolute inset-0 opacity-80 mix-blend-screen [filter:grayscale(1)_brightness(2.35)_contrast(1.35)]">
          <DarkVeil
            speed={0.34}
            noiseIntensity={0.05}
            scanlineIntensity={0}
            scanlineFrequency={0}
            warpAmount={0.42}
            resolutionScale={0.8}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </div>
  );
}

function FooterIconLink({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-5 w-5 items-center justify-center text-white/48 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
    >
      {children}
    </Link>
  );
}

export function HomeFooter() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const localizeHref = useLocalizedHref();
  const copy = footerCopy[locale];

  const englishHref = useLanguageSwitcherHref("en");
  const portugueseHref = useLanguageSwitcherHref("pt");
  const contactHref = localizeHref("/contact");

  const localizedNavigateLinks = navigateLinks.map((link, index) => ({
    label: link.key === "home" ? copy.home : dictionary.common[link.key],
    featured: index === 0,
    href: localizeHref(link.href)
  }));

  const languageLinks = [
    { locale: "pt", label: "PT", href: portugueseHref },
    { locale: "en", label: "ENG", href: englishHref }
  ] as const;

  return (
    <footer className="relative isolate min-h-[820px] overflow-hidden bg-black px-5 text-white sm:px-8 lg:h-[var(--footer-reveal-height)] lg:min-h-[var(--footer-reveal-height)] lg:px-10">
      <FooterBackgroundSlot />

      <div className="relative z-10 mx-auto flex h-full max-w-[1728px] flex-col pt-10 sm:pt-12 lg:pt-10">
        <AnimatedReveal className="flex min-h-16 items-center justify-between border-b border-white/10 text-xs font-semibold text-white/38 sm:min-h-[70px]">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href={`mailto:${directEmail}`}
            className="hidden transition-colors duration-300 hover:text-white sm:block"
          >
            {directEmail}
          </Link>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="grid min-h-[260px] grid-cols-1 gap-10 border-b border-white/10 py-9 sm:min-h-[292px] sm:grid-cols-[minmax(180px,1fr)_minmax(170px,0.42fr)_minmax(180px,1fr)] sm:items-start sm:py-11 lg:min-h-[30.5svh] lg:py-[5.2vh]">
          <p className="max-w-[220px] text-xs font-medium leading-5 text-white/34">
            {copy.topStatement}
          </p>

          <nav aria-label={dictionary.footer.navigate} className="justify-self-start sm:justify-self-center">
            <ul className="grid gap-1 text-left sm:gap-1.5">
              {localizedNavigateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group inline-flex items-center text-[26px] font-semibold leading-[0.92] tracking-[-0.06em] transition-colors duration-300 hover:text-white sm:text-[28px] lg:text-[30px]",
                      link.featured ? "text-white" : "text-white/52"
                    )}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 sm:justify-end">
            <FooterIconLink href="https://wa.me/351914096517" label="WhatsApp">
              <MessageCircle aria-hidden="true" className="h-[15px] w-[15px] stroke-[2]" />
            </FooterIconLink>
            <FooterIconLink href="https://www.instagram.com/hcruzz._/" label="Instagram">
              <InstagramIcon aria-hidden="true" className="h-[15px] w-[15px]" />
            </FooterIconLink>
            <FooterIconLink href="https://github.com/a104174" label="GitHub">
              <GithubIcon aria-hidden="true" className="h-[15px] w-[15px]" />
            </FooterIconLink>
            <FooterIconLink href="https://linkedin.com/in/heldercruz30" label="LinkedIn">
              <LinkedinIcon aria-hidden="true" className="h-[15px] w-[15px]" />
            </FooterIconLink>
          </div>
        </AnimatedReveal>

        <AnimatedReveal
          delay={0.18}
          className="flex flex-1 items-start justify-center pt-[clamp(3rem,7.2vh,5.5rem)]"
        >
          <Link href={contactHref} className="group block w-full text-center">
            <span className="inline-block text-center text-[clamp(5.5rem,20vw,22rem)] font-semibold leading-[0.76] tracking-[-0.075em] text-white transition-transform duration-500 group-hover:scale-[0.99] lg:text-[clamp(8rem,16.2vw,23rem)]">
              {copy.getInTouch}
            </span>
          </Link>
        </AnimatedReveal>

        <div className="absolute inset-x-0 bottom-6 flex items-end justify-between text-[11px] font-medium text-white/40 sm:bottom-8">
          <p>Hélder Cruz © 2026</p>

          <div className="flex items-center gap-2">
            {languageLinks.map((item, index) => (
              <div key={item.locale} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  aria-current={item.locale === locale ? "true" : undefined}
                  className={cn(
                    "transition-colors duration-300 hover:text-white",
                    item.locale === locale ? "text-white/80" : "text-white/40"
                  )}
                >
                  {item.label}
                </Link>
                {index < languageLinks.length - 1 ? (
                  <span className="text-white/18">/</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

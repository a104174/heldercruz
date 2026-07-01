"use client";

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
  { key: "work", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "experience", href: "/experience" },
  { key: "contact", href: "/contact" }
] as const;

const footerSpecialties = ["Software", "Websites", "Branding", "Design"] as const;

const footerCopy = {
  en: {
    home: "Home",
    getInTouch: "Get in Touch",
    topStatement: "Based in Portugal. For real needs"
  },
  pt: {
    home: "Início",
    getInTouch: "Vamos Falar",
    topStatement: "Baseado em Portugal. Com propósito"
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
      className="inline-flex h-7 w-7 items-center justify-center text-white/48 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
    >
      {children}
    </Link>
  );
}

function FooterHoverText({ children }: { children: ReactNode }) {
  return (
    <span className="relative z-10 block h-[1.12em] overflow-hidden leading-[1.12]">
      <span className="block transition-transform duration-300 ease-out group-hover/nav-item:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover/nav-item:-translate-y-full">
        {children}
      </span>
    </span>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .2 5.32.2 11.87c0 2.09.55 4.13 1.59 5.93L0 24l6.38-1.67a11.8 11.8 0 0 0 5.69 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.43-8.43ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.79 1 1.01-3.69-.24-.38a9.91 9.91 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.91 9.92Zm5.44-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.23-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.56-.35Z" />
    </svg>
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
    label: dictionary.common[link.key],
    featured: index === 0,
    href: localizeHref(link.href)
  }));

  const languageLinks = [
    { locale: "pt", label: "PT", href: portugueseHref },
    { locale: "en", label: "EN", href: englishHref }
  ] as const;

  return (
    <footer className="relative isolate min-h-[820px] overflow-hidden bg-black px-5 text-white sm:px-8 lg:h-[var(--footer-reveal-height)] lg:min-h-[var(--footer-reveal-height)] lg:px-10">
      <FooterBackgroundSlot />

      <div className="relative z-10 mx-auto flex h-full max-w-[1728px] flex-col pt-10 sm:pt-12 lg:pt-10">
        <AnimatedReveal className="flex min-h-16 items-center justify-between border-b border-white/10 text-xs font-semibold text-white/38 sm:min-h-[70px]">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {footerSpecialties.map((item) => (
              <span key={item}>{item}</span>
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
                      "group/nav-item inline-flex items-center overflow-hidden text-[26px] font-semibold leading-none tracking-[-0.06em] transition-colors duration-300 hover:text-white sm:text-[28px] lg:text-[30px]",
                      link.featured ? "text-white" : "text-white/52"
                    )}
                  >
                    <FooterHoverText>{link.label}</FooterHoverText>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 sm:justify-end">
            <FooterIconLink href="https://wa.me/351914096517" label="WhatsApp">
              <WhatsAppIcon className="h-5 w-5" />
            </FooterIconLink>
            <FooterIconLink href="https://www.instagram.com/hcruzz._/" label="Instagram">
              <InstagramIcon aria-hidden="true" className="h-5 w-5" />
            </FooterIconLink>
            <FooterIconLink href="https://github.com/a104174" label="GitHub">
              <GithubIcon aria-hidden="true" className="h-5 w-5" />
            </FooterIconLink>
            <FooterIconLink href="https://linkedin.com/in/heldercruz30" label="LinkedIn">
              <LinkedinIcon aria-hidden="true" className="h-5 w-5" />
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

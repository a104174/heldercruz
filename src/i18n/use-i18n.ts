"use client";

import { usePathname } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getLocaleFromPathname,
  localizeHref,
  localizePathname,
  type Locale
} from "@/i18n/locales";

export function useLocale() {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname);
}

export function useDictionary() {
  return getDictionary(useLocale());
}

export function useLocalizedHref() {
  const locale = useLocale();
  return (href: string) => localizeHref(href, locale);
}

export function useLanguageSwitcherHref(targetLocale: Locale) {
  const pathname = usePathname();
  return localizePathname(pathname, targetLocale);
}

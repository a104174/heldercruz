import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/config/site";
import { locales, type Locale } from "@/i18n/locales";

const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  pt: "pt_PT"
};

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function createLocalizedMetadata({
  locale,
  pathname,
  title,
  description
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const normalizedPathname = normalizePathname(pathname);
  const localizedPathname = `/${locale}${normalizedPathname}`;
  const languages = Object.fromEntries(
    locales.map((item) => [item, `/${item}${normalizedPathname}`])
  ) as Record<Locale, string>;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPathname,
      languages: {
        ...languages,
        "x-default": `/en${normalizedPathname}`
      }
    },
    openGraph: {
      title,
      description,
      url: `${getSiteUrl()}${localizedPathname}`,
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

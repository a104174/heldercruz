export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string | undefined): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isValidLocale(segment) ? segment : defaultLocale;
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (isValidLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  }

  return pathname === "" ? "/" : pathname;
}

export function localizePathname(pathname: string, locale: Locale) {
  const strippedPathname = stripLocaleFromPathname(pathname);
  return strippedPathname === "/" ? `/${locale}` : `/${locale}${strippedPathname}`;
}

export function localizeHref(href: string, locale: Locale) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (!href.startsWith("/")) {
    return href;
  }

  return localizePathname(href, locale);
}

export function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const languages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [languageRange, qValue] = entry.trim().split(";q=");
      return {
        language: languageRange.toLowerCase(),
        quality: qValue ? Number.parseFloat(qValue) : 1
      };
    })
    .filter((entry) => entry.language && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  return languages.some((entry) => entry.language === "pt" || entry.language.startsWith("pt-"))
    ? "pt"
    : "en";
}

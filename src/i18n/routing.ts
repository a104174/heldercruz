import { defaultLocale, isValidLocale, type Locale } from "@/i18n/locales";

export type LocaleRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function resolveLocaleParam(params: LocaleRouteProps["params"]): Promise<Locale> {
  const { locale } = await params;
  return isValidLocale(locale) ? locale : defaultLocale;
}

import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/i18n/locales";

export function getExperienceItems(locale: Locale = defaultLocale) {
  return [...getDictionary(locale).experienceItems];
}

export const experienceItems = getExperienceItems();

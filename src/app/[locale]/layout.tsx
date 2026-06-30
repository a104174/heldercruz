import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isValidLocale, locales } from "@/i18n/locales";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en");
  }

  return children;
}

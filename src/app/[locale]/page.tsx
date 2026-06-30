import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { type LocaleRouteProps, resolveLocaleParam } from "@/i18n/routing";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const dictionary = getDictionary(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/",
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription
  });
}

export default function Page() {
  return <HomePage />;
}

import type { Metadata } from "next";
import AboutPage from "@/app/about/page";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { type LocaleRouteProps, resolveLocaleParam } from "@/i18n/routing";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const dictionary = getDictionary(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/about",
    title: dictionary.metadata.aboutTitle,
    description: dictionary.metadata.aboutDescription
  });
}

export default function Page() {
  return <AboutPage />;
}

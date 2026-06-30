import type { Metadata } from "next";
import ExperiencePage from "@/app/experience/page";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { type LocaleRouteProps, resolveLocaleParam } from "@/i18n/routing";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const dictionary = getDictionary(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/experience",
    title: dictionary.metadata.experienceTitle,
    description: dictionary.metadata.experienceDescription
  });
}

export default function Page() {
  return <ExperiencePage />;
}

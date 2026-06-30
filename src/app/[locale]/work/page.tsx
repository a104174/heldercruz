import type { Metadata } from "next";
import WorkPageRoute from "@/app/work/page";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { type LocaleRouteProps, resolveLocaleParam } from "@/i18n/routing";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const dictionary = getDictionary(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/work",
    title: dictionary.metadata.workTitle,
    description: dictionary.metadata.workDescription
  });
}

export default function Page() {
  return <WorkPageRoute />;
}

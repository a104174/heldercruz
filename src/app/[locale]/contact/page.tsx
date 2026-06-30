import type { Metadata } from "next";
import ContactPage from "@/app/contact/page";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { type LocaleRouteProps, resolveLocaleParam } from "@/i18n/routing";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const dictionary = getDictionary(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/contact",
    title: dictionary.metadata.contactTitle,
    description: dictionary.metadata.contactDescription
  });
}

export default function Page() {
  return <ContactPage />;
}

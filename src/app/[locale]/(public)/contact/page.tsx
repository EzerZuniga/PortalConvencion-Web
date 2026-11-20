import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactView } from "@/features/contact/components/ContactView";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("contact", await resolveLocale(params));
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <>
      <JsonLd data={createPageJsonLd("contact", locale)} />
      <ContactView />
    </>
  );
}

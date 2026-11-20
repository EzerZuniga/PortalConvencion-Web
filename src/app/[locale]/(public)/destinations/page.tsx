import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { DestinationsView } from "@/features/destinations/components/DestinationsView";
import { getDestinationCards } from "@/features/destinations/queries";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("destinations", await resolveLocale(params));
}

export default async function DestinationsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <>
      <JsonLd data={createPageJsonLd("destinations", locale)} />
      <DestinationsView destinations={getDestinationCards(locale)} />
    </>
  );
}

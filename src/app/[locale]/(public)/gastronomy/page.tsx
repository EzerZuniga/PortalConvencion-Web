import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { GastronomyView } from "@/features/gastronomy/components/GastronomyView";
import { getDishes, getRestaurants } from "@/features/gastronomy/queries";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("gastronomy", await resolveLocale(params));
}

export default async function GastronomyPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <>
      <JsonLd data={createPageJsonLd("gastronomy", locale)} />
      <GastronomyView dishes={getDishes(locale)} restaurants={getRestaurants(locale)} />
    </>
  );
}

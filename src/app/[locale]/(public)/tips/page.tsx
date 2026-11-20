import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { TipsView } from "@/features/tips/components/TipsView";
import { getTipGroups } from "@/features/tips/queries";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("tips", await resolveLocale(params));
}

export default async function TipsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <>
      <JsonLd data={createPageJsonLd("tips", locale)} />
      <TipsView groups={getTipGroups(locale)} />
    </>
  );
}

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutView } from "@/features/about/components/AboutView";
import { getTeamMembers } from "@/features/about/queries";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("about", await resolveLocale(params));
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <>
      <JsonLd data={createPageJsonLd("about", locale)} />
      <AboutView team={getTeamMembers(locale)} />
    </>
  );
}

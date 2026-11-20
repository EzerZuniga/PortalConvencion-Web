import type { Metadata } from "next";
import { PrivacyView } from "@/features/legal/components/PrivacyView";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("privacy", await resolveLocale(params));
}

export default async function PrivacyPage({ params }: LocaleParams) {
  await resolveLocale(params);

  return <PrivacyView />;
}

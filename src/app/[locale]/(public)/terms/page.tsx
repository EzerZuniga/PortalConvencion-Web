import type { Metadata } from "next";
import { TermsView } from "@/features/legal/components/TermsView";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("terms", await resolveLocale(params));
}

export default async function TermsPage({ params }: LocaleParams) {
  await resolveLocale(params);

  return <TermsView />;
}

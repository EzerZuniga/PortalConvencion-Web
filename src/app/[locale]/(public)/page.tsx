import type { Metadata } from "next";
import { getFeaturedDestinationCards } from "@/features/destinations/queries";
import { HomeView } from "@/features/home/components/HomeView";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("home", await resolveLocale(params));
}

export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return <HomeView featuredDestinations={getFeaturedDestinationCards(locale)} />;
}

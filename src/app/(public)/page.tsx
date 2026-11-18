import { getFeaturedDestinationCards } from "@/features/destinations/queries";
import { HomeView } from "@/features/home/components/HomeView";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("home");

export default function HomePage() {
  return <HomeView featuredDestinations={getFeaturedDestinationCards()} />;
}

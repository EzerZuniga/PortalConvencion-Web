import { JsonLd } from "@/components/seo/JsonLd";
import { DestinationsView } from "@/features/destinations/components/DestinationsView";
import { getDestinationCards } from "@/features/destinations/queries";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("destinations");

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("destinations")} />
      <DestinationsView destinations={getDestinationCards()} />
    </>
  );
}

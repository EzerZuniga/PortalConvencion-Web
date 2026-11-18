import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import Destinations from "@/views/Destinations";

export const metadata = createPageMetadata("destinations");

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("destinations")} />
      <Destinations />
    </>
  );
}

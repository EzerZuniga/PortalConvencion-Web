import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import Gastronomia from "@/views/Gastronomia";

export const metadata = createPageMetadata("gastronomy");

export default function GastronomyPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("gastronomy")} />
      <Gastronomia />
    </>
  );
}

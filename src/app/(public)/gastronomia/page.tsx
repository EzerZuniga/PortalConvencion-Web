import { JsonLd } from "@/components/seo/JsonLd";
import { GastronomyView } from "@/features/gastronomy/components/GastronomyView";
import { getDishes, getRestaurants } from "@/features/gastronomy/queries";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("gastronomy");

export default function GastronomyPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("gastronomy")} />
      <GastronomyView dishes={getDishes()} restaurants={getRestaurants()} />
    </>
  );
}

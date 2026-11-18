import { JsonLd } from "@/components/seo/JsonLd";
import { TipsView } from "@/features/tips/components/TipsView";
import { getTipGroups } from "@/features/tips/queries";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("tips");

export default function TipsPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("tips")} />
      <TipsView groups={getTipGroups()} />
    </>
  );
}

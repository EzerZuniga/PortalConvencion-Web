import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import Tips from "@/views/Tips";

export const metadata = createPageMetadata("tips");

export default function TipsPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("tips")} />
      <Tips />
    </>
  );
}

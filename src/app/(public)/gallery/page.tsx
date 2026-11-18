import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import Gallery from "@/views/Gallery";

export const metadata = createPageMetadata("gallery");

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("gallery")} />
      <Gallery />
    </>
  );
}

import { JsonLd } from "@/components/seo/JsonLd";
import { GalleryView } from "@/features/gallery/components/GalleryView";
import { getGalleryItems } from "@/features/gallery/queries";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("gallery");

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("gallery")} />
      <GalleryView images={getGalleryItems()} />
    </>
  );
}

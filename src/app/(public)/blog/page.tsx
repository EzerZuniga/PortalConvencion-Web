import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import Blog from "@/views/Blog";

export const metadata = createPageMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("blog")} />
      <Blog />
    </>
  );
}

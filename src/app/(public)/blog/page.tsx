import { JsonLd } from "@/components/seo/JsonLd";
import { BlogView } from "@/features/blog/components/BlogView";
import { getPostCards } from "@/features/blog/queries";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("blog")} />
      <BlogView posts={getPostCards()} />
    </>
  );
}

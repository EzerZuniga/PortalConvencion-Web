import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogView } from "@/features/blog/components/BlogView";
import { getPostCards } from "@/features/blog/queries";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("blog", await resolveLocale(params));
}

export default async function BlogPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  return (
    <>
      <JsonLd data={createPageJsonLd("blog", locale)} />
      <BlogView posts={getPostCards(locale)} />
    </>
  );
}

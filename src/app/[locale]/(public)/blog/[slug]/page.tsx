import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES, routeTo } from "@/config/routes";
import { BlogArticle } from "@/features/blog/components/BlogArticle";
import {
  getPost,
  getPostStaticParams,
  getPostVersions,
  getRelatedPostCards,
  toPostHeader,
} from "@/features/blog/queries";
import { resolveLocale } from "@/lib/i18n/server";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { localizedUrl } from "@/lib/seo/localized";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { routeLabel } from "@/lib/seo/pages";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/** Solo existen los posts generados en build para cada idioma; el resto es 404. */
export const dynamicParams = false;

/**
 * Todas las combinaciones `{ locale, slug }` que existen en el contenido.
 *
 * Se devuelven completas (sin usar los `params` del layout): en Next 16, si el
 * `generateStaticParams` hijo devuelve una lista vacía para algún idioma
 * (p. ej. un idioma aún sin traducciones), Next descarta la ruta entera y no
 * pregenera ninguna página.
 */
export function generateStaticParams() {
  return getPostStaticParams();
}

async function load(params: BlogPostPageProps["params"]) {
  const locale = await resolveLocale(params);
  const post = getPost((await params).slug, locale);
  if (!post) notFound();
  return { locale, post };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, post } = await load(params);
  const header = toPostHeader(post);

  return createArticleMetadata({
    locale,
    title: header.title,
    description: header.description,
    href: routeTo.blogPost(post.slug),
    versions: getPostVersions(post.id),
    image: header.image,
    author: header.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    section: routeLabel("blog", locale),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, post } = await load(params);
  const header = toPostHeader(post);
  const url = localizedUrl(locale, routeTo.blogPost(post.slug));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: "BlogPosting",
          locale,
          title: header.title,
          description: header.description,
          url,
          image: header.image,
          author: header.author,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: routeLabel("home", locale), url: localizedUrl(locale, ROUTES.home) },
          { name: routeLabel("blog", locale), url: localizedUrl(locale, ROUTES.blog) },
          { name: header.title, url },
        ])}
      />
      <BlogArticle header={header} related={getRelatedPostCards(post)}>
        <MdxContent code={post.body} />
      </BlogArticle>
    </>
  );
}

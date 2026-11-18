import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES, routeTo } from "@/config/routes";
import { BlogArticle } from "@/features/blog/components/BlogArticle";
import { getPost, getPostSlugs, getRelatedPostCards, toPostHeader } from "@/features/blog/queries";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { routeLabel } from "@/lib/seo/pages";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/** Solo existen los posts generados en build; cualquier otro slug es 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  const header = toPostHeader(post);
  return createArticleMetadata({
    title: header.title,
    description: header.description,
    path: routeTo.blogPost(post.slug),
    image: header.image,
    author: header.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    section: routeLabel("blog"),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const header = toPostHeader(post);
  const path = routeTo.blogPost(post.slug);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: "BlogPosting",
          title: header.title,
          description: header.description,
          path,
          image: header.image,
          author: header.author,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: routeLabel("home"), path: ROUTES.home },
          { name: routeLabel("blog"), path: ROUTES.blog },
          { name: header.title, path },
        ])}
      />
      <BlogArticle header={header} related={getRelatedPostCards(post)}>
        <MdxContent code={post.body} />
      </BlogArticle>
    </>
  );
}

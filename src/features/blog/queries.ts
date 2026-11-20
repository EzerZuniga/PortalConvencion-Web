import "server-only";
import { type Post, posts } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { routeTo } from "@/config/routes";
import type { ArticleCard, ArticleHeader } from "@/lib/content/types";
import {
  forLocale,
  forLocaleWithArticleFallback,
  formatReadTime,
  imageSrc,
  isPublished,
  newestFirst,
} from "@/lib/content/utils";

export type { Post };

const publishedPosts = posts.filter(isPublished);

/** Posts que tienen página propia en ese idioma. */
function published(locale: Locale): Post[] {
  return forLocale(publishedPosts, locale).sort(newestFirst);
}

/** Para listados: el idioma pedido completado con el idioma por defecto. */
function listed(locale: Locale): Post[] {
  return forLocaleWithArticleFallback(publishedPosts, locale).sort(newestFirst);
}

function toCard(doc: Post): ArticleCard {
  return {
    id: doc.id,
    href: routeTo.blogPost(doc.slug),
    locale: doc.locale,
    title: doc.title,
    excerpt: doc.description,
    category: doc.category,
    image: imageSrc(doc.cover),
    author: doc.author,
    date: doc.publishedAt,
    readTime: formatReadTime(doc.metadata.readingTime),
    featured: doc.featured,
  };
}

export function toPostHeader(doc: Post): ArticleHeader {
  return {
    title: doc.title,
    description: doc.description,
    category: doc.category,
    author: doc.author,
    date: doc.publishedAt,
    readTime: formatReadTime(doc.metadata.readingTime),
    image: imageSrc(doc.cover),
    imageAlt: doc.coverAlt ?? doc.title,
    hasCover: Boolean(doc.cover),
  };
}

/** Tarjetas para el listado, de la más reciente a la más antigua. */
export function getPostCards(locale: Locale = DEFAULT_LOCALE): ArticleCard[] {
  return listed(locale).map(toCard);
}

/** Post con página propia en ese idioma (sin respaldo: sin traducción no hay página). */
export function getPost(slug: string, locale: Locale = DEFAULT_LOCALE) {
  return published(locale).find((doc) => doc.slug === slug);
}

/** Otros posts, priorizando los de la misma categoría. */
export function getRelatedPostCards(doc: Post, limit = 3): ArticleCard[] {
  const others = listed(doc.locale).filter((other) => other.id !== doc.id);
  const sameCategory = others.filter((other) => other.category === doc.category);
  const rest = others.filter((other) => other.category !== doc.category);
  return [...sameCategory, ...rest].slice(0, limit).map(toCard);
}

/** Idiomas en los que existe un post, con su enlace (para `hreflang`). */
export function getPostVersions(id: string) {
  return publishedPosts
    .filter((doc) => doc.id === id)
    .map((doc) => ({ locale: doc.locale, href: routeTo.blogPost(doc.slug) }));
}

/** Parámetros de las páginas de detalle: una por idioma en que existe cada documento. */
export function getPostStaticParams(): { locale: Locale; slug: string }[] {
  return publishedPosts.map((doc) => ({ locale: doc.locale, slug: doc.slug }));
}

export function getPostSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return published(locale).map((doc) => doc.slug);
}

/** Un registro por post (agrupado por `id`) con todas sus versiones. */
export function getPostsForSitemap() {
  const ids = [...new Set(publishedPosts.map((doc) => doc.id))];
  return ids.map((id) => {
    const docs = publishedPosts.filter((doc) => doc.id === id);
    const lastModified = docs
      .map((doc) => doc.updatedAt ?? doc.publishedAt)
      .sort()
      .at(-1);
    return { versions: getPostVersions(id), lastModified };
  });
}

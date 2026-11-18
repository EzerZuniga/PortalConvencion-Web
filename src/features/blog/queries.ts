import "server-only";
import { type Post, posts } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { routeTo } from "@/config/routes";
import type { ArticleCard, ArticleHeader } from "@/lib/content/types";
import { forLocale, formatReadTime, imageSrc, isPublished, newestFirst } from "@/lib/content/utils";

export type { Post };

function published(locale: Locale): Post[] {
  return forLocale(posts, locale).filter(isPublished).sort(newestFirst);
}

function toCard(doc: Post): ArticleCard {
  return {
    id: doc.id,
    href: routeTo.blogPost(doc.slug),
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

/** Tarjetas de posts publicados, del más reciente al más antiguo. */
export function getPostCards(locale: Locale = DEFAULT_LOCALE): ArticleCard[] {
  return published(locale).map(toCard);
}

export function getPost(slug: string, locale: Locale = DEFAULT_LOCALE) {
  return published(locale).find((doc) => doc.slug === slug);
}

/** Otros posts, priorizando los de la misma categoría. */
export function getRelatedPostCards(doc: Post, limit = 3): ArticleCard[] {
  const others = published(doc.locale).filter((other) => other.id !== doc.id);
  const sameCategory = others.filter((other) => other.category === doc.category);
  const rest = others.filter((other) => other.category !== doc.category);
  return [...sameCategory, ...rest].slice(0, limit).map(toCard);
}

export function getPostSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return published(locale).map((doc) => doc.slug);
}

export function getPostsForSitemap() {
  return posts.filter(isPublished).map((doc) => ({
    slug: doc.slug,
    locale: doc.locale,
    lastModified: doc.updatedAt ?? doc.publishedAt,
  }));
}

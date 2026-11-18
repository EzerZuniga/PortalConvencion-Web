import "server-only";
import { type Destination, destinations } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { routeTo } from "@/config/routes";
import type { ArticleCard, ArticleHeader } from "@/lib/content/types";
import { forLocale, formatReadTime, imageSrc, isPublished, newestFirst } from "@/lib/content/utils";

export type { Destination };

function published(locale: Locale): Destination[] {
  return forLocale(destinations, locale).filter(isPublished).sort(newestFirst);
}

function toCard(doc: Destination): ArticleCard {
  return {
    id: doc.id,
    href: routeTo.destination(doc.slug),
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

export function toDestinationHeader(doc: Destination): ArticleHeader {
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

/** Tarjetas de destinos publicados, del más reciente al más antiguo. */
export function getDestinationCards(locale: Locale = DEFAULT_LOCALE): ArticleCard[] {
  return published(locale).map(toCard);
}

export function getFeaturedDestinationCards(locale: Locale = DEFAULT_LOCALE): ArticleCard[] {
  return published(locale)
    .filter((doc) => doc.featured)
    .map(toCard);
}

export function getDestination(slug: string, locale: Locale = DEFAULT_LOCALE) {
  return published(locale).find((doc) => doc.slug === slug);
}

/** Otros destinos de la misma categoría, para la sección "Sigue explorando". */
export function getRelatedDestinationCards(doc: Destination, limit = 3): ArticleCard[] {
  return published(doc.locale)
    .filter((other) => other.category === doc.category && other.id !== doc.id)
    .slice(0, limit)
    .map(toCard);
}

export function getDestinationSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return published(locale).map((doc) => doc.slug);
}

export function getDestinationsForSitemap() {
  return destinations.filter(isPublished).map((doc) => ({
    slug: doc.slug,
    locale: doc.locale,
    lastModified: doc.updatedAt ?? doc.publishedAt,
  }));
}

import "server-only";
import { type Destination, destinations } from "#content";
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

export type { Destination };

const publishedDestinations = destinations.filter(isPublished);

/** Destinos que tienen página propia en ese idioma. */
function published(locale: Locale): Destination[] {
  return forLocale(publishedDestinations, locale).sort(newestFirst);
}

/** Para listados: el idioma pedido completado con el idioma por defecto. */
function listed(locale: Locale): Destination[] {
  return forLocaleWithArticleFallback(publishedDestinations, locale).sort(newestFirst);
}

function toCard(doc: Destination): ArticleCard {
  return {
    id: doc.id,
    href: routeTo.destination(doc.slug),
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

/** Tarjetas para el listado, de la más reciente a la más antigua. */
export function getDestinationCards(locale: Locale = DEFAULT_LOCALE): ArticleCard[] {
  return listed(locale).map(toCard);
}

export function getFeaturedDestinationCards(locale: Locale = DEFAULT_LOCALE): ArticleCard[] {
  return listed(locale)
    .filter((doc) => doc.featured)
    .map(toCard);
}

/** Destino con página propia en ese idioma (sin respaldo: sin traducción no hay página). */
export function getDestination(slug: string, locale: Locale = DEFAULT_LOCALE) {
  return published(locale).find((doc) => doc.slug === slug);
}

/** Otros destinos de la misma categoría, para la sección "Sigue explorando". */
export function getRelatedDestinationCards(doc: Destination, limit = 3): ArticleCard[] {
  return listed(doc.locale)
    .filter((other) => other.category === doc.category && other.id !== doc.id)
    .slice(0, limit)
    .map(toCard);
}

/** Idiomas en los que existe un destino, con su enlace (para `hreflang`). */
export function getDestinationVersions(id: string) {
  return publishedDestinations
    .filter((doc) => doc.id === id)
    .map((doc) => ({ locale: doc.locale, href: routeTo.destination(doc.slug) }));
}

/** Parámetros de las páginas de detalle: una por idioma en que existe cada documento. */
export function getDestinationStaticParams(): { locale: Locale; slug: string }[] {
  return publishedDestinations.map((doc) => ({ locale: doc.locale, slug: doc.slug }));
}

export function getDestinationSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return published(locale).map((doc) => doc.slug);
}

/** Un registro por destino (agrupado por `id`) con todas sus versiones. */
export function getDestinationsForSitemap() {
  const ids = [...new Set(publishedDestinations.map((doc) => doc.id))];
  return ids.map((id) => {
    const docs = publishedDestinations.filter((doc) => doc.id === id);
    const lastModified = docs
      .map((doc) => doc.updatedAt ?? doc.publishedAt)
      .sort()
      .at(-1);
    return { versions: getDestinationVersions(id), lastModified };
  });
}

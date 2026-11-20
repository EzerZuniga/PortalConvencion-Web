import "server-only";
import type { Image } from "velite";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { SITE_CONFIG } from "@/config/site";

/** Imagen usada cuando un contenido todavía no tiene foto propia. */
export const FALLBACK_IMAGE = SITE_CONFIG.ogImage;

export function imageSrc(image: Image | undefined): string {
  return image?.src ?? FALLBACK_IMAGE;
}

/** Los borradores (`draft: true`) solo se ven en desarrollo. */
export function isPublished(doc: { draft: boolean }): boolean {
  return !doc.draft || process.env.NODE_ENV !== "production";
}

export function newestFirst(a: { publishedAt: string }, b: { publishedAt: string }): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function forLocale<T extends { locale: Locale }>(docs: readonly T[], locale: Locale): T[] {
  return docs.filter((doc) => doc.locale === locale);
}

/**
 * Artículos de un idioma completados, por `id`, con los del idioma por defecto
 * que aún no tienen traducción. Para LISTADOS: así /en/destinations no queda
 * vacío. Cada documento conserva su `locale`, de modo que su enlace apunta a
 * la página que sí existe (la página de detalle no se genera sin traducción).
 */
export function forLocaleWithArticleFallback<T extends { id: string; locale: Locale }>(
  docs: readonly T[],
  locale: Locale,
): T[] {
  const localized = forLocale(docs, locale);
  if (locale === DEFAULT_LOCALE) return localized;
  const translatedIds = new Set(localized.map((doc) => doc.id));
  const fallback = forLocale(docs, DEFAULT_LOCALE).filter((doc) => !translatedIds.has(doc.id));
  return [...localized, ...fallback];
}

/**
 * Para listas sin página propia (platos, galería…): si el idioma aún no tiene
 * traducción se usa el idioma por defecto en lugar de mostrar una lista vacía.
 */
export function forLocaleWithFallback<T extends { locale: Locale }>(
  docs: readonly T[],
  locale: Locale,
): T[] {
  const localized = forLocale(docs, locale);
  return localized.length > 0 ? localized : forLocale(docs, DEFAULT_LOCALE);
}

export function formatReadTime(minutes: number): string {
  return `${Math.max(1, Math.round(minutes))} min`;
}

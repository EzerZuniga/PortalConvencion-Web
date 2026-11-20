/**
 * Idiomas soportados por el sitio.
 *
 * Fuente única de verdad para el enrutado (`@/lib/i18n/routing`), los mensajes
 * de interfaz (`messages/<locale>.json`) y el contenido (Velite).
 */
export const LOCALES = ["es", "en", "pt", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

interface LocaleMeta {
  /** Nombre del idioma en su propio idioma (para el selector). */
  nativeName: string;
  shortLabel: string;
  /** Etiqueta BCP 47 para `<html lang>`, `hreflang` y formateo de fechas. */
  bcp47: string;
  /** Formato de Open Graph (`og:locale`). */
  ogLocale: string;
  /**
   * ¿Se ofrece a los buscadores? Un idioma con textos sin traducir se publica
   * igualmente para los visitantes, pero con `noindex` y fuera de hreflang y
   * del sitemap, para no indexar páginas en otro idioma (contenido duplicado).
   * Usa `npm run i18n:check` para ver qué falta antes de activarlo.
   */
  indexable: boolean;
}

export const LOCALE_META = {
  es: {
    nativeName: "Español",
    shortLabel: "ES",
    bcp47: "es-PE",
    ogLocale: "es_PE",
    indexable: true,
  },
  en: {
    nativeName: "English",
    shortLabel: "EN",
    bcp47: "en-US",
    ogLocale: "en_US",
    indexable: true,
  },
  // Pendientes: ~150 textos siguen en inglés (ver `npm run i18n:check`).
  pt: {
    nativeName: "Português",
    shortLabel: "PT",
    bcp47: "pt-BR",
    ogLocale: "pt_BR",
    indexable: false,
  },
  fr: {
    nativeName: "Français",
    shortLabel: "FR",
    bcp47: "fr-FR",
    ogLocale: "fr_FR",
    indexable: false,
  },
} as const satisfies Record<Locale, LocaleMeta>;

/** Idiomas que se ofrecen a los buscadores (hreflang, sitemap, `index`). */
export const INDEXABLE_LOCALES = LOCALES.filter((locale) => LOCALE_META[locale].indexable);

export function isIndexableLocale(locale: Locale): boolean {
  return LOCALE_META[locale].indexable;
}

/** Zona horaria de referencia para fechas (evita diferencias servidor/cliente). */
export const TIME_ZONE = "America/Lima";

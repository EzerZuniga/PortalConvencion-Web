/**
 * Idiomas soportados por el sitio.
 *
 * Fuente única de verdad para el contenido (Velite) y, desde la Fase 3,
 * para el enrutado por idioma.
 */
export const LOCALES = ["es", "en", "pt", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

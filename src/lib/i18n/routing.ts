import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "@/config/i18n";
import { PATHNAMES } from "@/config/routes";

/**
 * Enrutado por idioma (ADR 0003).
 *
 * - `localePrefix: "always"`: toda URL lleva idioma (`/es/destinos`), así cada
 *   idioma es una URL distinta, indexable y enlazable.
 * - `alternateLinks: false`: los `hreflang` los genera la metadata de cada
 *   página, que sabe en qué idiomas existe realmente (un artículo sin
 *   traducción no debe anunciar alternativas que dan 404).
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  pathnames: PATHNAMES,
  alternateLinks: false,
});

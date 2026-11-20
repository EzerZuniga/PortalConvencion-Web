import "server-only";
import { DEFAULT_LOCALE, isIndexableLocale, type Locale } from "@/config/i18n";
import { type AppHref, getPathname } from "@/lib/i18n/navigation";
import { absoluteUrl } from "@/lib/seo/url";

/** URL absoluta de una ruta interna en un idioma (`/destinations` → `…/es/destinos`). */
export function localizedUrl(locale: Locale, href: AppHref): string {
  return absoluteUrl(getPathname({ locale, href }));
}

/**
 * Mapa `hreflang → URL` para `alternates.languages`.
 * Solo incluye los idiomas en los que la página existe y que son indexables
 * (`LOCALE_META[locale].indexable`), más `x-default` (el idioma por defecto si
 * existe; si no, el primero disponible).
 */
export function languageAlternates(
  versions: readonly { locale: Locale; href: AppHref }[],
): Record<string, string> {
  const indexable = versions.filter((v) => isIndexableLocale(v.locale));
  const languages: Record<string, string> = {};
  for (const { locale, href } of indexable) {
    languages[locale] = localizedUrl(locale, href);
  }
  const fallback = indexable.find((v) => v.locale === DEFAULT_LOCALE) ?? indexable[0];
  if (fallback) languages["x-default"] = localizedUrl(fallback.locale, fallback.href);
  return languages;
}

import type { MetadataRoute } from "next";
import { INDEXABLE_LOCALES, isIndexableLocale, type Locale } from "@/config/i18n";
import { ROUTES, ROUTE_INDEXING, indexableRouteKeys } from "@/config/routes";
import { getPostsForSitemap } from "@/features/blog/queries";
import { getDestinationsForSitemap } from "@/features/destinations/queries";
import type { AppHref } from "@/lib/i18n/navigation";
import { languageAlternates, localizedUrl } from "@/lib/seo/localized";

type SitemapEntry = MetadataRoute.Sitemap[number];
type Version = { locale: Locale; href: AppHref };

/**
 * Una entrada por página e idioma indexable, cada una con sus alternativas
 * `hreflang` (solo hacia los idiomas en los que esa página existe).
 */
function entriesFor(
  versions: readonly Version[],
  options: Pick<SitemapEntry, "lastModified" | "changeFrequency" | "priority">,
): SitemapEntry[] {
  const languages = languageAlternates(versions);
  return versions
    .filter(({ locale }) => isIndexableLocale(locale))
    .map(({ locale, href }) => ({
      url: localizedUrl(locale, href),
      ...options,
      alternates: { languages },
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = indexableRouteKeys.flatMap((key) =>
    entriesFor(
      INDEXABLE_LOCALES.map((locale) => ({ locale, href: ROUTES[key] })),
      {
        lastModified: now,
        changeFrequency: ROUTE_INDEXING[key].changeFrequency,
        priority: ROUTE_INDEXING[key].priority,
      },
    ),
  );

  const destinationPages = getDestinationsForSitemap().flatMap(({ versions, lastModified }) =>
    entriesFor(versions, {
      lastModified: lastModified ? new Date(lastModified) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const postPages = getPostsForSitemap().flatMap(({ versions, lastModified }) =>
    entriesFor(versions, {
      lastModified: lastModified ? new Date(lastModified) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...destinationPages, ...postPages];
}

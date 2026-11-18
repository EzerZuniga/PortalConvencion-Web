import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE } from "@/config/i18n";
import { ROUTES, ROUTE_INDEXING, indexableRouteKeys, routeTo } from "@/config/routes";
import { getPostsForSitemap } from "@/features/blog/queries";
import { getDestinationsForSitemap } from "@/features/destinations/queries";
import { absoluteUrl } from "@/lib/seo/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = indexableRouteKeys.map((key) => ({
    url: absoluteUrl(ROUTES[key]),
    lastModified: now,
    changeFrequency: ROUTE_INDEXING[key].changeFrequency,
    priority: ROUTE_INDEXING[key].priority,
  }));

  // TODO(fase-3): incluir todos los idiomas con alternates (hreflang).
  const destinationPages = getDestinationsForSitemap()
    .filter((doc) => doc.locale === DEFAULT_LOCALE)
    .map((doc) => ({
      url: absoluteUrl(routeTo.destination(doc.slug)),
      lastModified: new Date(doc.lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const postPages = getPostsForSitemap()
    .filter((doc) => doc.locale === DEFAULT_LOCALE)
    .map((doc) => ({
      url: absoluteUrl(routeTo.blogPost(doc.slug)),
      lastModified: new Date(doc.lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...destinationPages, ...postPages];
}

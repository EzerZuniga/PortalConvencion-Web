import type { MetadataRoute } from "next";
import { ROUTES, ROUTE_INDEXING, indexableRouteKeys } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRouteKeys.map((key) => ({
    url: absoluteUrl(ROUTES[key]),
    lastModified,
    changeFrequency: ROUTE_INDEXING[key].changeFrequency,
    priority: ROUTE_INDEXING[key].priority,
  }));
}

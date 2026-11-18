import type { MetadataRoute } from "next";
import { NON_INDEXABLE_ROUTES } from "@/config/routes";
import { absoluteUrl } from "@/lib/seo/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", ...NON_INDEXABLE_ROUTES],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

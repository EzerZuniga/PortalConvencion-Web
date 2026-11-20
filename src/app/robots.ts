import type { MetadataRoute } from "next";
import { LOCALES } from "@/config/i18n";
import { NON_INDEXABLE_ROUTES } from "@/config/routes";
import { getPathname } from "@/lib/i18n/navigation";
import { absoluteUrl } from "@/lib/seo/url";

export default function robots(): MetadataRoute.Robots {
  // URLs públicas de las rutas privadas en cada idioma (/es/perfil, /en/profile…).
  const privatePaths = NON_INDEXABLE_ROUTES.flatMap((href) =>
    LOCALES.map((locale) => getPathname({ locale, href })),
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", ...new Set(privatePaths)],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

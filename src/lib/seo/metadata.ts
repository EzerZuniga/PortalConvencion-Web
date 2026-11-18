import type { Metadata } from "next";
import { ROUTES, type RouteKey } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { PAGE_SEO, type PageSeo } from "@/lib/seo/pages";
import { absoluteUrl } from "@/lib/seo/url";

function buildTitle(route: RouteKey, seo: PageSeo): string {
  return route === "home" ? SITE_CONFIG.defaultTitle : `${seo.title} | ${SITE_CONFIG.name}`;
}

/** Metadata completa (canonical, robots, Open Graph, Twitter) para una ruta. */
export function createPageMetadata(route: RouteKey): Metadata {
  const seo: PageSeo = PAGE_SEO[route];
  const title = buildTitle(route, seo);
  const url = absoluteUrl(ROUTES[route]);
  const image = absoluteUrl(SITE_CONFIG.ogImage);

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    alternates: { canonical: url },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description: seo.description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: SITE_CONFIG.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.social.twitter,
      title,
      description: seo.description,
      images: [image],
    },
  };
}

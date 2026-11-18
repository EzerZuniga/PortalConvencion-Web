import type { Metadata } from "next";
import { ROUTES, type RouteKey } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { PAGE_SEO, type PageSeo } from "@/lib/seo/pages";
import { absoluteUrl } from "@/lib/seo/url";

const INDEXABLE_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const NO_INDEX_ROBOTS: Metadata["robots"] = { index: false, follow: false };

function withSiteName(title: string): string {
  return `${title} | ${SITE_CONFIG.name}`;
}

/** Metadata completa (canonical, robots, Open Graph, Twitter) para una ruta estática. */
export function createPageMetadata(route: RouteKey): Metadata {
  const seo: PageSeo = PAGE_SEO[route];
  const title = route === "home" ? SITE_CONFIG.defaultTitle : withSiteName(seo.title);
  const url = absoluteUrl(ROUTES[route]);
  const image = absoluteUrl(SITE_CONFIG.ogImage);

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    alternates: { canonical: url },
    robots: seo.noIndex ? NO_INDEX_ROBOTS : INDEXABLE_ROBOTS,
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

export interface ArticleSeo {
  title: string;
  description: string;
  /** Ruta relativa de la página (`/destinations/siete-tinajas`). */
  path: string;
  /** Ruta relativa de la imagen de portada. */
  image: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  section: string;
}

/** Metadata para páginas de detalle (`og:type = article`). */
export function createArticleMetadata(article: ArticleSeo): Metadata {
  const title = withSiteName(article.title);
  const url = absoluteUrl(article.path);
  const image = absoluteUrl(article.image);

  return {
    title,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    robots: INDEXABLE_ROBOTS,
    openGraph: {
      title,
      description: article.description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      section: article.section,
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.social.twitter,
      title,
      description: article.description,
      images: [image],
    },
  };
}

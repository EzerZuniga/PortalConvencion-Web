import "server-only";
import type { Metadata } from "next";
import { INDEXABLE_LOCALES, isIndexableLocale, LOCALE_META, type Locale } from "@/config/i18n";
import { ROUTES, type RouteKey } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import type { AppHref } from "@/lib/i18n/navigation";
import { languageAlternates, localizedUrl } from "@/lib/seo/localized";
import { pageSeo } from "@/lib/seo/pages";
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

/** Idioma aún sin traducir: visible para visitantes, no para buscadores. */
const UNTRANSLATED_ROBOTS: Metadata["robots"] = { index: false, follow: true };

function robotsFor(locale: Locale, noIndex = false): Metadata["robots"] {
  if (noIndex) return NO_INDEX_ROBOTS;
  return isIndexableLocale(locale) ? INDEXABLE_ROBOTS : UNTRANSLATED_ROBOTS;
}

function withSiteName(title: string): string {
  return `${title} | ${SITE_CONFIG.name}`;
}

function openGraphLocales(locale: Locale, available: readonly Locale[]) {
  return {
    locale: LOCALE_META[locale].ogLocale,
    alternateLocale: available.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
  };
}

/** Metadata completa (canonical, hreflang, robots, Open Graph, Twitter) de una ruta estática. */
export function createPageMetadata(route: RouteKey, locale: Locale): Metadata {
  const seo = pageSeo(route, locale);
  const title = route === "home" ? seo.title : withSiteName(seo.title);
  const href = ROUTES[route];
  const url = localizedUrl(locale, href);
  const image = absoluteUrl(SITE_CONFIG.ogImage);

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    alternates: {
      canonical: url,
      languages: seo.noIndex
        ? undefined
        : languageAlternates(INDEXABLE_LOCALES.map((l) => ({ locale: l, href }))),
    },
    robots: robotsFor(locale, seo.noIndex),
    openGraph: {
      title,
      description: seo.description,
      url,
      siteName: SITE_CONFIG.name,
      ...openGraphLocales(locale, INDEXABLE_LOCALES),
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
  locale: Locale;
  title: string;
  description: string;
  href: AppHref;
  /** Versiones existentes del artículo en cada idioma (incluida la actual). */
  versions: readonly { locale: Locale; href: AppHref }[];
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
  const url = localizedUrl(article.locale, article.href);
  const image = absoluteUrl(article.image);

  return {
    title,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: { canonical: url, languages: languageAlternates(article.versions) },
    robots: robotsFor(article.locale),
    openGraph: {
      title,
      description: article.description,
      url,
      siteName: SITE_CONFIG.name,
      ...openGraphLocales(
        article.locale,
        article.versions.map((v) => v.locale),
      ),
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

import "server-only";
import type { Locale } from "@/config/i18n";
import { NON_INDEXABLE_ROUTES, ROUTES, type RouteKey } from "@/config/routes";
import { type Messages, messagesFor } from "@/lib/i18n/messages";

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string;
  noIndex: boolean;
}

type SeoSource = Pick<PageSeo, "title" | "description" | "keywords">;

function fromPage(page: { seoTitle: string; seoDescription: string; seoKeywords: string }) {
  return { title: page.seoTitle, description: page.seoDescription, keywords: page.seoKeywords };
}

/**
 * De dónde sale el SEO de cada ruta en los mensajes del idioma.
 * `satisfies Record<RouteKey, …>` obliga a declararlo para cada ruta nueva.
 */
const SEO_SOURCE = {
  home: ({ pages }) => pages.home.seo,
  about: ({ pages }) => fromPage(pages.about),
  destinations: ({ pages }) => fromPage(pages.destinations),
  gastronomy: ({ pages }) => fromPage(pages.gastronomy),
  blog: ({ pages }) => fromPage(pages.blog),
  gallery: ({ pages }) => fromPage(pages.gallery),
  tips: ({ pages }) => fromPage(pages.tips),
  contact: ({ pages }) => fromPage(pages.contact),
  privacy: ({ seo }) => seo.privacy,
  terms: ({ seo }) => seo.terms,
  login: ({ seo }) => seo.login,
  profile: ({ seo }) => seo.profile,
} satisfies Record<RouteKey, (messages: Messages) => SeoSource>;

const NO_INDEX = new Set<string>(NON_INDEXABLE_ROUTES);

/** Título, descripción y palabras clave de una ruta en un idioma. */
export function pageSeo(route: RouteKey, locale: Locale): PageSeo {
  const source: SeoSource = SEO_SOURCE[route](messagesFor(locale));
  return { ...source, noIndex: NO_INDEX.has(ROUTES[route]) };
}

/** Nombre corto de una ruta (el del menú) en un idioma, para migas de pan. */
export function routeLabel(route: RouteKey, locale: Locale): string {
  const { main, footerInfo } = messagesFor(locale).navigation;
  const item = [...main, ...footerInfo].find((nav) => nav.route === route);
  return item?.name ?? pageSeo(route, locale).title;
}

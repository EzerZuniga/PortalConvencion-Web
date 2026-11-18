import type { RouteKey } from "@/config/routes";
import { translations } from "@/features/i18n/translations";

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
}

const es = translations.es.pages;

/**
 * SEO por página. `satisfies Record<RouteKey, …>` obliga a declarar el SEO de
 * cada ruta nueva: si falta una, TypeScript falla.
 *
 * TODO(fase-3): resolver por locale cuando las rutas sean `[locale]/…`.
 */
export const PAGE_SEO = {
  home: {
    title: es.home.seo.title,
    description: es.home.seo.description,
    keywords: es.home.seo.keywords,
  },
  about: {
    title: es.about.seoTitle,
    description: es.about.seoDescription,
    keywords: es.about.seoKeywords,
  },
  destinations: {
    title: es.destinations.seoTitle,
    description: es.destinations.seoDescription,
    keywords: es.destinations.seoKeywords,
  },
  gastronomy: {
    title: es.gastronomy.seoTitle,
    description: es.gastronomy.seoDescription,
    keywords: es.gastronomy.seoKeywords,
  },
  blog: {
    title: es.blog.seoTitle,
    description: es.blog.seoDescription,
    keywords: es.blog.seoKeywords,
  },
  gallery: {
    title: es.gallery.seoTitle,
    description: es.gallery.seoDescription,
    keywords: es.gallery.seoKeywords,
  },
  tips: {
    title: es.tips.seoTitle,
    description: es.tips.seoDescription,
    keywords: es.tips.seoKeywords,
  },
  contact: {
    title: es.contact.seoTitle,
    description: es.contact.seoDescription,
    keywords: es.contact.seoKeywords,
  },
  privacy: {
    title: "Política de Privacidad",
    description:
      "Política de privacidad y protección de datos personales de Explorando La Convención.",
  },
  terms: {
    title: "Términos y Condiciones",
    description: "Términos y condiciones de uso del portal Explorando La Convención.",
  },
  login: {
    title: "Iniciar sesión",
    description:
      "Accede a tu cuenta para guardar destinos favoritos, crear rutas personalizadas y explorar La Convención al máximo.",
    noIndex: true,
  },
  profile: {
    title: "Mi Perfil",
    description: "Gestiona tu perfil y configuración de cuenta en Explorando la Convención.",
    noIndex: true,
  },
} as const satisfies Record<RouteKey, PageSeo>;

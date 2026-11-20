import type { MetadataRoute } from "next";
import type { Locale } from "@/config/i18n";

/**
 * Fuente única de verdad de las rutas del sitio.
 *
 * - `ROUTES`: rutas **internas** (nombres de carpeta en `app/[locale]/`). Son las
 *   que se usan en el código: `<Link href={ROUTES.destinations}>`.
 * - `PATHNAMES`: cómo se ve cada ruta interna en la URL de cada idioma
 *   (`/destinations` → `/es/destinos`, `/en/destinations`…).
 *
 * Para añadir una sección: declárala en `ROUTES` y `PATHNAMES`, y si es
 * indexable en `ROUTE_INDEXING`. TypeScript señalará lo que falte.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  destinations: "/destinations",
  gastronomy: "/gastronomy",
  blog: "/blog",
  gallery: "/gallery",
  tips: "/tips",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  login: "/login",
  profile: "/profile",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

const DYNAMIC_ROUTES = {
  destination: "/destinations/[slug]",
  blogPost: "/blog/[slug]",
} as const;

type LocalizedPath = string | Record<Locale, string>;

/** URL pública de cada ruta interna, por idioma (las URLs base están en español). */
export const PATHNAMES = {
  [ROUTES.home]: "/",
  [ROUTES.about]: { es: "/nosotros", en: "/about", pt: "/sobre", fr: "/a-propos" },
  [ROUTES.destinations]: {
    es: "/destinos",
    en: "/destinations",
    pt: "/destinos",
    fr: "/destinations",
  },
  [DYNAMIC_ROUTES.destination]: {
    es: "/destinos/[slug]",
    en: "/destinations/[slug]",
    pt: "/destinos/[slug]",
    fr: "/destinations/[slug]",
  },
  [ROUTES.gastronomy]: {
    es: "/gastronomia",
    en: "/gastronomy",
    pt: "/gastronomia",
    fr: "/gastronomie",
  },
  [ROUTES.blog]: "/blog",
  [DYNAMIC_ROUTES.blogPost]: "/blog/[slug]",
  [ROUTES.gallery]: { es: "/galeria", en: "/gallery", pt: "/galeria", fr: "/galerie" },
  [ROUTES.tips]: { es: "/consejos", en: "/tips", pt: "/dicas", fr: "/conseils" },
  [ROUTES.contact]: { es: "/contacto", en: "/contact", pt: "/contato", fr: "/contact" },
  [ROUTES.privacy]: {
    es: "/privacidad",
    en: "/privacy",
    pt: "/privacidade",
    fr: "/confidentialite",
  },
  [ROUTES.terms]: { es: "/terminos", en: "/terms", pt: "/termos", fr: "/conditions" },
  [ROUTES.login]: "/login",
  [ROUTES.profile]: { es: "/perfil", en: "/profile", pt: "/perfil", fr: "/profil" },
} as const satisfies Record<
  RoutePath | (typeof DYNAMIC_ROUTES)[keyof typeof DYNAMIC_ROUTES],
  LocalizedPath
>;

/** Enlaces tipados a páginas de detalle (válidos como `href` de `<Link>`). */
export const routeTo = {
  destination: (slug: string) => ({ pathname: DYNAMIC_ROUTES.destination, params: { slug } }),
  blogPost: (slug: string) => ({ pathname: DYNAMIC_ROUTES.blogPost, params: { slug } }),
} as const;

export type DetailHref = ReturnType<(typeof routeTo)[keyof typeof routeTo]>;

/** Valida claves de ruta que llegan como texto (p. ej. desde `messages/*.json`). */
export function isRouteKey(value: string): value is RouteKey {
  return Object.hasOwn(ROUTES, value);
}

/** Ruta interna a partir de una clave en texto; las claves inválidas van a la home. */
export function routeHref(route: string): RoutePath {
  return isRouteKey(route) ? ROUTES[route] : ROUTES.home;
}

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface RouteIndexing {
  priority: number;
  changeFrequency: ChangeFrequency;
}

/** Rutas públicas indexables y su configuración para el sitemap. */
export const ROUTE_INDEXING = {
  home: { priority: 1, changeFrequency: "daily" },
  blog: { priority: 0.9, changeFrequency: "weekly" },
  destinations: { priority: 0.9, changeFrequency: "weekly" },
  gastronomy: { priority: 0.8, changeFrequency: "weekly" },
  tips: { priority: 0.8, changeFrequency: "weekly" },
  gallery: { priority: 0.7, changeFrequency: "monthly" },
  about: { priority: 0.6, changeFrequency: "monthly" },
  contact: { priority: 0.5, changeFrequency: "yearly" },
  privacy: { priority: 0.2, changeFrequency: "yearly" },
  terms: { priority: 0.2, changeFrequency: "yearly" },
} as const satisfies Partial<Record<RouteKey, RouteIndexing>>;

export type IndexableRouteKey = keyof typeof ROUTE_INDEXING;

export const indexableRouteKeys = Object.keys(ROUTE_INDEXING) as IndexableRouteKey[];

/** Rutas internas que requieren sesión (el proxy las protege en todos los idiomas). */
export const PROTECTED_ROUTES = [ROUTES.profile] as const satisfies readonly RoutePath[];

/** Rutas internas que nunca deben indexarse. */
export const NON_INDEXABLE_ROUTES = [
  ROUTES.login,
  ...PROTECTED_ROUTES,
] as const satisfies readonly RoutePath[];

/**
 * Redirecciones permanentes de las URLs antiguas (sin idioma) a las nuevas.
 * Conservan el posicionamiento ya ganado. Se aplican en `next.config.ts`.
 */
export const LEGACY_REDIRECTS = [
  { source: "/about", destination: "/es/nosotros" },
  { source: "/destinations", destination: "/es/destinos" },
  { source: "/destinations/:slug", destination: "/es/destinos/:slug" },
  { source: "/gastronomia", destination: "/es/gastronomia" },
  { source: "/blog", destination: "/es/blog" },
  { source: "/blog/:slug", destination: "/es/blog/:slug" },
  { source: "/gallery", destination: "/es/galeria" },
  { source: "/tips", destination: "/es/consejos" },
  { source: "/contact", destination: "/es/contacto" },
  { source: "/privacy", destination: "/es/privacidad" },
  { source: "/terms", destination: "/es/terminos" },
  { source: "/login", destination: "/es/login" },
  { source: "/profile", destination: "/es/perfil" },
] as const;

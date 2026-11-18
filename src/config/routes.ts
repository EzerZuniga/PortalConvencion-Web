import type { MetadataRoute } from "next";

/**
 * Fuente única de verdad de las rutas del sitio.
 *
 * Navegación, metadata SEO, sitemap y robots derivan de aquí.
 * Para añadir una sección nueva: declárala en `ROUTES` y, si es indexable,
 * en `ROUTE_INDEXING`. TypeScript señalará cualquier otro punto pendiente.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  destinations: "/destinations",
  gastronomy: "/gastronomia",
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

/**
 * Rutas que requieren sesión.
 * Nota: el `matcher` de `src/proxy.ts` debe ser un literal estático (Next lo
 * analiza en build), por lo que se mantiene sincronizado con esta lista
 * mediante un test unitario.
 */
export const PROTECTED_ROUTES = [ROUTES.profile] as const satisfies readonly RoutePath[];

/** Rutas que nunca deben indexarse ni rastrearse. */
export const NON_INDEXABLE_ROUTES = [
  ROUTES.login,
  ...PROTECTED_ROUTES,
] as const satisfies readonly RoutePath[];

export const indexableRouteKeys = Object.keys(ROUTE_INDEXING) as IndexableRouteKey[];

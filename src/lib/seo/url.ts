import { env } from "@/config/env";

const LOCAL_URL = "http://localhost:3000";

/**
 * URL pública canónica del sitio, sin barra final.
 *
 * Prioridad: NEXT_PUBLIC_SITE_URL → dominio de producción de Vercel → localhost.
 * Solo para uso en servidor (metadata, sitemap, robots, JSON-LD).
 */
export function getSiteUrl(): string {
  const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;

  return (env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? LOCAL_URL).replace(/\/+$/, "");
}

/** Convierte una ruta relativa (`/blog`) en URL absoluta. */
export function absoluteUrl(path: string): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

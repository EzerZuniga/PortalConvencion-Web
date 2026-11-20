import { createNavigation } from "next-intl/navigation";
import { routing } from "@/lib/i18n/routing";

/**
 * Navegación consciente del idioma. Usar SIEMPRE estos en lugar de `next/link`
 * y `next/navigation` (regla de ESLint): traducen la ruta interna
 * (`/destinations`) a la URL del idioma activo (`/es/destinos`).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export type AppHref = Parameters<typeof getPathname>[0]["href"];

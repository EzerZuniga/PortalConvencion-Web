/**
 * Proxy (antes "middleware") — Next.js 16.
 *
 * 1. Rutas privadas sin sesión → redirige al login del mismo idioma.
 *    Es una comprobación optimista: la autorización real se repite junto a los
 *    datos (página, Server Action o capa de datos).
 * 2. Todo lo demás → enrutado por idioma de next-intl (detección del idioma en
 *    la primera visita, prefijo `/es`, URLs traducidas).
 *
 * La sesión se consulta SOLO en rutas privadas, y next-intl recibe siempre la
 * petición original: el envoltorio `auth()` reescribe el origen de la URL con
 * `AUTH_URL`, y las reescrituras de next-intl (`/es/destinos` → `/es/destinations`)
 * acabarían apuntando a otro host.
 */
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { ROUTES } from "@/config/routes";
import { checkSession } from "@/lib/auth/session-check";
import { getPathname } from "@/lib/i18n/navigation";
import { isProtectedPathname, localeFromPathname } from "@/lib/i18n/paths";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

function redirectToLogin(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = localeFromPathname(pathname);
  const loginUrl = new URL(getPathname({ locale, href: ROUTES.login }), request.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  if (isProtectedPathname(request.nextUrl.pathname)) {
    const response = await checkSession(request, event);
    if (response?.status === 401) return redirectToLogin(request);
  }

  return intlMiddleware(request);
}

export const config = {
  // Todo excepto API, internos de Next/Vercel, assets procesados y archivos con extensión.
  matcher: ["/((?!api|_next|_vercel|static|.*[.].*).*)"],
};

/**
 * Proxy (antes "middleware") — Next.js 16.
 *
 * Responsabilidad actual: comprobación optimista de sesión en rutas privadas.
 * El callback `authorized` de `src/lib/auth/config.ts` redirige a /login si no
 * hay sesión.
 *
 * IMPORTANTE: esto es solo una primera barrera. La autorización real debe
 * hacerse también junto a los datos (página, Server Action o capa de datos),
 * porque el proxy no es un mecanismo de seguridad completo.
 */
export { auth as proxy } from "@/lib/auth/config";

export const config = {
  // Debe ser un literal estático (Next lo analiza en build).
  // Se mantiene sincronizado con PROTECTED_ROUTES mediante un test unitario.
  matcher: ["/profile/:path*"],
};

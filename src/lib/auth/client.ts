"use client";

/**
 * Punto de entrada único de auth para Client Components.
 * Ningún módulo fuera de `src/lib/auth` debe importar `next-auth` directamente:
 * así el proveedor de auth puede reemplazarse tocando solo esta carpeta.
 */
export { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

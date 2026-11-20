import type { NextAuthRequest } from "next-auth";
import { type NextFetchEvent, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";

/**
 * Comprobación de sesión para el proxy. Solo informa: responde 401 si no hay
 * sesión y nada si la hay. La redirección la construye el proxy con la URL
 * original (este envoltorio reescribe el origen de la petición con AUTH_URL).
 */
export const checkSession = auth((request: NextAuthRequest, _event: NextFetchEvent) =>
  request.auth ? undefined : new NextResponse(null, { status: 401 }),
);

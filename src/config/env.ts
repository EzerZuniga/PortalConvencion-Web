import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Variables de entorno validadas y tipadas.
 *
 * - Se valida al arrancar y en `next build` (importado desde next.config.ts):
 *   una variable mal configurada rompe el build, no producción.
 * - Usa siempre `env.X` en lugar de `process.env.X`.
 * - Las variables `server` lanzan error si se leen desde el navegador.
 * - `SKIP_ENV_VALIDATION=1` desactiva la validación (útil en lint/CI).
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // ── Auth.js ────────────────────────────────────────────────────────────
    // Obligatorio en producción. Generar con: openssl rand -base64 32
    AUTH_SECRET:
      process.env.NODE_ENV === "production" ? z.string().min(1) : z.string().min(1).optional(),
    AUTH_URL: z.url().optional(),
    AUTH_GOOGLE_ID: z.string().min(1).optional(),
    AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
    AUTH_APPLE_ID: z.string().min(1).optional(),
    AUTH_APPLE_SECRET: z.string().min(1).optional(),

    // ── Vercel (variables de sistema, inyectadas automáticamente) ─────────
    VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1).optional(),
  },

  client: {
    // URL canónica pública. En Vercel, si no se define, se usa el dominio de producción.
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().min(1).optional(),
  },

  // Next.js solo inlinea las variables accedidas explícitamente.
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

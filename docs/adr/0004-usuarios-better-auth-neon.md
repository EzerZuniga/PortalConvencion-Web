# ADR 0004 — Usuarios: Better Auth + Neon Postgres + Drizzle

- **Estado:** Aceptado (implementación en Fases 4 y 5)
- **Fecha:** 2026-11-17

## Contexto

Los usuarios podrán iniciar sesión (Google, Microsoft, Apple…) para guardar
lugares y comentar. Hoy se usa Auth.js v5, que sigue en beta y cuyo
mantenimiento pasó al equipo de Better Auth. Presupuesto $0.

## Decisión

- **Better Auth** como librería de autenticación (estable, tipada).
- **Neon Postgres** (plan gratuito, integrado con Vercel) + **Drizzle ORM** con
  migraciones versionadas.
- Proveedores iniciales: Google y Microsoft (gratuitos). Apple se pospone
  (requiere Apple Developer Program, $99/año).
- Capa de acceso a datos en `src/server/data` (`server-only`) que verifica la
  sesión y los permisos en cada operación.
- Comentarios en texto plano, con moderación, reportes, borrado lógico y
  rate limiting (Upstash Redis, plan gratuito).
- Exportación y eliminación de cuenta (GDPR).

## Consecuencias

- El cambio de librería afecta solo a `src/lib/auth` (frontera ya establecida
  y protegida por ESLint en la Fase 1).

## Alternativas descartadas

- **Supabase (free):** pausa los proyectos tras una semana sin actividad.
- **Prisma:** válido, pero más pesado en serverless que Drizzle.
- **Clerk:** servicio de pago al crecer y dependencia de proveedor.

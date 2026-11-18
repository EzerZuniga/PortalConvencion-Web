# ADR 0001 — Fundaciones: Next.js 16 y tooling de calidad

- **Estado:** Aceptado
- **Fecha:** 2026-11-17

## Contexto

El proyecto usaba Next.js 15 con un `middleware.ts` en la raíz que **no se
ejecutaba** (con `src/app`, Next solo lo detecta dentro de `src/`), ESLint 8 con
configuración legacy, ningún test, ningún CI y código muerto duplicado.

## Decisión

- Next.js 16 + React 19.2+. El middleware pasa a `src/proxy.ts` (nuevo nombre en v16).
- ESLint 9 con flat config, Prettier (con orden de clases Tailwind) y Knip para
  detectar código muerto.
- Vitest para tests unitarios, colocados junto al código.
- Husky + lint-staged + commitlint (Conventional Commits).
- GitHub Actions como puerta de calidad para cada PR.
- Variables de entorno validadas con zod (`@t3-oss/env-nextjs`).
- Fuente única de rutas (`src/config/routes.ts`).

## Consecuencias

- Los errores de configuración aparecen en build, no en producción.
- La protección de `/profile` en el proxy ahora funciona de verdad.
- Ningún cambio llega a `main` sin pasar format, lint, tipos, knip, tests y build.
- Las vulnerabilidades de `npm audit` que quedan están en herramientas de
  build/desarrollo (cadena de `picomatch`) y desaparecen al migrar a Tailwind 4.

## Alternativas descartadas

- **TypeScript 7 (nativo):** aún sin soporte completo en el ecosistema; se fija 5.9.
- **Biome en lugar de ESLint + Prettier:** sin las reglas de Next/React Hooks.

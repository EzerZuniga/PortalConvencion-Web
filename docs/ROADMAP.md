# Roadmap de arquitectura

Plan de evolución del portal hacia una arquitectura mantenible y escalable.
Cada fase se entrega en su propia rama, con commits pequeños, y no se empieza
la siguiente hasta validar la anterior.

> Restricciones del proyecto: coste $0 (Vercel Hobby + planes gratuitos),
> contenido publicado por una sola persona, audiencia internacional (es/en/pt)
> con SEO por idioma, URLs base en español.

---

## Fase 1 — Fundaciones ✅ completada

Objetivo: dejar el proyecto sobre una base moderna, verificada automáticamente
y sin código muerto, antes de mover contenido o rutas.

- [x] Actualizar a Next.js 16 + React 19.2 (`middleware.ts` → `src/proxy.ts`).
- [x] ESLint 9 con flat config (`eslint.config.mjs`), eliminar `.eslintignore`.
- [x] Prettier aplicado a todo el código + scripts `format` / `format:check`.
- [x] Git hooks: Husky + lint-staged + commitlint (Conventional Commits).
- [x] CI en GitHub Actions: format → lint → typecheck → test → build.
- [x] Variables de entorno validadas con zod (`src/config/env.ts`).
- [x] Vitest configurado con primeros tests unitarios.
- [x] Fuente única de verdad para rutas (`src/config/routes.ts`) usada por
      navegación, SEO, sitemap y proxy.
- [x] Eliminar código muerto (datos duplicados, barrels sin uso, hooks sin uso).
- [x] `tsconfig` endurecido, `.nvmrc`, `engines`, `.env.example` actualizado.
- [x] Documentación: README real, `docs/ARCHITECTURE.md`, ADRs.

Hallazgos corregidos durante la fase:

- El middleware nunca se ejecutaba (estaba fuera de `src/`).
- Enlace roto `/contacto` en la página Nuestro Equipo.
- `robots.txt` bloqueaba `/_next/static/` (impide a Google renderizar la página).
- Antipatrones de React (setState síncrono en efectos, refs escritas en render).
- 14 archivos y 2 dependencias sin uso eliminados (detectados con Knip).

## Fase 2 — Capa de contenido (MDX)

Objetivo: sacar el contenido editorial del código TypeScript.

- [ ] Velite + MDX con esquemas zod tipados en `content/`.
- [ ] Identificador estable `id` separado del `slug` (la BD referencia `id`).
- [ ] Migrar destinos, blog, gastronomía, galería y tips desde `translations.ts`.
- [ ] Rutas de detalle `[slug]` con `generateStaticParams` + `generateMetadata`.
- [ ] JSON-LD por tipo (`Article`, `TouristAttraction`, `Restaurant`).
- [ ] Imágenes junto al contenido, comprimidas (WebP/AVIF); corregir las
      16 rutas de imagen rotas actuales.
- [ ] Reorganizar `src/views` → `src/features/<dominio>` (Server Components).
- [ ] Activar `noUncheckedIndexedAccess` en tsconfig (hoy da 22 errores, casi todos
      en `translations.ts`, que esta fase elimina).
- [ ] Iconos de tips en el frontmatter (hoy dependen del nombre en español y
      no aparecen en en/pt).

## Fase 3 — Internacionalización con SEO

- [ ] `next-intl` con rutas `app/[locale]/...` y `pathnames` traducidos
      (`/es/destinos`, `/en/destinations`, `/pt/destinos`).
- [ ] `messages/{es,en,pt}.json` solo para textos de UI.
- [ ] Diccionarios cargados en servidor; `"use client"` solo en islas interactivas.
- [ ] `hreflang` + `x-default`, sitemap multilenguaje, detección por
      `Accept-Language` en la primera visita.
- [ ] Sin traducción → sin página (evitar contenido duplicado).

## Fase 4 — Usuarios (auth + base de datos)

- [ ] Neon Postgres (free) + Drizzle ORM + migraciones versionadas.
- [ ] Better Auth reemplaza NextAuth beta. Proveedores: Google, Microsoft
      (Apple pospuesto: requiere cuenta Apple Developer de $99/año).
- [ ] Capa de acceso a datos (`src/server/data`, `server-only`) con
      autorización en cada consulta (no confiar solo en el proxy).
- [ ] Página de cuenta: perfil, exportar datos, eliminar cuenta (GDPR).

## Fase 5 — Interacción (favoritos y comentarios)

- [ ] Guardar lugares (`saved_place`, único por usuario + contenido).
- [ ] Comentarios con moderación (`pending/approved/rejected`), respuestas,
      reportes y borrado lógico.
- [ ] Server Actions validadas con zod, texto plano (sin HTML), rate limiting
      con Upstash Redis (free).
- [ ] Páginas estáticas + islas dinámicas; `revalidateTag` por artículo.

## Fase 6 — Calidad y observabilidad

- [ ] Tests de capa de datos (Vitest) y E2E (Playwright): login, guardar, comentar.
- [ ] Vercel Analytics / Speed Insights (plan gratuito).
- [ ] Presupuestos de rendimiento y Lighthouse CI.

## Backlog (fuera de alcance por ahora)

- Tailwind CSS 4 (se hará junto con el trabajo de UI/UX).
- Dominio propio (~$10/año): mayor autoridad SEO que `*.vercel.app`.
- Apple Sign-In.

# Roadmap de arquitectura

Plan de evolución del portal hacia una arquitectura mantenible y escalable.
Cada fase se entrega en su propia rama, con commits pequeños, y no se empieza
la siguiente hasta validar la anterior.

> Restricciones del proyecto: coste $0 (Vercel Hobby + planes gratuitos),
> contenido publicado por una sola persona, audiencia internacional
> con SEO por idioma (es/en/pt/fr), URLs base en español.

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

## Fase 2 — Capa de contenido (MDX) ✅ completada

Objetivo: sacar el contenido editorial del código TypeScript.

- [x] Velite + MDX con esquemas tipados en `content/` (guía en [CONTENT.md](CONTENT.md)).
- [x] Identificador estable `id` (carpeta) separado del `slug` (URL).
- [x] Migrar destinos (50), blog (6), platos, restaurantes, galería, tips y
      equipo desde `translations.ts` (−750 líneas; ahora solo textos de UI).
- [x] Rutas de detalle `/destinations/[slug]` y `/blog/[slug]`, estáticas,
      con `generateStaticParams`, `generateMetadata` y `dynamicParams = false`.
- [x] JSON-LD por tipo (`TouristAttraction`, `Article`, `BlogPosting`) y
      `BreadcrumbList`. Sitemap con las 56 páginas de detalle.
- [x] Imágenes junto al contenido, optimizadas en build (equipo migrado). Las
      16 rutas rotas se sustituyen por una imagen de respaldo.
- [x] `src/views` → `src/features/<dominio>/components` + `queries.ts`.
- [x] `noUncheckedIndexedAccess` activado.
- [x] Iconos de tips en el contenido.

Hallazgos corregidos durante la fase:

- Las 56 tarjetas de Destinos y Blog enlazaban a `/post/{id}`, ruta inexistente (404).
- El filtro de categorías comparaba etiquetas traducidas: ahora usa claves.
- El cuerpo de los artículos ya no viaja al navegador (se renderiza en servidor).

Pendiente (requiere material del autor):

- [ ] Fotos reales para destinos, blog, platos, restaurantes y galería.
- [ ] Texto completo de los 6 posts del blog (hoy el cuerpo es el resumen).

Movido a la Fase 3:

- Convertir las vistas en Server Components: depende de tener i18n en servidor.

## Fase 3 — Internacionalización con SEO

- [ ] `next-intl` con rutas `app/[locale]/...` y `pathnames` traducidos
      (`/es/destinos`, `/en/destinations`, `/pt/destinos`, `/fr/destinations`).
- [ ] `messages/{es,en,pt,fr}.json` solo para textos de UI.
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

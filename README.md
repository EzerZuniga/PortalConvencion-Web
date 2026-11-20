# Explorando la Convención

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge)

Portal web informativo sobre turismo, cultura y gastronomía de la provincia de
La Convención (Cusco, Perú), dirigido a una audiencia internacional.

> **Estado:** el proyecto está en plena evolución arquitectónica por fases.
> Consulta [`docs/ROADMAP.md`](docs/ROADMAP.md) para ver qué está hecho y qué viene.

---

## Contenido

1. [Stack](#stack)
2. [Requisitos](#requisitos)
3. [Puesta en marcha](#puesta-en-marcha)
4. [Scripts](#scripts)
5. [Estructura del proyecto](#estructura-del-proyecto)
6. [Calidad y flujo de trabajo](#calidad-y-flujo-de-trabajo)
7. [Despliegue](#despliegue)
8. [Documentación](#documentación)

## Stack

| Capa          | Tecnología                                  |
| ------------- | ------------------------------------------- |
| Framework     | Next.js 16 (App Router, Proxy)              |
| UI            | React 19, Tailwind CSS 3, Framer Motion     |
| Lenguaje      | TypeScript 5 (`strict`)                     |
| Autenticación | Auth.js v5 (Google) — se migrará en Fase 4  |
| Contenido     | Velite (MDX + YAML con esquemas tipados)    |
| Idiomas       | next-intl (es, en, pt, fr; URLs traducidas) |
| Validación    | zod (variables de entorno)                  |
| Calidad       | ESLint 9, Prettier, Knip, Vitest            |
| Flujo de git  | Husky, lint-staged, commitlint              |
| CI / Hosting  | GitHub Actions, Vercel (plan Hobby)         |

## Requisitos

- Node.js **24** (ver `.nvmrc`; mínimo 22.12).
- npm 10 o superior.

## Puesta en marcha

```bash
git clone https://github.com/EzerZuniga/PortalConvencion-Web.git
cd PortalConvencion-Web
npm install          # instala dependencias y activa los git hooks
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

Las variables de entorno se validan con zod en `src/config/env.ts`. Si falta una
obligatoria, `next dev` y `next build` fallan con un mensaje claro.
Para saltarte la validación puntualmente: `SKIP_ENV_VALIDATION=1`.

## Scripts

| Script               | Descripción                                               |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Servidor de desarrollo (compila el contenido en watch).   |
| `npm run content`    | Compila `content/` → `.velite/` (lo hacen dev y build).   |
| `npm run i18n:check` | Lista los textos de interfaz sin traducir por idioma.     |
| `npm run build`      | Build de producción.                                      |
| `npm run start`      | Sirve el build de producción.                             |
| `npm run lint`       | ESLint (`lint:fix` para corregir).                        |
| `npm run format`     | Formatea con Prettier (`format:check` solo verifica).     |
| `npm run typecheck`  | Comprobación de tipos con `tsc`.                          |
| `npm run knip`       | Detecta archivos, exports y dependencias sin uso.         |
| `npm run test`       | Tests unitarios con Vitest (`test:watch` en modo watch).  |
| `npm run check`      | Todo lo anterior salvo el build: lo mismo que ejecuta CI. |

## Estructura del proyecto

```
content/                 # Contenido editorial (MDX + YAML) — ver docs/CONTENT.md
messages/                # Textos de interfaz por idioma (es, en, pt, fr)
scripts/                 # Utilidades de desarrollo (i18n-check)
src/
├── app/                 # Rutas (App Router). Solo composición: sin lógica.
│   ├── [locale]/        # Todo el sitio, por idioma (es/en/pt/fr)
│   │   ├── (public)/    # Páginas públicas (incluye destinations/[slug], blog/[slug])
│   │   ├── (auth)/      # Login
│   │   └── layout.tsx   # <html lang>, proveedores, metadata del idioma
│   ├── api/             # Route Handlers
│   └── sitemap.ts, robots.ts
├── components/          # Componentes compartidos sin conocimiento de dominio
│   ├── content/         # <MdxContent />, <ArticleLayout />
│   ├── feedback/        # Estados de error / no encontrado
│   ├── i18n/            # Selector de idioma
│   ├── layout/          # Navbar, Footer, newsletter
│   ├── seo/             # <JsonLd />
│   └── ui/              # Primitivas reutilizables
├── config/              # Valores declarativos: env, idiomas, sitio, rutas
├── features/            # Un módulo por dominio: components/ + queries.ts
│   ├── destinations/    # (también blog, gastronomy, gallery, tips, about,
│   └── …                #  home, contact, legal, auth, widgets)
├── hooks/               # Hooks genéricos
├── lib/                 # Lógica de infraestructura
│   ├── auth/            # Única frontera con la librería de auth
│   ├── content/         # Utilidades y modelos de vista del contenido
│   ├── http/            # Cliente HTTP y servicios externos
│   ├── i18n/            # Enrutado por idioma, navegación, mensajes
│   ├── seo/             # Metadata, hreflang, JSON-LD, URLs canónicas
│   └── utils.ts
├── styles/
├── types/
└── proxy.ts             # Proxy de Next 16 (antes middleware)
```

Las reglas de dependencias entre carpetas están en
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Calidad y flujo de trabajo

- **Commits** con [Conventional Commits](https://www.conventionalcommits.org)
  (`feat:`, `fix:`, `refactor:`, `docs:`, `build:`, `chore:`…), validados por commitlint.
- **Pre-commit:** lint-staged ejecuta ESLint y Prettier sobre los archivos modificados.
- **CI:** cada push a `main` y cada PR ejecutan format → lint → typecheck → knip →
  test → build. Un PR no se integra con CI en rojo.
- **Ramas:** una rama por fase o funcionalidad (`chore/…`, `feat/…`, `fix/…`).

## Despliegue

Vercel (plan Hobby). Configuración:

- **Install:** `npm ci` · **Build:** `npm run build` (ver `vercel.json`).
- **Variables de entorno:** las de `.env.example`. `AUTH_SECRET` es obligatoria
  en producción. `NEXT_PUBLIC_SITE_URL` es opcional: si no existe se usa el
  dominio de producción de Vercel.

> El plan Hobby de Vercel es solo para uso **no comercial**.

## Documentación

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — plan por fases.
- [`docs/CONTENT.md`](docs/CONTENT.md) — cómo publicar y editar contenido.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — principios y reglas de la arquitectura.
- [`docs/adr/`](docs/adr) — decisiones de arquitectura (ADR).

## Licencia

MIT. Ver [`LICENSE`](LICENSE).

Desarrollado por **Ezer B. Zuniga Chura** para promover el turismo, la cultura y
la identidad de La Convención.

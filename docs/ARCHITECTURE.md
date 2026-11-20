# Arquitectura

Este documento recoge los principios y las reglas que todo cambio debe respetar.
Las decisiones concretas y su contexto están en [`adr/`](adr).

## Principios

1. **Estático por defecto, dinámico por islas.** El contenido se genera en build;
   solo lo que depende del usuario (sesión, favoritos, comentarios) es dinámico.
2. **Una sola fuente de verdad.** Rutas en `config/routes.ts`, idiomas en
   `config/i18n.ts`, entorno en `config/env.ts`, datos del sitio en
   `config/site.ts`, contenido en `content/`. Nada se duplica.
3. **Fronteras explícitas con librerías externas.** Cada dependencia que podría
   reemplazarse (auth, HTTP, contenido) se consume a través de `src/lib/<area>`.
4. **La autorización vive junto a los datos.** El proxy hace comprobaciones
   optimistas; la verificación real se repite en la página, Server Action o
   capa de datos.
5. **Coste $0.** Toda pieza debe funcionar en los planes gratuitos
   (Vercel Hobby, Neon, Upstash).

## Capas y dependencias permitidas

```
app/  ──►  features/ · components/ · lib/ · config/
features/<x>/ ──►  components/ · hooks/ · lib/ · config/   (nunca otra feature)
components/ ──►  hooks/ · lib/ · config/                   (sin dominio)
lib/ ──►  config/ · #content
config/ ──►  (nada del proyecto)
```

- `app/` solo compone: lee parámetros, pide datos a las `queries` de cada
  dominio y renderiza la vista. Si una página necesita datos de dos dominios
  (la home muestra destinos), los combina `app/`, nunca una feature a otra.
- Excepción temporal: `features/auth` es transversal y cualquier feature puede
  usarlo. Pasará a `lib/` en la Fase 4.
- `config/` es declarativo y no importa nada del resto del proyecto.
- `lib/auth` es el **único** lugar que importa `next-auth` (regla de ESLint).

## Anatomía de una feature

```
features/destinations/
├── components/
│   ├── DestinationsView.tsx    # vista de la página de listado
│   └── DestinationArticle.tsx  # vista de la página de detalle
├── queries.ts                  # acceso al contenido (server-only)
└── queries.test.ts
```

- `queries.ts` es la única puerta al contenido del dominio. Devuelve **modelos de
  vista** (`ArticleCard`, `DishCard`…), nunca los documentos crudos: así el
  cuerpo MDX y los campos internos no llegan al navegador.
- Los componentes reciben datos por props; no importan `#content`.

## Flujo del contenido

```
content/*.mdx|yaml ──(Velite, en next dev/build)──► .velite/ ──► features/*/queries.ts
                                                                   │
                     app/**/page.tsx ◄── modelos de vista ◄────────┘
```

Guía para editores: [`CONTENT.md`](CONTENT.md).

## Convenciones

| Elemento             | Convención                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Imports              | Siempre con alias `@/…`; prohibido `../` (regla de ESLint)        |
| Componentes          | `PascalCase.tsx`                                                  |
| Hooks                | `useAlgo.ts`                                                      |
| Módulos/utilidades   | `kebab-case.ts`                                                   |
| Tests                | `archivo.test.ts`, junto al módulo que prueban                    |
| Barrels (`index.ts`) | Solo a nivel de carpeta pequeña; nunca barrels raíz agregadores   |
| Rutas internas       | `ROUTES.clave`, nunca strings literales                           |
| Enlaces y navegación | `Link`/`useRouter`/`redirect` de `@/lib/i18n/navigation` (ESLint) |
| Textos de interfaz   | `messages/<idioma>.json`; `useMessages()` / `getMessages()`       |
| Variables de entorno | `env.X` desde `@/config/env` (salvo `process.env.NODE_ENV`)       |
| Código de servidor   | `import "server-only"` en módulos que no deben llegar al cliente  |

## Idiomas

```
/                    → proxy detecta el idioma (Accept-Language / cookie) → /es
/es/destinos         → next-intl reescribe a la ruta interna /[locale]/destinations
/destinations        → redirección 308 (URL antigua) → /es/destinos
```

- **Rutas internas** (`ROUTES`, nombres de carpeta) en inglés; **URLs públicas**
  traducidas por idioma en `PATHNAMES` (`src/config/routes.ts`).
- **Textos de interfaz**: `messages/<idioma>.json`, misma estructura en todos
  (un test lo verifica). Las rutas dentro de los mensajes son claves (`"route": "tips"`).
- **Contenido**: un archivo por idioma (`content/…/<idioma>.mdx`). Sin
  traducción no hay página de detalle; los listados muestran la versión en español.
- **SEO**: cada página declara `hreflang` solo hacia las versiones que existen.
  Un idioma con `indexable: false` (`src/config/i18n.ts`) se publica con
  `noindex` y queda fuera del sitemap hasta completar su traducción.
- **Renderizado estático**: cada página y layout llama a `resolveLocale(params)`
  (`@/lib/i18n/server`); sin ello next-intl leería cabeceras y la página sería dinámica.

## Añadir una página nueva

1. Declara la ruta en `ROUTES` y su URL por idioma en `PATHNAMES` (`src/config/routes.ts`).
2. Si es indexable, añádela a `ROUTE_INDEXING` (entra sola en el sitemap).
3. Declara su SEO en `PAGE_SEO` (`src/lib/seo/pages.ts`). TypeScript fallará si falta.
4. Crea `src/app/[locale]/(public)/<ruta>/page.tsx` con
   `createPageMetadata("<clave>", await resolveLocale(params))`.
5. Si es privada, añádela a `PROTECTED_ROUTES` y al `matcher` de `src/proxy.ts`
   (un test verifica que ambos estén sincronizados).

## Estado y deuda conocida

Ver la sección de cada fase en [`ROADMAP.md`](ROADMAP.md).

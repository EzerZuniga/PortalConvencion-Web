# Arquitectura

Este documento recoge los principios y las reglas que todo cambio debe respetar.
Las decisiones concretas y su contexto están en [`adr/`](adr).

## Principios

1. **Estático por defecto, dinámico por islas.** El contenido se genera en build;
   solo lo que depende del usuario (sesión, favoritos, comentarios) es dinámico.
2. **Una sola fuente de verdad.** Rutas en `config/routes.ts`, entorno en
   `config/env.ts`, datos del sitio en `config/site.ts`. Nada se duplica.
3. **Fronteras explícitas con librerías externas.** Cada dependencia que podría
   reemplazarse (auth, HTTP, contenido) se consume a través de `src/lib/<area>`.
4. **La autorización vive junto a los datos.** El proxy hace comprobaciones
   optimistas; la verificación real se repite en la página, Server Action o
   capa de datos.
5. **Coste $0.** Toda pieza debe funcionar en los planes gratuitos
   (Vercel Hobby, Neon, Upstash).

## Capas y dependencias permitidas

```
app/  ──►  views/ · features/ · components/ · lib/ · config/
views/ ──►  features/ · components/ · hooks/ · lib/ · config/
features/<x>/ ──►  components/ · hooks/ · lib/ · config/   (nunca otra feature)
components/ ──►  hooks/ · lib/ · config/                   (sin dominio)
lib/ ──►  config/
config/ ──►  (nada del proyecto)
```

- `app/` solo compone: lee parámetros, pide datos y renderiza. Sin lógica de negocio.
- `config/` es declarativo y no importa nada del resto del proyecto.
- `lib/auth` es el **único** lugar que importa `next-auth` (regla de ESLint).

## Convenciones

| Elemento             | Convención                                                       |
| -------------------- | ---------------------------------------------------------------- |
| Imports              | Siempre con alias `@/…`; prohibido `../` (regla de ESLint)       |
| Componentes          | `PascalCase.tsx`                                                 |
| Hooks                | `useAlgo.ts`                                                     |
| Módulos/utilidades   | `kebab-case.ts`                                                  |
| Tests                | `archivo.test.ts`, junto al módulo que prueban                   |
| Barrels (`index.ts`) | Solo a nivel de carpeta pequeña; nunca barrels raíz agregadores  |
| Rutas internas       | `ROUTES.clave`, nunca strings literales                          |
| Variables de entorno | `env.X` desde `@/config/env` (salvo `process.env.NODE_ENV`)      |
| Código de servidor   | `import "server-only"` en módulos que no deben llegar al cliente |

## Añadir una página nueva

1. Declara la ruta en `ROUTES` (`src/config/routes.ts`).
2. Si es indexable, añádela a `ROUTE_INDEXING` (entra sola en el sitemap).
3. Declara su SEO en `PAGE_SEO` (`src/lib/seo/pages.ts`). TypeScript fallará si falta.
4. Crea `src/app/(public)/<ruta>/page.tsx` con `createPageMetadata("<clave>")`.
5. Si es privada, añádela a `PROTECTED_ROUTES` y al `matcher` de `src/proxy.ts`
   (un test verifica que ambos estén sincronizados).

## Estado y deuda conocida

Ver la sección de cada fase en [`ROADMAP.md`](ROADMAP.md).

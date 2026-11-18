# ADR 0002 — Contenido editorial en MDX dentro del repositorio

- **Estado:** Aceptado (implementación en Fase 2)
- **Fecha:** 2026-11-17

## Contexto

El contenido (destinos, blog, gastronomía) vive hoy en un archivo TypeScript de
más de 2.000 líneas mezclado con los textos de la interfaz. Solo publica una
persona, con conocimientos técnicos, y el presupuesto es $0.

## Decisión

- Contenido en `content/<tipo>/<id>/<locale>.mdx`, validado con esquemas zod
  (Velite).
- Cada pieza tiene un **`id` estable** distinto del `slug`: la base de datos
  (favoritos, comentarios) referencia el `id`, de modo que cambiar una URL no
  rompe datos de usuarios.
- Imágenes junto al contenido, optimizadas en build.
- Si una pieza no tiene traducción, no se genera esa página ni su `hreflang`.

## Consecuencias

- Publicar = commit + push (Vercel despliega solo). Historial completo en git.
- Páginas de detalle 100 % estáticas → rápidas y gratis de servir.

## Alternativas descartadas

- **CMS headless (Sanity, Payload, Strapi):** coste/complejidad innecesarios
  para un único editor técnico.
- **Contentlayer:** abandonado.

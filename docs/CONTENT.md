# Guía de contenido

Cómo publicar y editar contenido del portal. Todo vive en la carpeta `content/`
y se valida automáticamente: si algo está mal escrito, `npm run dev` o el build
te dirán exactamente qué archivo y qué campo fallan.

## Estructura

```
content/
├── destinations/<id>/<idioma>.mdx   # Destinos y guías (con página propia)
├── blog/<id>/<idioma>.mdx           # Posts del blog (con página propia)
├── gastronomy/dishes.<idioma>.yaml  # Platos típicos
├── gastronomy/restaurants.<idioma>.yaml
├── gallery/<idioma>.yaml            # Galería de fotos
├── tips/<idioma>.yaml               # Consejos de viaje
└── team/<idioma>.yaml               # Equipo (página Nosotros)
```

- **`<id>`** es el nombre de la carpeta. **No lo cambies nunca** una vez
  publicado: los favoritos y comentarios de los usuarios se guardarán con él.
- **`<idioma>`** es `es`, `en`, `pt` o `fr`. Si un artículo no tiene archivo en
  un idioma, esa página simplemente no existe en ese idioma.

## Publicar un destino nuevo

1. Crea la carpeta `content/destinations/mi-destino/`.
2. Crea `es.mdx` dentro:

   ```mdx
   ---
   slug: "mi-destino"
   title: "Mi Destino"
   description: "Resumen de 10 a 300 caracteres que aparece en tarjetas y en Google."
   category: "destinations" # destinations | tips | gastronomy | adventure | photography
   author: "Nombre Apellido"
   publishedAt: "2026-11-20"
   featured: false # true = aparece en la portada
   cover: "./cover.jpg" # opcional: imagen dentro de la misma carpeta
   coverAlt: "Descripción de la foto para accesibilidad"
   ---

   Primer párrafo del artículo.

   ## Cómo llegar

   Texto con **negritas**, [enlaces internos](/tips) y listas:

   - Punto uno
   - Punto dos
   ```

3. (Opcional) Copia la foto como `cover.jpg` en la misma carpeta. Se optimiza
   sola (tamaño, formato moderno y placeholder borroso). Sin foto se usa una
   imagen genérica del sitio.
4. `npm run dev` y abre `http://localhost:3000/destinations/mi-destino`.
5. Commit y push: Vercel publica automáticamente.

Un post del blog es igual, en `content/blog/<id>/es.mdx`, con las categorías
`destinations | adventure | culture | gastronomy | tips`.

## Borradores

Añade `draft: true` al frontmatter: el artículo se ve en desarrollo pero no se
publica en producción.

## Actualizar un artículo

Edita el texto y añade `updatedAt: "AAAA-MM-DD"`. Google verá la fecha de
actualización (sitemap y datos estructurados).

## Traducir un artículo

Copia `es.mdx` como `en.mdx` en la misma carpeta y traduce. El `slug` puede ser
distinto por idioma (`slug: "seven-jars"`). Las rutas por idioma llegan en la
Fase 3 del [roadmap](ROADMAP.md).

## Validaciones automáticas

| Regla                                    | Dónde se valida              |
| ---------------------------------------- | ---------------------------- |
| Campos obligatorios y longitudes         | Esquema (`velite.config.ts`) |
| `slug` en kebab-case y único por idioma  | Esquema + `prepare`          |
| Categoría válida y con etiqueta en la UI | Esquema + test               |
| La imagen referenciada existe            | Esquema (`s.image()`)        |
| Fechas en formato ISO                    | Esquema (`s.isodate()`)      |

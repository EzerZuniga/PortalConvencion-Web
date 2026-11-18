import { defineCollection, defineConfig, s } from "velite";
import { LOCALES } from "./src/config/i18n";

/**
 * Capa de contenido (ADR 0002).
 *
 * Estructura:
 *   content/destinations/<id>/<locale>.mdx   → artículos con página propia
 *   content/blog/<id>/<locale>.mdx
 *   content/<colección>/<locale>.yaml        → listas sin página propia
 *
 * - `id` = nombre de la carpeta. Es estable: la base de datos lo referencia.
 * - `slug` = segmento de URL, puede cambiar por idioma.
 * - `locale` = nombre del archivo.
 * - Las imágenes se referencian con rutas relativas al archivo y Velite las
 *   copia a /public/static con hash, dimensiones y placeholder borroso.
 */

const locale = s.enum(LOCALES);
const slug = s
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe estar en kebab-case (a-z, 0-9, -)");

/** Extrae `id` y `locale` de rutas como `destinations/siete-tinajas/es`. */
function parseArticlePath(path: string) {
  const [, id, fileLocale] = path.split("/");
  return { id: id ?? "", locale: locale.parse(fileLocale) };
}

/** Extrae el `locale` de rutas como `gastronomy/dishes.es` o `gallery/es`. */
function parseDataLocale(path: string | undefined) {
  const fileName = path?.split("/").at(-1) ?? "";
  return locale.parse(fileName.split(".").at(-1));
}

const articleFields = {
  slug,
  title: s.string().min(3).max(120),
  description: s.string().min(10).max(300),
  author: s.string(),
  publishedAt: s.isodate(),
  updatedAt: s.isodate().optional(),
  featured: s.boolean().default(false),
  draft: s.boolean().default(false),
  cover: s.image().optional(),
  coverAlt: s.string().optional(),
  path: s.path(),
  metadata: s.metadata(),
  body: s.mdx(),
};

const destinations = defineCollection({
  name: "Destination",
  pattern: "destinations/*/*.mdx",
  schema: s
    .object({
      ...articleFields,
      category: s.enum(["destinations", "tips", "gastronomy", "adventure", "photography"]),
    })
    .transform(({ path, ...data }) => ({ ...data, ...parseArticlePath(path) })),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/*/*.mdx",
  schema: s
    .object({
      ...articleFields,
      category: s.enum(["destinations", "adventure", "culture", "gastronomy", "tips"]),
    })
    .transform(({ path, ...data }) => ({ ...data, ...parseArticlePath(path) })),
});

/** Colección de datos: un YAML por idioma cuya raíz es una lista (un documento por elemento). */
function dataCollection<T extends Parameters<typeof s.object>[0]>(
  name: string,
  pattern: string,
  fields: T,
) {
  return defineCollection({
    name,
    pattern,
    schema: s
      .object({ ...fields, path: s.path() })
      .transform(({ path, ...data }) => ({ ...data, locale: parseDataLocale(path) })),
  });
}

const dishes = dataCollection("Dish", "gastronomy/dishes.*.yaml", {
  id: slug,
  name: s.string(),
  description: s.string(),
  category: s.string(),
  image: s.image().optional(),
});

const restaurants = dataCollection("Restaurant", "gastronomy/restaurants.*.yaml", {
  id: slug,
  name: s.string(),
  description: s.string(),
  location: s.string(),
  specialty: s.string(),
  rating: s.number().min(0).max(5),
  image: s.image().optional(),
});

const gallery = dataCollection("GalleryImage", "gallery/*.yaml", {
  id: slug,
  title: s.string(),
  location: s.string(),
  image: s.image().optional(),
});

const tips = dataCollection("TipGroup", "tips/*.yaml", {
  id: slug,
  title: s.string(),
  icon: s.string().max(4),
  tips: s.array(s.string()).min(1),
});

const team = dataCollection("TeamMember", "team/*.yaml", {
  id: slug,
  name: s.string(),
  role: s.string(),
  description: s.string(),
  initials: s.string().max(3),
  color: s.string().regex(/^#[0-9a-fA-F]{6}$/),
  image: s.image().optional(),
  skills: s.array(s.string()),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  strict: true,
  collections: { destinations, posts, dishes, restaurants, gallery, tips, team },

  /** Validaciones entre documentos que un esquema por archivo no puede expresar. */
  prepare({ destinations, posts }) {
    for (const [name, docs] of Object.entries({ destinations, posts })) {
      const seen = new Set<string>();
      for (const doc of docs) {
        const key = `${doc.locale}/${doc.slug}`;
        if (seen.has(key)) {
          throw new Error(`[${name}] slug duplicado para el idioma "${doc.locale}": ${doc.slug}`);
        }
        seen.add(key);
      }
    }
  },
});

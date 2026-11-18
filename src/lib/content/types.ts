/**
 * Modelos de vista del contenido.
 *
 * Son los datos que reciben los componentes (incluidos los de cliente): solo
 * lo que se muestra, nunca el cuerpo MDX, que se renderiza en el servidor.
 */

/** Tarjeta de artículo (destinos, blog, destacados de la home). */
export interface ArticleCard {
  id: string;
  href: string;
  title: string;
  excerpt: string;
  /** Clave de categoría (no la etiqueta traducida). */
  category: string;
  image: string;
  author: string;
  /** Fecha ISO (YYYY-MM-DD). */
  date: string;
  readTime: string;
  featured: boolean;
}

/** Datos de cabecera de un artículo en su página de detalle. */
export interface ArticleHeader {
  title: string;
  description: string;
  /** Clave de categoría (no la etiqueta traducida). */
  category: string;
  author: string;
  /** Fecha ISO (YYYY-MM-DD). */
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  /** `false` si `image` es la imagen genérica de respaldo. */
  hasCover: boolean;
}

import "server-only";
import { LOCALE_META, type Locale } from "@/config/i18n";
import { ROUTES, type RouteKey } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { localizedUrl } from "@/lib/seo/localized";
import { type PageSeo, pageSeo } from "@/lib/seo/pages";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/url";

export type JsonLdObject = Record<string, unknown>;

const UNSAFE_SCRIPT_CHARS = /[<>&']/g;
const BACKSLASH = String.fromCharCode(92);

/** Convierte un carácter en su secuencia de escape Unicode de JSON (`<` → barra + `u003c`). */
function toUnicodeEscape(char: string): string {
  return `${BACKSLASH}u${char.charCodeAt(0).toString(16).padStart(4, "0")}`;
}

/**
 * Serializa JSON-LD de forma segura para `dangerouslySetInnerHTML`.
 *
 * `JSON.stringify` no escapa `<`, `>` ni `&`, lo que permitiría que una cadena
 * como `</script><script>…` rompa el bloque e inyecte JavaScript (XSS).
 * Se sustituyen por escapes Unicode, válidos en JSON y seguros en <script>.
 */
export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(UNSAFE_SCRIPT_CHARS, toUnicodeEscape);
}

const PLACE_NAME = "La Convención, Cusco, Perú";

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: "Quillabamba",
  addressRegion: "Cusco",
  addressCountry: "PE",
} as const;

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: SITE_CONFIG.geo.latitude,
  longitude: SITE_CONFIG.geo.longitude,
} as const;

function organizationRef(): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    url: siteUrl,
    logo: absoluteUrl(SITE_CONFIG.logo.src),
    sameAs: [SITE_CONFIG.social.facebook, SITE_CONFIG.social.instagram, SITE_CONFIG.social.youtube],
  };
}

/** JSON-LD global del sitio (WebSite). Se renderiza una vez en el layout raíz. */
export function websiteJsonLd(locale: Locale): JsonLdObject {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: "Blog de Viajes La Convención",
    url: localizedUrl(locale, ROUTES.home),
    description:
      "Blog especializado en turismo, viajes y gastronomía de La Convención, Cusco, Perú. Guías completas para explorar destinos únicos.",
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE_CONFIG.logo.src),
        width: SITE_CONFIG.logo.width,
        height: SITE_CONFIG.logo.height,
      },
      founder: { "@type": "Person", name: SITE_CONFIG.author },
    },
    about: {
      "@type": "Place",
      name: "La Convención",
      containedInPlace: { "@type": "AdministrativeArea", name: "Cusco, Perú" },
    },
    inLanguage: LOCALE_META[locale].bcp47,
    copyrightYear: 2024,
    genre: ["Travel", "Tourism", "Food"],
    audience: { "@type": "Audience", audienceType: "travelers" },
  };
}

type PageJsonLdBuilder = (base: JsonLdObject, seo: PageSeo) => JsonLdObject;

/** Builders por ruta. Las rutas sin entrada no emiten JSON-LD de página. */
const PAGE_JSON_LD: Partial<Record<RouteKey, PageJsonLdBuilder>> = {
  about: (base) => ({
    ...base,
    "@type": "AboutPage",
    mainEntity: {
      ...organizationRef(),
      foundingDate: "2024",
      founder: { "@type": "Person", name: SITE_CONFIG.author },
      address: postalAddress,
    },
  }),

  blog: (base) => ({
    ...base,
    "@type": "Blog",
    genre: ["Travel", "Tourism", "Food", "Culture"],
    about: { "@type": "Place", name: PLACE_NAME },
  }),

  contact: (base) => ({
    ...base,
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.contact.email,
      url: getSiteUrl(),
      address: { ...postalAddress, streetAddress: SITE_CONFIG.contact.address },
      geo: geoCoordinates,
    },
  }),

  destinations: (base) => ({
    ...base,
    "@type": "CollectionPage",
    about: {
      "@type": "TouristDestination",
      name: "La Convención",
      touristType: ["Aventura", "Naturaleza", "Cultura"],
      geo: geoCoordinates,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Cusco",
        containedInPlace: { "@type": "Country", name: "Perú" },
      },
    },
  }),

  gastronomy: (base) => ({
    ...base,
    "@type": "WebPage",
    about: {
      "@type": "FoodEstablishment",
      servesCuisine: ["Peruana", "Amazónica", "Andina"],
      areaServed: { "@type": "AdministrativeArea", name: PLACE_NAME },
    },
  }),

  gallery: (base) => ({
    ...base,
    "@type": "ImageGallery",
    about: { "@type": "Place", name: PLACE_NAME },
  }),

  tips: (base) => ({
    ...base,
    "@type": "WebPage",
    about: {
      "@type": "TouristDestination",
      name: "La Convención",
      touristType: ["Aventura", "Mochilero", "Viajero"],
    },
  }),
};

/** JSON-LD de página para la ruta indicada, o `null` si no aplica. */
export function createPageJsonLd(route: RouteKey, locale: Locale): JsonLdObject | null {
  const seo = pageSeo(route, locale);
  const build = PAGE_JSON_LD[route];
  if (seo.noIndex || !build) return null;

  const base: JsonLdObject = {
    "@context": "https://schema.org",
    url: localizedUrl(locale, ROUTES[route]),
    name: seo.title,
    description: seo.description,
    inLanguage: LOCALE_META[locale].bcp47,
    publisher: organizationRef(),
  };

  return build(base, seo);
}

// ─── Páginas de detalle ─────────────────────────────────────────────────────

export interface ArticleJsonLdInput {
  /** `TouristAttraction` para lugares; `Article`/`BlogPosting` para textos. */
  type: "TouristAttraction" | "Article" | "BlogPosting";
  locale: Locale;
  title: string;
  description: string;
  /** URL absoluta de la página. */
  url: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
}

/** JSON-LD de un artículo o atracción turística. */
export function articleJsonLd(input: ArticleJsonLdInput): JsonLdObject {
  const { url } = input;
  const image = absoluteUrl(input.image);
  const inLanguage = LOCALE_META[input.locale].bcp47;

  if (input.type === "TouristAttraction") {
    return {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: input.title,
      description: input.description,
      url,
      image,
      inLanguage,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: PLACE_NAME,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": input.type,
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: url,
    image: [image],
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: { "@type": "Person", name: input.author },
    publisher: organizationRef(),
    inLanguage,
  };
}

/** Migas de pan (`BreadcrumbList`) a partir de pares nombre/ruta. */
export function breadcrumbJsonLd(items: readonly { name: string; url: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

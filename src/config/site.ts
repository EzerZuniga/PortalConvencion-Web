/**
 * Información estática de la marca y del sitio.
 *
 * Seguro de importar en Server y Client Components. La URL pública NO vive
 * aquí: depende del entorno y se obtiene con `getSiteUrl()` de `@/lib/seo/url`.
 */
export const SITE_CONFIG = {
  name: "Explorando la Convención",
  shortName: "ExplorandoLC",
  defaultTitle: "Explorando la Convención - Blog de Viajes y Turismo en Perú",
  description:
    "Descubre los mejores destinos turísticos, consejos de viaje, gastronomía peruana y guías completas. Blog de aventuras y experiencias únicas en Perú.",
  author: "Ezer B. Zuniga Chura",
  locale: "es_PE",
  language: "es-PE",
  ogImage: "/images/hero/hero-main.jpg",
  logo: { src: "/images/brand/logo.png", width: 1486, height: 515 },
  themeColor: "#25D366",
  social: {
    facebook: "https://web.facebook.com/profile.php?id=61591025338423",
    instagram: "https://www.instagram.com/explorando.laconvencion/",
    youtube: "https://www.youtube.com/channel/UCKtQoyDMWoQkT0gjBLDTGIA",
    email: "info@explorandolaconvencion.pe",
    twitter: "https://x.com/ExplorandoLaCon",
    github: "https://github.com/EzerZuniga/PortalConvencion-Web",
  },
  contact: {
    email: "info@explorandolaconvencion.pe",
    address: "Quillabamba, La Convención, Cusco, Perú",
    location: "La Convención, Cusco",
    purpose: "Portal informativo turístico",
  },
  geo: { latitude: -12.87, longitude: -72.69 },
} as const;

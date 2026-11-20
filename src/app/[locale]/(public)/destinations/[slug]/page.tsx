import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES, routeTo } from "@/config/routes";
import { DestinationArticle } from "@/features/destinations/components/DestinationArticle";
import {
  getDestination,
  getDestinationStaticParams,
  getDestinationVersions,
  getRelatedDestinationCards,
  toDestinationHeader,
} from "@/features/destinations/queries";
import { resolveLocale } from "@/lib/i18n/server";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { localizedUrl } from "@/lib/seo/localized";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { routeLabel } from "@/lib/seo/pages";

interface DestinationPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/** Solo existen los destinos generados en build para cada idioma; el resto es 404. */
export const dynamicParams = false;

/**
 * Todas las combinaciones `{ locale, slug }` que existen en el contenido.
 *
 * Se devuelven completas (sin usar los `params` del layout): en Next 16, si el
 * `generateStaticParams` hijo devuelve una lista vacía para algún idioma
 * (p. ej. un idioma aún sin traducciones), Next descarta la ruta entera y no
 * pregenera ninguna página.
 */
export function generateStaticParams() {
  return getDestinationStaticParams();
}

async function load(params: DestinationPageProps["params"]) {
  const locale = await resolveLocale(params);
  const destination = getDestination((await params).slug, locale);
  if (!destination) notFound();
  return { locale, destination };
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { locale, destination } = await load(params);
  const header = toDestinationHeader(destination);

  return createArticleMetadata({
    locale,
    title: header.title,
    description: header.description,
    href: routeTo.destination(destination.slug),
    versions: getDestinationVersions(destination.id),
    image: header.image,
    author: header.author,
    publishedAt: destination.publishedAt,
    updatedAt: destination.updatedAt,
    section: routeLabel("destinations", locale),
  });
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { locale, destination } = await load(params);
  const header = toDestinationHeader(destination);
  const url = localizedUrl(locale, routeTo.destination(destination.slug));

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: destination.category === "destinations" ? "TouristAttraction" : "Article",
          locale,
          title: header.title,
          description: header.description,
          url,
          image: header.image,
          author: header.author,
          publishedAt: destination.publishedAt,
          updatedAt: destination.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: routeLabel("home", locale), url: localizedUrl(locale, ROUTES.home) },
          {
            name: routeLabel("destinations", locale),
            url: localizedUrl(locale, ROUTES.destinations),
          },
          { name: header.title, url },
        ])}
      />
      <DestinationArticle header={header} related={getRelatedDestinationCards(destination)}>
        <MdxContent code={destination.body} />
      </DestinationArticle>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content/MdxContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES, routeTo } from "@/config/routes";
import { DestinationArticle } from "@/features/destinations/components/DestinationArticle";
import {
  getDestination,
  getDestinationSlugs,
  getRelatedDestinationCards,
  toDestinationHeader,
} from "@/features/destinations/queries";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { routeLabel } from "@/lib/seo/pages";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

/** Solo existen los destinos generados en build; cualquier otro slug es 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const destination = getDestination((await params).slug);
  if (!destination) return {};

  const header = toDestinationHeader(destination);
  return createArticleMetadata({
    title: header.title,
    description: header.description,
    path: routeTo.destination(destination.slug),
    image: header.image,
    author: header.author,
    publishedAt: destination.publishedAt,
    updatedAt: destination.updatedAt,
    section: routeLabel("destinations"),
  });
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const destination = getDestination((await params).slug);
  if (!destination) notFound();

  const header = toDestinationHeader(destination);
  const path = routeTo.destination(destination.slug);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: destination.category === "destinations" ? "TouristAttraction" : "Article",
          title: header.title,
          description: header.description,
          path,
          image: header.image,
          author: header.author,
          publishedAt: destination.publishedAt,
          updatedAt: destination.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: routeLabel("home"), path: ROUTES.home },
          { name: routeLabel("destinations"), path: ROUTES.destinations },
          { name: header.title, path },
        ])}
      />
      <DestinationArticle header={header} related={getRelatedDestinationCards(destination)}>
        <MdxContent code={destination.body} />
      </DestinationArticle>
    </>
  );
}

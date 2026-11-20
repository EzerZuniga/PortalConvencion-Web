import { getFormatter, getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { ROUTES } from "@/config/routes";
import type { ArticleCard, ArticleHeader } from "@/lib/content/types";

interface DestinationArticleProps {
  header: ArticleHeader;
  related: ArticleCard[];
  /** Cuerpo MDX ya renderizado. */
  children: ReactNode;
}

/** Página de detalle de un destino (Server Component: no envía JS al navegador). */
export async function DestinationArticle({ header, related, children }: DestinationArticleProps) {
  const [content, format] = await Promise.all([getMessages(), getFormatter()]);
  const page = content.pages.destinations;
  const categoryLabel = (id: string) => page.categories.find((c) => c.id === id)?.label ?? id;

  return (
    <ArticleLayout
      header={header}
      related={related}
      sectionHref={ROUTES.destinations}
      formattedDate={format.dateTime(new Date(header.date), { dateStyle: "long", timeZone: "UTC" })}
      relatedCategoryLabels={Object.fromEntries(
        related.map((r) => [r.id, categoryLabel(r.category)]),
      )}
      labels={{
        home: content.navigation.main[0]?.name ?? "",
        section: page.title,
        category: categoryLabel(header.category),
        writtenBy: content.common.writtenBy,
        publishedOn: content.common.publishedOn,
        relatedArticles: content.common.relatedArticles,
        backToList: content.common.backToList,
        readingTime: content.common.readingTime,
        viewMore: content.common.viewMore,
      }}
    >
      {children}
    </ArticleLayout>
  );
}

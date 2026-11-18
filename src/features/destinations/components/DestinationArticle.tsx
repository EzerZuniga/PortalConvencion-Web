"use client";

import type { ReactNode } from "react";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { ROUTES } from "@/config/routes";
import { useLanguage } from "@/features/i18n";
import type { ArticleCard, ArticleHeader } from "@/lib/content/types";
import { formatDate } from "@/lib/utils";

interface DestinationArticleProps {
  header: ArticleHeader;
  related: ArticleCard[];
  /** Cuerpo MDX ya renderizado en el servidor. */
  children: ReactNode;
}

/**
 * Página de detalle de un destino. Resuelve los textos de interfaz en el idioma
 * activo; el contenido (cuerpo MDX) llega renderizado desde el servidor.
 */
export function DestinationArticle({ header, related, children }: DestinationArticleProps) {
  const { content, locale } = useLanguage();
  const page = content.pages.destinations;
  const categoryLabel = (id: string) => page.categories.find((c) => c.id === id)?.label ?? id;

  return (
    <ArticleLayout
      header={header}
      related={related}
      sectionHref={ROUTES.destinations}
      formattedDate={formatDate(header.date, locale)}
      relatedCategoryLabel={categoryLabel}
      labels={{
        home: content.navigation.main[0]?.name ?? "Inicio",
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

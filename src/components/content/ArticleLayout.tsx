import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock, Home, User } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { ROUTES, type RoutePath } from "@/config/routes";
import { Link } from "@/lib/i18n/navigation";
import type { ArticleCard, ArticleHeader } from "@/lib/content/types";

export interface ArticleLayoutLabels {
  home: string;
  section: string;
  category: string;
  writtenBy: string;
  publishedOn: string;
  relatedArticles: string;
  backToList: string;
  readingTime: string;
  viewMore: string;
}

interface ArticleLayoutProps {
  header: ArticleHeader;
  related: ArticleCard[];
  /** Ruta interna de la sección (se localiza automáticamente). */
  sectionHref: RoutePath;
  labels: ArticleLayoutLabels;
  /** Fecha ya formateada en el idioma del lector. */
  formattedDate: string;
  /** Etiqueta traducida de la categoría de cada relacionado, por `id`. */
  relatedCategoryLabels: Record<string, string>;
  children: ReactNode;
}

/**
 * Estructura común de las páginas de detalle (destinos, blog).
 * Presentacional: no conoce dominios ni idiomas; todo llega por props.
 */
export function ArticleLayout({
  header,
  related,
  sectionHref,
  labels,
  formattedDate,
  relatedCategoryLabels,
  children,
}: ArticleLayoutProps) {
  return (
    <article className="wp-shell">
      {/* ── Cabecera ─────────────────────────────────────────────────── */}
      <header className="relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden md:min-h-[460px]">
        <Image
          src={header.image}
          alt={header.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="wp-container w-full px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
              <li>
                <Link
                  href={ROUTES.home}
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  <Home size={14} aria-hidden="true" />
                  {labels.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link href={sectionHref} className="transition-colors hover:text-white">
                  {labels.section}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page" className="line-clamp-1 font-medium text-white">
                {header.title}
              </li>
            </ol>
          </nav>

          <span className="mb-4 inline-block rounded-full bg-brand-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            {labels.category}
          </span>
          <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
            {header.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/85 md:text-lg">{header.description}</p>

          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            <div className="inline-flex items-center gap-1.5">
              <User size={15} aria-hidden="true" />
              <dt className="sr-only">{labels.writtenBy}</dt>
              <dd>
                {labels.writtenBy} {header.author}
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden="true" />
              <dt className="sr-only">{labels.publishedOn}</dt>
              <dd>
                <time dateTime={header.date}>{formattedDate}</time>
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Clock size={15} aria-hidden="true" />
              <dt className="sr-only">{labels.readingTime}</dt>
              <dd>{header.readTime}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ── Cuerpo ───────────────────────────────────────────────────── */}
      <div className="wp-section">
        <div className="mx-auto max-w-3xl">
          {children}

          <Link href={sectionHref} className="wp-btn-secondary mt-8">
            <ArrowLeft size={16} aria-hidden="true" />
            {labels.backToList}
          </Link>
        </div>
      </div>

      {/* ── Relacionados ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="wp-section bg-white">
          <div className="wp-container">
            <h2 id="related-title" className="wp-title mb-8 text-brand-text">
              {labels.relatedArticles}
            </h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    locale={item.locale}
                    className="wp-card group flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <span className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                        {relatedCategoryLabels[item.id]}
                      </span>
                      <h3 className="line-clamp-2 font-heading text-lg font-bold text-brand-text">
                        {item.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                        {labels.viewMore}
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}

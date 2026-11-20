"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import {
  Home,
  ChevronRight,
  MapPin,
  Compass,
  Calendar,
  ArrowDown,
  Star,
  Search,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useMessages } from "next-intl";
import { motion } from "framer-motion";
import type { ArticleCard } from "@/lib/content/types";
import { ROUTES } from "@/config/routes";

const STAT_DELAYS = [
  "[animation-delay:460ms]",
  "[animation-delay:550ms]",
  "[animation-delay:640ms]",
] as const;

const HERO_STATS = [
  { icon: MapPin, value: "50+", labelKey: "Atractivos" },
  { icon: Compass, value: "30+", labelKey: "Distritos" },
  { icon: Calendar, value: "365", labelKey: "Días ideales" },
] as const;

// ── Portal-style destination card (no blog metadata) ─────────────────
function DestinationCard({ post, categoryLabel }: { post: ArticleCard; categoryLabel: string }) {
  const content = useMessages();
  return (
    <article className="wp-card flex h-full flex-col overflow-hidden" aria-label={post.title}>
      {/* Image with gradient overlay + category badge */}
      <Link
        href={post.href}
        locale={post.locale}
        tabIndex={-1}
        aria-hidden="true"
        className="bg-brand-primary/10 relative block h-48 overflow-hidden"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          {categoryLabel}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={post.href} locale={post.locale} className="group/title">
          <h3 className="line-clamp-2 font-heading text-[1.05rem] font-bold leading-snug text-brand-text transition-colors duration-200 group-hover/title:text-brand-primary">
            {post.title}
          </h3>
        </Link>
        <p className="text-brand-text/80 line-clamp-3 flex-grow text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <Link
          href={post.href}
          locale={post.locale}
          className="group/link mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-accent"
          aria-label={`${content.common.viewMore}: ${post.title}`}
        >
          {content.common.viewMore}
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

interface DestinationsViewProps {
  destinations: ArticleCard[];
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({ destinations }) => {
  const content = useMessages();
  const page = content.pages.destinations;
  const [selectedCategory, setSelectedCategory] = useState("all");

  const selectedCategoryLabel = page.categories.find((c) => c.id === selectedCategory)?.label;
  const categoryLabel = (id: string) => page.categories.find((c) => c.id === id)?.label ?? id;

  const filteredPosts =
    selectedCategory === "all"
      ? destinations
      : destinations.filter((post) => post.category === selectedCategory);

  const spotlightPost =
    selectedCategory === "all" ? (destinations.find((p) => p.featured) ?? null) : null;

  const gridPosts = spotlightPost
    ? filteredPosts.filter((p) => p.id !== spotlightPost.id)
    : filteredPosts;

  return (
    <div className="wp-shell">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero de destinos"
        className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden sm:min-h-[420px] md:min-h-[500px]"
      >
        {/* Background image — Ken Burns subtle zoom-out */}
        <Image
          src="/images/hero/hero2.png"
          alt="Paisaje de La Convención, Cusco"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center motion-safe:animate-hero-zoom"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111B21]/90 via-[#111B21]/35 to-[#111B21]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111B21]/35 to-transparent" />

        {/* Breadcrumb */}
        <nav
          aria-label="Navegación de migas"
          className="wp-container absolute left-0 right-0 top-5 z-20 animate-slide-down [animation-fill-mode:both]"
        >
          <ol className="flex items-center gap-1.5 text-xs font-medium text-white/75">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 transition-colors duration-200 hover:text-brand-primary"
              >
                <Home size={12} strokeWidth={2} />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <ChevronRight size={12} className="text-white/40" />
            </li>
            <li className="font-semibold text-white">{page.title}</li>
          </ol>
        </nav>

        {/* Hero content */}
        <div className="wp-container relative z-10 pb-10 pt-24 md:pb-16">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex animate-fade-in-up items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary shadow-sm backdrop-blur-sm [animation-delay:60ms] [animation-fill-mode:both]">
              <Compass size={11} strokeWidth={2.5} />
              La Convención · Cusco · Perú
            </span>
            <h1 className="mb-3 animate-fade-in-up font-heading text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-tight text-white drop-shadow-lg [animation-delay:200ms] [animation-fill-mode:both]">
              {page.title}
            </h1>
            <p className="max-w-xl animate-fade-in-up text-[15px] leading-relaxed text-white/85 drop-shadow [animation-delay:330ms] [animation-fill-mode:both] sm:text-base">
              {page.subtitle}
            </p>
          </div>

          {/* Quick stats pills — each enters independently */}
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Estadísticas de destinos">
            {HERO_STATS.map(({ icon: Icon, value, labelKey }, i) => (
              <div
                key={labelKey}
                className={`flex animate-reveal-up items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 shadow-sm backdrop-blur-sm [animation-fill-mode:both] ${STAT_DELAYS[i] ?? STAT_DELAYS[0]}`}
              >
                <div className="bg-brand-primary/20 flex h-6 w-6 items-center justify-center rounded-full">
                  <Icon size={12} strokeWidth={2.2} className="text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-white">{value}</span>
                <span className="text-xs text-white/65">{labelKey}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint — delayed entry + continuous bounce */}
        <div className="absolute bottom-14 left-1/2 z-20 hidden -translate-x-1/2 animate-fade-in-up [animation-delay:740ms] [animation-fill-mode:both] sm:flex">
          <div className="animate-bounce">
            <ArrowDown size={18} strokeWidth={1.75} className="text-white/50" />
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 44"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block h-11 w-full"
          >
            <path
              d="M0,22 C240,44 480,4 720,22 C960,40 1200,6 1440,22 L1440,44 L0,44 Z"
              fill="var(--color-background)"
            />
          </svg>
        </div>
      </section>

      {/* ── Posts section ────────────────────────────────────────────── */}
      <section aria-label="Guías y destinos" className="wp-section">
        <div className="wp-container">
          {/* Filter bar ─────────────────────────────────────────────── */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col gap-3">
              {/* Category pills — horizontal scroll on mobile */}
              <div
                role="group"
                aria-label="Filtro por categoría"
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {page.categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count =
                    cat.id === "all"
                      ? destinations.length
                      : destinations.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={[
                        "wp-btn inline-flex flex-none items-center gap-2 whitespace-nowrap border text-sm",
                        isActive
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "hover:border-brand-primary/50 border-[var(--color-border)] bg-white text-brand-text hover:bg-brand-background",
                      ].join(" ")}
                    >
                      {cat.label}
                      <span
                        className={[
                          "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                          isActive
                            ? "bg-white/25 text-white"
                            : "text-brand-text/55 bg-[var(--color-border)]",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Results count */}
              <p className="text-brand-text/45 text-center text-xs font-medium tabular-nums">
                {filteredPosts.length} {filteredPosts.length === 1 ? "guía" : "guías"}
                {selectedCategory !== "all" && selectedCategoryLabel
                  ? ` · ${selectedCategoryLabel}`
                  : ""}
              </p>
            </div>
          </ScrollReveal>

          {/* Featured spotlight ───────────────────────────────────────── */}
          {spotlightPost && (
            <motion.div
              key="spotlight"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-10"
            >
              <article
                className="wp-card group overflow-hidden"
                aria-label={`Guía destacada: ${spotlightPost.title}`}
              >
                <div className="grid md:grid-cols-5">
                  {/* Image */}
                  <Link
                    href={spotlightPost.href}
                    locale={spotlightPost.locale}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="bg-brand-primary/10 relative block h-60 overflow-hidden md:col-span-2 md:h-auto"
                  >
                    <Image
                      src={spotlightPost.image}
                      alt={spotlightPost.title}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent md:bg-gradient-to-r" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                      <Star size={9} strokeWidth={2.5} />
                      Destacado
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-3 p-6 md:col-span-3 md:p-8">
                    <span className="text-brand-primary/80 text-[10px] font-bold uppercase tracking-widest">
                      {categoryLabel(spotlightPost.category)}
                    </span>
                    <Link
                      href={spotlightPost.href}
                      locale={spotlightPost.locale}
                      className="group/title"
                    >
                      <h2 className="line-clamp-3 font-heading text-[clamp(1.2rem,2.5vw,1.7rem)] font-bold leading-snug text-brand-text transition-colors duration-200 group-hover/title:text-brand-primary">
                        {spotlightPost.title}
                      </h2>
                    </Link>
                    <p className="text-brand-text/65 line-clamp-3 text-sm leading-relaxed">
                      {spotlightPost.excerpt}
                    </p>
                    <Link
                      href={spotlightPost.href}
                      locale={spotlightPost.locale}
                      className="group/link mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-accent"
                    >
                      {content.common.viewMore}
                      <ArrowRight
                        size={15}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </motion.div>
          )}

          {/* Posts grid ──────────────────────────────────────────────── */}
          {gridPosts.length > 0 && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {gridPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(i * 0.04, 0.28),
                    ease: "easeOut",
                  }}
                >
                  <DestinationCard post={post} categoryLabel={categoryLabel(post.category)} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty state ─────────────────────────────────────────────── */}
          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center gap-5 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] bg-brand-background">
                <Search size={22} strokeWidth={1.5} className="text-brand-text/35" />
              </div>
              <div className="max-w-xs">
                <p className="mb-1 font-heading font-semibold text-brand-text">
                  {content.common.noCategoryArticles}
                </p>
                <p className="text-brand-text/50 text-sm">
                  Prueba con otra categoría o explora todos los artículos.
                </p>
              </div>
              <button onClick={() => setSelectedCategory("all")} className="wp-btn-primary">
                {content.common.all}
              </button>
            </div>
          )}

          {/* Explore more CTA ────────────────────────────────────────── */}
          <ScrollReveal delay={0.05} className="mt-14 border-t border-[var(--color-border)] pt-10">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.09)]">
              {/* Brand accent bar */}
              <div className="h-1 bg-brand-primary" />

              <div className="flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center md:p-9">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-primary/10 flex h-12 w-12 flex-none items-center justify-center rounded-xl">
                    <BookOpen size={22} strokeWidth={1.75} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
                      Seguir explorando
                    </p>
                    <h3 className="font-heading text-[1.1rem] font-bold leading-tight text-brand-text">
                      ¿Quieres más contenido?
                    </h3>
                    <p className="text-brand-text/75 mt-1.5 max-w-sm text-sm leading-relaxed">
                      Guías de viaje, consejos prácticos y artículos actualizados en el blog.
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 gap-3">
                  {/* Ripple: dark bg → green overlay, text turns dark */}
                  <Link
                    href={ROUTES.blog}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <span className="absolute left-1/2 top-full aspect-square w-[150%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 rounded-[50%] bg-brand-primary transition-transform duration-700 ease-ripple group-hover:scale-100" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark">
                      Ver blog
                    </span>
                  </Link>
                  {/* Ripple: white bg → dark overlay, text turns white */}
                  <Link
                    href={ROUTES.tips}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-brand-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <span className="absolute left-1/2 top-full aspect-square w-[150%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 rounded-[50%] bg-brand-dark transition-transform duration-700 ease-ripple group-hover:scale-100" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                      Tips de viaje
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

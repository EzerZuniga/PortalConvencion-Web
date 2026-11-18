"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  BookOpen,
  Clock,
  ArrowDown,
  Search,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/features/i18n";
import type { ArticleCard } from "@/lib/content/types";

const BLOG_STAT_DELAYS = [
  "[animation-delay:460ms]",
  "[animation-delay:550ms]",
  "[animation-delay:640ms]",
] as const;

interface BlogViewProps {
  posts: ArticleCard[];
}

export const BlogView: React.FC<BlogViewProps> = ({ posts }) => {
  const { content } = useLanguage();
  const page = content.pages.blog;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCategoryLabel = page.categories.find((c) => c.id === selectedCategory)?.label;
  const categoryLabel = (id: string) => page.categories.find((c) => c.id === id)?.label ?? id;

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="wp-shell">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero del blog"
        className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden sm:min-h-[420px] md:min-h-[500px]"
      >
        <Image
          src="/images/hero/hero4.png"
          alt="Blog de La Convención"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center motion-safe:animate-hero-zoom"
        />
        <div className="from-[#111B21]/92 absolute inset-0 bg-gradient-to-t via-[#111B21]/40 to-[#111B21]/10" />
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
              <BookOpen size={11} strokeWidth={2.5} />
              Historias · Consejos · Guías
            </span>
            <h1 className="mb-3 animate-fade-in-up font-heading text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-tight text-white drop-shadow-lg [animation-delay:200ms] [animation-fill-mode:both]">
              {page.heroTitle}
            </h1>
            <p className="max-w-xl animate-fade-in-up text-[15px] leading-relaxed text-white/85 drop-shadow [animation-delay:330ms] [animation-fill-mode:both] sm:text-base">
              {page.heroSubtitle}
            </p>
          </div>

          {/* Stats pills */}
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Estadísticas del blog">
            {[
              { icon: BookOpen, value: "6", label: "Artículos", delay: BLOG_STAT_DELAYS[0] },
              { icon: Calendar, value: "5", label: "Categorías", delay: BLOG_STAT_DELAYS[1] },
              {
                icon: Clock,
                value: "~7 min",
                label: "Lectura promedio",
                delay: BLOG_STAT_DELAYS[2],
              },
            ].map(({ icon: Icon, value, label, delay }) => (
              <div
                key={label}
                className={`flex animate-reveal-up items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 shadow-sm backdrop-blur-sm [animation-fill-mode:both] ${delay}`}
              >
                <div className="bg-brand-primary/20 flex h-6 w-6 items-center justify-center rounded-full">
                  <Icon size={12} strokeWidth={2.2} className="text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-white">{value}</span>
                <span className="text-xs text-white/65">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
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

      {/* ── Búsqueda y filtros ──────────────────────────────────────────── */}
      <section className="wp-section border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="wp-container">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              {/* Top row: search + filters */}
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search
                    size={16}
                    strokeWidth={2}
                    className="text-brand-text/40 absolute left-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    placeholder={content.common.searchArticles}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label={content.common.searchArticles}
                    autoComplete="off"
                    className="wp-input h-11 pl-10 text-sm"
                  />
                </div>

                {/* Category filters — horizontal scroll on mobile */}
                <div
                  role="group"
                  aria-label="Filtro por categoría"
                  className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
                >
                  {page.categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    const count =
                      cat.id === "all"
                        ? posts.length
                        : posts.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={[
                          "wp-btn inline-flex flex-none items-center gap-2 whitespace-nowrap border text-sm transition-colors duration-150",
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
              </div>

              {/* Results count */}
              <p className="text-brand-text/45 text-xs font-medium tabular-nums">
                {filteredPosts.length} {filteredPosts.length === 1 ? "artículo" : "artículos"}
                {selectedCategory !== "all" && selectedCategoryLabel
                  ? ` · ${selectedCategoryLabel}`
                  : ""}
                {searchTerm ? ` · "${searchTerm}"` : ""}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Posts ──────────────────────────────────────────────────────── */}
      <section aria-label="Artículos del blog" className="wp-section">
        <div className="wp-container">
          {filteredPosts.length === 0 ? (
            <ScrollReveal>
              <div className="flex flex-col items-center gap-5 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] bg-brand-background">
                  <Search size={22} strokeWidth={1.5} className="text-brand-text/35" />
                </div>
                <div className="max-w-xs">
                  <p className="mb-1 font-heading font-semibold text-brand-text">
                    {content.common.noSearchResults}
                  </p>
                  <p className="text-brand-text/55 text-sm">Prueba con otro término o categoría.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                  className="wp-btn-primary"
                >
                  {content.common.all}
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.05, 0.28) }}
                  className="wp-card flex flex-col overflow-hidden"
                  aria-label={post.title}
                >
                  {/* Image */}
                  <div className="bg-brand-primary/10 relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                      {categoryLabel(post.category)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="line-clamp-2 font-heading text-[1.05rem] font-bold leading-snug text-brand-text">
                      {post.title}
                    </h3>
                    <p className="text-brand-text/80 line-clamp-3 flex-grow text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="text-brand-text/50 flex items-center justify-between border-t border-[var(--color-border-muted)] pt-2 text-[11px]">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} strokeWidth={2} />
                        {post.readTime}
                      </span>
                    </div>

                    <Link
                      href={post.href}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-accent"
                      aria-label={`${content.common.readArticle}: ${post.title}`}
                    >
                      {content.common.readArticle}
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

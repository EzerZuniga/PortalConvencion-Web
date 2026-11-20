"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import {
  Home,
  ChevronRight,
  Utensils,
  Coffee,
  MapPin,
  Star,
  Leaf,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { useMessages } from "next-intl";
import type { DishCard, RestaurantCard } from "@/features/gastronomy/queries";

const GASTRO_STAT_DELAYS = [
  "[animation-delay:460ms]",
  "[animation-delay:550ms]",
  "[animation-delay:640ms]",
] as const;

const GASTRO_STATS = [
  { icon: Utensils, value: "6", label: "Platos típicos" },
  { icon: Coffee, value: "2", label: "Productos estrella" },
  { icon: Star, value: "3", label: "Restaurantes top" },
] as const;

interface GastronomyViewProps {
  dishes: DishCard[];
  restaurants: RestaurantCard[];
}

export const GastronomyView: React.FC<GastronomyViewProps> = ({ dishes, restaurants }) => {
  const content = useMessages();
  const page = content.pages.gastronomy;

  return (
    <div className="wp-shell">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero de gastronomía"
        className="relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden sm:min-h-[420px] md:min-h-[500px]"
      >
        <Image
          src="/images/hero/hero5.png"
          alt="Gastronomía de La Convención"
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
              <Utensils size={11} strokeWidth={2.5} />
              Cocina · Tradición · Sabor
            </span>
            <h1 className="mb-3 animate-fade-in-up font-heading text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-tight text-white drop-shadow-lg [animation-delay:200ms] [animation-fill-mode:both]">
              {page.heroTitle}
            </h1>
            <p className="max-w-xl animate-fade-in-up text-[15px] leading-relaxed text-white/85 drop-shadow [animation-delay:330ms] [animation-fill-mode:both] sm:text-base">
              {page.heroSubtitle}
            </p>
          </div>

          {/* Stats pills — each enters independently */}
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Highlights de gastronomía">
            {GASTRO_STATS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex animate-reveal-up items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 shadow-sm backdrop-blur-sm [animation-fill-mode:both] ${GASTRO_STAT_DELAYS[i] ?? GASTRO_STAT_DELAYS[0]}`}
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

        {/* Scroll hint — delayed entry + bounce */}
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

      {/* ── Introducción ───────────────────────────────────────────────── */}
      <section className="wp-section">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 font-heading text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight text-brand-text">
            {page.introTitle}
          </h2>
          <div className="mx-auto mb-5 h-[3px] w-14 rounded-full bg-brand-primary" />
          {page.introParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`text-brand-text/80 text-base leading-relaxed${i === 0 ? "mb-4" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </ScrollReveal>
      </section>

      {/* ── Pilares gastronómicos ──────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-8">
        <div className="wp-container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { icon: Coffee, label: "Café de Altura", desc: "Reconocido mundialmente" },
              { icon: Leaf, label: "Cacao Chuncho", desc: "Variedad nativa única" },
              { icon: Utensils, label: "Cocina Ancestral", desc: "Recetas de generaciones" },
              { icon: Star, label: "Calidad Premium", desc: "Specialty Coffee Assoc." },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-brand-background p-4 shadow-sm"
              >
                <div className="bg-brand-primary/10 flex h-10 w-10 flex-none items-center justify-center rounded-xl">
                  <Icon size={18} strokeWidth={1.75} className="text-brand-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold leading-tight text-brand-text">
                    {label}
                  </p>
                  <p className="text-brand-text/60 mt-0.5 text-xs leading-tight">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platos Típicos ─────────────────────────────────────────────── */}
      <section className="wp-section bg-[var(--color-surface-muted)]">
        <div className="wp-container">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="mb-2 font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-tight text-brand-text">
              {page.dishesTitle}
            </h2>
            <p className="text-brand-text/65 mx-auto max-w-xl text-sm">{page.dishesSubtitle}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, delay: Math.min(i * 0.08, 0.28) }}
                className="wp-card flex flex-col overflow-hidden"
              >
                <div className="bg-brand-primary/10 relative h-44 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                    {dish.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-heading text-[1.05rem] font-bold leading-snug text-brand-text">
                    {dish.name}
                  </h3>
                  <p className="text-brand-text/80 text-sm leading-relaxed">{dish.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Café y Cacao ───────────────────────────────────────────────── */}
      <section className="wp-section">
        <div className="wp-container">
          <ScrollReveal>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Text side */}
              <div>
                <div className="bg-brand-primary/10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                  <Coffee className="h-6 w-6 text-brand-primary" strokeWidth={1.75} />
                </div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
                  Producto Estrella
                </p>
                <h2 className="mb-3 font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-tight text-brand-text">
                  {page.coffeeTitle}
                </h2>
                <div className="mb-5 h-[3px] w-12 rounded-full bg-brand-primary" />
                {page.coffeeParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`text-brand-text/80 text-base leading-relaxed${i < page.coffeeParagraphs.length - 1 ? "mb-4" : "mb-7"}`}
                  >
                    {paragraph}
                  </p>
                ))}
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  <span className="absolute left-1/2 top-full aspect-square w-[150%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 rounded-[50%] bg-brand-primary transition-transform duration-700 ease-ripple group-hover:scale-100" />
                  <Leaf
                    size={14}
                    strokeWidth={2}
                    className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark"
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark">
                    {page.coffeeAction}
                  </span>
                </button>
              </div>

              {/* Images side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-44 overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.09)]">
                  <Image
                    src="/images/gallery/comida-asiatica.jpg"
                    alt="Café de La Convención"
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-44 overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.09)]">
                  <Image
                    src="/images/destinations/pueblo-magico.jpg"
                    alt="Cacao Chuncho"
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative col-span-2 h-44 overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.09)]">
                  <Image
                    src="/images/gallery/fotografia.jpg"
                    alt="Plantaciones de la región"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Restaurantes Recomendados ───────────────────────────────────── */}
      <section className="wp-section bg-[var(--color-surface-muted)]">
        <div className="wp-container">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="mb-2 font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold leading-tight text-brand-text">
              {page.restaurantsTitle}
            </h2>
            <p className="text-brand-text/65 mx-auto max-w-xl text-sm">
              {page.restaurantsSubtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {restaurants.map((restaurant, i) => (
              <motion.article
                key={restaurant.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, delay: i * 0.09 }}
                className="wp-card flex flex-col overflow-hidden"
                aria-label={restaurant.name}
              >
                <div className="bg-brand-primary/10 relative h-44 overflow-hidden">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 backdrop-blur-sm">
                    <Star
                      size={11}
                      strokeWidth={0}
                      className="fill-brand-primary text-brand-primary"
                    />
                    <span className="text-[11px] font-bold text-white">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-heading text-[1rem] font-bold leading-snug text-brand-text">
                    {restaurant.name}
                  </h3>
                  <span className="text-brand-primary/80 text-[10px] font-bold uppercase tracking-widest">
                    {restaurant.specialty}
                  </span>
                  <p className="text-brand-text/80 flex-grow text-sm leading-relaxed">
                    {restaurant.description}
                  </p>
                  <div className="text-brand-text/50 flex items-center gap-1.5 border-t border-[var(--color-border-muted)] pt-2">
                    <MapPin size={12} strokeWidth={2} />
                    <span className="text-xs">{restaurant.location}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="wp-section">
        <div className="wp-container">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.09)]">
              <div className="h-1 bg-brand-primary" />
              <div className="flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center md:p-9">
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary">
                    Experiencia Gastronómica
                  </p>
                  <h3 className="mb-1.5 font-heading text-[1.1rem] font-bold text-brand-text">
                    {page.ctaTitle}
                  </h3>
                  <p className="text-brand-text/75 max-w-sm text-sm leading-relaxed">
                    {page.ctaDescription}
                  </p>
                </div>
                <button
                  type="button"
                  className="group relative inline-flex flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  <span className="absolute left-1/2 top-full aspect-square w-[150%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 rounded-[50%] bg-brand-primary transition-transform duration-700 ease-ripple group-hover:scale-100" />
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark"
                  />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark">
                    {page.ctaAction}
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

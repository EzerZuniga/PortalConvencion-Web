"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import {
  type LucideIcon,
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Coffee,
  HelpCircle,
  Images,
  Landmark,
  Leaf,
  MapPin,
  MapPinned,
  NotebookTabs,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { motion } from "framer-motion";
import { useMessages } from "next-intl";
import WeatherWidget from "@/features/weather";
import ExchangeWidget from "@/features/exchange";
import QuoteWidget from "@/features/quotes";
import type { ArticleCard } from "@/lib/content/types";
import { InstitutionalCarousel, ScrollReveal } from "@/components/ui";
import { ROUTES, type RoutePath, routeHref } from "@/config/routes";
const SECTION_CLASS = "py-14 sm:py-16 lg:py-20";
const CONTAINER_CLASS = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const CARD_SURFACE_CLASS =
  "bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]";
const PORTAL_CARD_CLASS =
  "rounded-2xl border border-gray-100 bg-white px-6 pb-7 pt-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group";

const HERO_CTA_CLASS =
  "w-full max-w-[18rem] sm:w-auto sm:max-w-none min-h-12 group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-brand-primary text-brand-text text-center text-xs sm:text-sm font-bold leading-tight rounded-full transition-shadow duration-500 shadow-lg hover:shadow-xl uppercase tracking-wide overflow-hidden transform-gpu";
const HERO_CTA_OVERLAY_CLASS =
  "absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-text rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-1000 ease-ripple origin-center transform-gpu";
const HERO_CTA_CONTENT_CLASS =
  "relative z-10 group-hover:text-white transition-colors duration-500";
const HERO_CTA_ICON_CLASS =
  "relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-500";

const portalLinkIcons = [MapPinned, Coffee, ShieldCheck, NotebookTabs, Images, Landmark] as const;
const statIcons = [MapPin, Camera, Calendar] as const;
const planningStepIcons = [CheckCircle, Compass, HelpCircle] as const;
const portalPillarIcons = [BookOpen, Leaf, ShieldCheck] as const;
const locationCardIcons = [MapPin, Compass, CheckCircle] as const;

type PortalLink = {
  to: RoutePath;
  title: string;
  description: string;
  Icon: LucideIcon;
};

type Highlight = {
  title: string;
  description: string;
  image: string;
  to: RoutePath;
  label: string;
  meta: string;
};

type Stat = {
  value: string;
  label: string;
  description: string;
  Icon: LucideIcon;
};

type Pillar = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type FaqItem = {
  question: string;
  answer: string;
};

function HeroScrollCta({
  label,
  Icon,
  targetId,
}: {
  label: string;
  Icon: LucideIcon;
  targetId: string;
}) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    const header = document.querySelector("header");

    if (!target) {
      return;
    }

    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(targetTop - headerHeight - 8, 0),
      behavior: "smooth",
    });
  };

  return (
    <button type="button" className={HERO_CTA_CLASS} onClick={handleClick}>
      <span className={HERO_CTA_OVERLAY_CLASS} />
      <span className={HERO_CTA_CONTENT_CLASS}>{label}</span>
      <Icon className={HERO_CTA_ICON_CLASS} strokeWidth={1.2} />
    </button>
  );
}

function SectionHeader({
  title,
  description,
  tone = "light",
  action,
}: {
  title: string;
  description: string;
  tone?: "light" | "dark";
  action?: ReactNode;
}) {
  const isDark = tone === "dark";

  return (
    <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
      <div>
        <h2
          className={`text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-2xl ${isDark ? "text-white" : "text-brand-text"}`}
        >
          {title}
        </h2>
        <div
          className={`mx-auto mb-4 mt-3 h-1 w-14 ${isDark ? "bg-white/80" : "bg-brand-primary"}`}
        />
        <p
          className={`text-sm leading-relaxed sm:text-base ${isDark ? "text-white/85" : "text-gray-600"}`}
        >
          {description}
        </p>
      </div>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

function TextLinkButton({ to, children }: { to: RoutePath; children: ReactNode }) {
  return (
    <Link
      href={to}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-text shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-text hover:text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 sm:text-sm"
    >
      {children}
      <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
    </Link>
  );
}

function PortalLinkCard({ to, title, description, Icon }: PortalLink) {
  const content = useMessages();

  return (
    <article className={`relative h-full min-h-[16rem] overflow-hidden ${PORTAL_CARD_CLASS}`}>
      <span className="bg-brand-primary/5 pointer-events-none absolute left-5 top-5 h-20 w-20 rounded-full blur-2xl" />
      <span className="bg-brand-primary/5 pointer-events-none absolute bottom-10 right-7 h-24 w-24 rounded-full blur-2xl" />

      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <div className="mb-5 flex h-24 w-24 items-center justify-center text-[#16251F] drop-shadow-[0_10px_18px_rgba(21,32,56,0.12)]">
          <Icon className="h-20 w-20" strokeWidth={0.95} />
        </div>

        <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-[#172033]">
          {title}
        </h3>
        <p className="mx-auto min-h-[3.2rem] max-w-[14rem] text-xs leading-relaxed text-[#677184]">
          {description}
        </p>

        <Link
          href={to}
          className="mt-auto inline-flex min-h-10 min-w-[130px] items-center justify-center rounded-full bg-brand-primary px-6 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-sm transition-all duration-300 hover:bg-brand-dark-green hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          {content.pages.home.ui.explore}
        </Link>
      </div>
    </article>
  );
}

function PlanningStepCard({
  stepNumber,
  to,
  title,
  description,
  Icon,
}: PortalLink & { stepNumber: number }) {
  const content = useMessages();

  return (
    <Link
      href={to}
      className="hover:border-brand-primary/50 group relative block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
    >
      <div className="text-brand-text/[0.06] absolute right-5 top-5 text-5xl font-bold leading-none">
        {String(stepNumber).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="border-brand-primary/30 flex h-12 w-12 items-center justify-center rounded-full border bg-brand-background text-brand-text shadow-sm transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <span className="rounded-full bg-brand-background px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-text transition-colors duration-300 group-hover:bg-brand-primary">
            {content.pages.home.ui.step} {stepNumber}
          </span>
        </div>

        <h3 className="mb-3 text-base font-bold uppercase tracking-wide text-brand-text">
          {title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-600">{description}</p>

        <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-text transition-colors duration-300 group-hover:text-brand-primary">
          {content.pages.home.ui.viewDetail}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.75}
          />
        </div>
      </div>
    </Link>
  );
}

function CarouselControls({
  current,
  total,
  onPrevious,
  onNext,
}: {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const content = useMessages();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        className="border-brand-text/10 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white text-brand-text shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-text hover:text-white"
        aria-label={content.pages.home.ui.previous}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <span className="text-xs font-semibold tabular-nums text-gray-500">
        {current + 1}/{total}
      </span>
      <button
        type="button"
        onClick={onNext}
        className="border-brand-text/10 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white text-brand-text shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-text hover:text-white"
        aria-label={content.pages.home.ui.next}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function HighlightsCarousel({ highlights }: { highlights: Highlight[] }) {
  const content = useMessages();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = highlights[activeIndex];

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? highlights.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % highlights.length);
  };

  if (!active) return null;

  return (
    <div className="grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative min-h-[300px] sm:min-h-[380px]">
        <Image
          key={active.image}
          src={active.image}
          alt={active.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 h-full w-full animate-fade-in object-cover"
        />
        <div className="to-brand-text/10 absolute inset-0 bg-gradient-to-t from-black/70 via-black/25" />
        <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8 sm:right-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-primary">
            {active.meta}
          </p>
          <h3 className="max-w-2xl text-xl font-bold leading-tight sm:text-2xl">{active.title}</h3>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 bg-gradient-to-br from-white via-brand-background to-white p-6 sm:p-8 lg:p-10">
        <div>
          <Sparkles className="mb-5 h-7 w-7 text-brand-primary" strokeWidth={1.75} />
          <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
            {active.description}
          </p>
          <TextLinkButton to={active.to}>{active.label}</TextLinkButton>
        </div>

        <div className="flex items-center justify-between gap-4">
          <CarouselControls
            current={activeIndex}
            total={highlights.length}
            onPrevious={showPrevious}
            onNext={showNext}
          />
          <div className="hidden items-center gap-2 sm:flex">
            {highlights.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-brand-primary" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`${content.pages.home.ui.viewHighlight} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {stats.map(({ value, label, description, Icon }) => (
        <article
          key={label}
          className="hover:border-brand-primary/50 group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
        >
          <div className="text-brand-text/[0.05] absolute right-5 top-5 text-5xl font-bold leading-none">
            {value}
          </div>
          <div className="relative z-10">
            <div className="border-brand-primary/20 mb-5 flex h-14 w-14 items-center justify-center rounded-full border bg-brand-background text-brand-text shadow-sm transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-brand-text">{value}</span>
            </div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-text">
              {label}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">{description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function IdentityBand({
  identity,
  portalPillars,
}: {
  identity: { eyebrow: string; title: string; description: string };
  portalPillars: Pillar[];
}) {
  return (
    <section className="relative my-16 w-full bg-brand-dark-green text-white sm:my-28">
      {/* Top Cloud Wave */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 w-full overflow-hidden leading-none"
        style={{ transform: "translateY(-99%)" }}
      >
        <svg
          className="relative block h-[60px] w-full sm:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill="#33463F"
          />
        </svg>
      </div>

      {/* Bottom Cloud Wave */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-none"
        style={{ transform: "translateY(99%) rotate(180deg)" }}
      >
        <svg
          className="relative block h-[60px] w-full sm:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill="#33463F"
          />
        </svg>
      </div>

      {/* Container for Content */}
      <div className="relative z-20 mx-auto grid max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h3 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
            {identity.title}
          </h3>
          <p className="mb-8 text-base font-medium leading-relaxed text-white/90 sm:text-lg">
            {identity.description}
          </p>
          <div>
            <button className="group relative inline-flex transform-gpu items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-shadow duration-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-dark-green">
              <span className="absolute left-1/2 top-full aspect-square w-[150%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 transform-gpu rounded-[50%] bg-white transition-transform duration-1000 ease-ripple group-hover:scale-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark-green">
                Descubrir Más
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-3">
          {portalPillars.map(({ title, description, Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="hover:border-brand-primary/25 group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/5 bg-brand-dark p-6 shadow-2xl transition-all duration-300 sm:p-7"
            >
              {/* Subtle hover glow */}
              <div className="from-brand-primary/0 group-hover:from-brand-primary/15 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent transition-colors duration-500" />

              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-brand-dark-2 text-brand-primary shadow-inner transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h4 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-white transition-colors duration-300">
                  {title}
                </h4>
                <p className="text-sm font-medium leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostsCarousel({ featuredPosts }: { featuredPosts: ArticleCard[] }) {
  const content = useMessages();
  const categoryLabel = (id: string) =>
    content.pages.destinations.categories.find((c) => c.id === id)?.label ?? id;
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = featuredPosts[activeIndex] ?? featuredPosts[0];

  if (!activePost) return null;

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? featuredPosts.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % featuredPosts.length);
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
      <article className={`${CARD_SURFACE_CLASS} overflow-hidden hover:translate-y-0`}>
        <Image
          key={activePost.image}
          src={activePost.image}
          alt={activePost.title}
          width={900}
          height={360}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-56 w-full animate-fade-in object-cover sm:h-72"
        />
        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
            <span className="uppercase tracking-wide text-brand-primary">
              {categoryLabel(activePost.category)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
              {activePost.readTime}
            </span>
          </div>
          <h3 className="mb-3 text-lg font-bold leading-tight text-brand-text sm:text-xl">
            {activePost.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-gray-600">{activePost.excerpt}</p>
          <TextLinkButton to={ROUTES.blog}>{content.pages.home.ui.readPosts}</TextLinkButton>
        </div>
      </article>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-text">
            {content.pages.home.ui.featuredPosts}
          </h3>
          <CarouselControls
            current={activeIndex}
            total={featuredPosts.length}
            onPrevious={showPrevious}
            onNext={showNext}
          />
        </div>

        <div className="grid gap-4">
          {featuredPosts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${index === activeIndex ? "bg-brand-background/50 border-brand-primary shadow-md" : "hover:border-brand-primary/50 border-gray-100 bg-white hover:shadow-md"}`}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                {categoryLabel(post.category)}
              </span>
              <span className="mt-1 block text-sm font-bold text-brand-text">{post.title}</span>
              <span className="mt-2 block text-xs text-gray-500">{post.readTime}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="grid gap-4">
      {faqs.map(({ question, answer }) => (
        <details
          key={question}
          className="open:border-brand-primary/50 group rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 open:shadow-[0_20px_40px_rgb(0,0,0,0.08)] sm:p-6"
        >
          <summary className="focus-visible:ring-brand-primary/60 flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-text outline-none transition-colors duration-200 marker:hidden focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white sm:text-base">
            {question}
            <ChevronRight
              className="h-5 w-5 flex-shrink-0 text-brand-primary transition-transform duration-300 ease-smooth-out group-open:rotate-90"
              strokeWidth={1.75}
            />
          </summary>
          <p className="mt-4 max-w-5xl text-sm leading-relaxed text-gray-600 sm:text-[15px]">
            {answer}
          </p>
        </details>
      ))}
    </div>
  );
}

function LocationInfoCard({ to, title, description, Icon }: PortalLink) {
  return (
    <Link
      href={to}
      className="hover:border-brand-primary/50 group block rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="border-brand-primary/20 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border bg-brand-background text-brand-text shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white">
          <Icon
            className="h-5 w-5 transition-transform duration-300 ease-smooth-out group-hover:-rotate-3 group-hover:scale-[1.14]"
            strokeWidth={1.9}
          />
        </div>
        <div className="min-w-0">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-text">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function LocationCard({ locationCards }: { locationCards: PortalLink[] }) {
  const content = useMessages();

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2">
      <div className="h-full min-h-[360px] overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <iframe
          src="https://www.google.com/maps?q=Quillabamba,+Cusco,+Peru&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "360px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={content.pages.home.ui.mapTitle}
          className="h-full w-full"
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:p-5">
        <div className="space-y-4">
          {locationCards.map((item) => (
            <LocationInfoCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface HomeViewProps {
  featuredDestinations: ArticleCard[];
}

export function HomeView({ featuredDestinations }: HomeViewProps) {
  const content = useMessages();
  const home = content.pages.home;
  const portalLinks = home.portalLinks.map((item, index) => ({
    ...item,
    to: routeHref(item.route),
    Icon: portalLinkIcons[index] ?? MapPin,
  }));
  const highlights = home.highlights.map((item) => ({ ...item, to: routeHref(item.route) }));
  const stats = home.stats.map((item, index) => ({
    ...item,
    Icon: statIcons[index] ?? MapPin,
  }));
  const planningSteps = home.planningSteps.map((item, index) => ({
    ...item,
    to: routeHref(item.route),
    Icon: planningStepIcons[index] ?? CheckCircle,
  }));
  const portalPillars = home.portalPillars.map((item, index) => ({
    ...item,
    Icon: portalPillarIcons[index] ?? BookOpen,
  }));
  const locationCards = home.locationCards.map((item, index) => ({
    ...item,
    to: routeHref(item.route),
    Icon: locationCardIcons[index] ?? MapPin,
  }));

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src="/video/meganto3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-6 text-center sm:space-y-8">
            <h1 className="px-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {home.hero.titlePrefix}
              <span className="mt-2 block bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary bg-clip-text text-transparent drop-shadow-lg">
                {home.hero.titleHighlight}
              </span>
            </h1>
            <p className="mx-auto max-w-3xl px-4 text-sm font-light leading-relaxed text-white/95 drop-shadow-md sm:text-base lg:text-lg">
              {home.hero.description}
            </p>
            <div className="flex justify-center px-4 pt-4">
              <HeroScrollCta
                targetId="explorar-contenido"
                label={home.hero.primaryCta}
                Icon={Compass}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION_CLASS} relative overflow-hidden bg-brand-background`}>
        {/* Floating Icons Background (Idea 2) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-brand-primary opacity-[0.025]">
          <Leaf className="absolute left-[2%] top-[5%] h-32 w-32 -rotate-12" strokeWidth={1} />
          <Coffee
            className="absolute right-[5%] top-[20%] h-40 w-40 rotate-[15deg]"
            strokeWidth={1}
          />
          <Compass className="absolute left-[8%] top-[45%] h-48 w-48 rotate-45" strokeWidth={1} />
          <MapPin
            className="absolute bottom-[20%] right-[10%] h-32 w-32 -rotate-[20deg]"
            strokeWidth={1}
          />
          <Camera
            className="absolute bottom-[5%] left-[20%] h-36 w-36 rotate-[10deg]"
            strokeWidth={1}
          />
          <Leaf
            className="absolute right-[30%] top-[60%] h-20 w-20 rotate-[35deg]"
            strokeWidth={1}
          />
          <Images
            className="absolute right-[35%] top-[10%] h-24 w-24 -rotate-[5deg]"
            strokeWidth={1}
          />
          <Landmark
            className="absolute bottom-[40%] left-[40%] h-28 w-28 rotate-[5deg]"
            strokeWidth={1}
          />
        </div>

        <div id="explorar-contenido" className={`${CONTAINER_CLASS} relative z-10`}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.portal.title}
              description={home.sections.portal.description}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portalLinks.map((item) => (
                <PortalLinkCard key={item.to} {...item} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wavy IdentityBand Full Width Section */}
      <IdentityBand identity={home.identity} portalPillars={portalPillars} />

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-white via-white to-brand-background`}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.planningInfo.title}
              description={home.sections.planningInfo.description}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <WeatherWidget />
              <ExchangeWidget />
              <QuoteWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-br from-brand-background via-white to-brand-primary-light`}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.highlights.title}
              description={home.sections.highlights.description}
            />
            <HighlightsCarousel highlights={highlights} />
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white`}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.stats.title}
              description={home.sections.stats.description}
            />
            <StatStrip stats={stats} />
          </ScrollReveal>
        </div>
      </section>

      <section
        className={`${SECTION_CLASS} bg-gradient-to-b from-brand-background to-brand-primary-light`}
      >
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.posts.title}
              description={home.sections.posts.description}
              action={
                <TextLinkButton to={ROUTES.blog}>{home.sections.posts.action}</TextLinkButton>
              }
            />
            <PostsCarousel featuredPosts={featuredDestinations} />
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-white`}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.visit.title}
              description={home.sections.visit.description}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {planningSteps.map((step, index) => (
                <PlanningStepCard key={step.title} stepNumber={index + 1} {...step} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-brand-dark-green`}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.faq.title}
              description={home.sections.faq.description}
              tone="dark"
            />
            <FaqList faqs={home.faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section className={`${SECTION_CLASS} bg-gradient-to-b from-white to-brand-background`}>
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <SectionHeader
              title={home.sections.location.title}
              description={home.sections.location.description}
            />
            <LocationCard locationCards={locationCards} />
          </ScrollReveal>
        </div>
      </section>

      <InstitutionalCarousel />
    </div>
  );
}

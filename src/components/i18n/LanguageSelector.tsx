"use client";

import { Check, ChevronDown } from "lucide-react";
import { useLocale, useMessages } from "next-intl";
import { useRef, useState } from "react";
import { LanguageFlag } from "@/components/i18n/LanguageFlag";
import { LOCALE_META, LOCALES, type Locale } from "@/config/i18n";
import { ROUTES, type RoutePath } from "@/config/routes";
import { useClickOutside } from "@/hooks";
import { getPathname, usePathname } from "@/lib/i18n/navigation";

type LanguageSelectorProps = {
  scrolled?: boolean;
  compact?: boolean;
};

const SECTION_PATHS = new Set<string>(Object.values(ROUTES));

/**
 * URL de la página actual en otro idioma.
 *
 * 1. Usa el `<link rel="alternate" hreflang>` que publica la propia página:
 *    es la fuente de verdad (un artículo puede tener otro slug, o no existir).
 * 2. Si la página no existe en ese idioma, lleva a la sección (p. ej. el
 *    listado de destinos) o a la portada.
 */
function targetUrl(locale: Locale, internalPathname: string): string {
  const alternate = document.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${locale}"]`,
  );
  if (alternate) return new URL(alternate.href).pathname;

  const section = internalPathname.split("/[")[0] ?? ROUTES.home;
  const href = (SECTION_PATHS.has(section) ? section : ROUTES.home) as RoutePath;
  return getPathname({ locale, href });
}

export function LanguageSelector({ scrolled = true, compact = false }: LanguageSelectorProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const content = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = LOCALE_META[locale];

  useClickOutside(menuRef, () => setIsOpen(false));

  const switchTo = (next: Locale) => {
    setIsOpen(false);
    if (next === locale) return;
    // Navegación completa: cambia el idioma de todo el documento (<html lang>, metadata).
    window.location.assign(targetUrl(next, pathname));
  };

  const buttonTextColor = scrolled ? "text-brand-text " : "text-white";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`focus:ring-brand-primary/70 inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-bold uppercase tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 ${buttonTextColor}`}
        aria-label={`${content.languageSelector.ariaLabel}: ${current.nativeName}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={`${content.languageSelector.currentLanguage}: ${current.nativeName}`}
      >
        <LanguageFlag language={locale} />
        <span className="tabular-nums">{current.shortLabel}</span>
        {!compact && (
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className="border-brand-primary/20 absolute right-0 z-[70] mt-2 w-28 overflow-hidden rounded-lg border bg-white py-1.5 shadow-2xl"
          role="menu"
        >
          {LOCALES.map((code) => {
            const selected = code === locale;
            const meta = LOCALE_META[code];

            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                lang={meta.bcp47}
                onClick={() => switchTo(code)}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? "bg-brand-primary/10 text-brand-text"
                    : "text-brand-text/85 hover:bg-brand-background"
                }`}
                title={`${content.languageSelector.changeTo} ${meta.nativeName}`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <LanguageFlag language={code} />
                  <span className="font-bold uppercase tabular-nums leading-tight">
                    {meta.shortLabel}
                  </span>
                </span>
                {selected && (
                  <Check className="h-4 w-4 flex-shrink-0 text-brand-primary" strokeWidth={2.2} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { AppProviders } from "@/app/[locale]/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { env } from "@/config/env";
import { LOCALE_META, LOCALES } from "@/config/i18n";
import { SITE_CONFIG } from "@/config/site";
import { routing } from "@/lib/i18n/routing";
import { websiteJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/url";
import "@/styles/globals.css";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/** Genera en build una versión estática del sitio por idioma. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  return {
    ...createPageMetadata("home", locale),
    metadataBase: new URL(getSiteUrl()),
    applicationName: SITE_CONFIG.name,
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
          type: "image/x-icon",
        },
      ],
      shortcut: "/favicon.ico",
    },
    appleWebApp: { title: SITE_CONFIG.name },
    verification: { google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
    other: { "geo.region": "PE", "geo.placename": "Perú" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE_CONFIG.themeColor,
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Permite el renderizado estático de todo el árbol con el idioma conocido.
  setRequestLocale(locale);

  return (
    <html lang={LOCALE_META[locale].bcp47}>
      {/* Preconnect a las APIs externas de los widgets — reduce TTFB */}
      <head>
        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
        <link rel="preconnect" href="https://open.er-api.com" />
        <link rel="dns-prefetch" href="https://open.er-api.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
      </head>
      <body>
        <JsonLd data={websiteJsonLd(locale)} />
        {/* Solo los mensajes del idioma activo llegan al navegador. */}
        <NextIntlClientProvider>
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

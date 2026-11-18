import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/app/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { env } from "@/config/env";
import { SITE_CONFIG } from "@/config/site";
import { websiteJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl } from "@/lib/seo/url";
import "@/styles/globals.css";

export const metadata: Metadata = {
  ...createPageMetadata("home"),
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
  appleWebApp: {
    title: SITE_CONFIG.name,
  },
  verification: {
    google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "geo.region": "PE",
    "geo.placename": "Perú",
    "msapplication-tooltip": "Blog de Viajes y Turismo en Perú",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE_CONFIG.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE_CONFIG.language}>
      {/* Preconnect to external APIs used by widgets — reduces TTFB */}
      <head>
        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
        <link rel="preconnect" href="https://open.er-api.com" />
        <link rel="dns-prefetch" href="https://open.er-api.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
        <link rel="dns-prefetch" href="https://appleid.apple.com" />
      </head>
      <body>
        {/* Website JSON-LD: server-rendered, no hydration cost */}
        <JsonLd data={websiteJsonLd()} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

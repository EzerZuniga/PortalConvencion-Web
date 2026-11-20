import "server-only";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/config/i18n";
import { routing } from "@/lib/i18n/routing";

export interface LocaleParams {
  params: Promise<{ locale: string }>;
}

/**
 * Resuelve y valida el idioma de una página o layout, y lo registra para que
 * next-intl pueda renderizar estáticamente (sin leer cabeceras).
 */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

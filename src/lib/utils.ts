import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases condicionales y resuelve conflictos de Tailwind. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formatea una fecha ISO en el idioma indicado (p. ej. "1 de abril de 2024").
 * Se fija la zona UTC para que servidor y cliente produzcan el mismo texto.
 */
export function formatDate(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

import "server-only";
import en from "#messages/en.json";
import es from "#messages/es.json";
import fr from "#messages/fr.json";
import pt from "#messages/pt.json";
import type { Locale } from "@/config/i18n";

export type Messages = typeof es;

const MESSAGES: Record<Locale, Messages> = { es, en, pt, fr };

/**
 * Mensajes de interfaz de un idioma, de forma síncrona. Para código de
 * servidor que no es un componente: metadata, sitemap, JSON-LD.
 * En componentes usar `useMessages()` / `getMessages()` de next-intl.
 */
export function messagesFor(locale: Locale): Messages {
  return MESSAGES[locale];
}

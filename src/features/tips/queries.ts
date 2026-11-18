import "server-only";
import { tips } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { forLocaleWithFallback } from "@/lib/content/utils";

export interface TipGroupCard {
  id: string;
  title: string;
  icon: string;
  tips: string[];
}

export function getTipGroups(locale: Locale = DEFAULT_LOCALE): TipGroupCard[] {
  return forLocaleWithFallback(tips, locale).map((group) => ({
    id: group.id,
    title: group.title,
    icon: group.icon,
    tips: group.tips,
  }));
}

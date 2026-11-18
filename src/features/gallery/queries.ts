import "server-only";
import { gallery } from "#content";
import { DEFAULT_LOCALE, type Locale } from "@/config/i18n";
import { forLocaleWithFallback, imageSrc } from "@/lib/content/utils";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  location: string;
}

export function getGalleryItems(locale: Locale = DEFAULT_LOCALE): GalleryItem[] {
  return forLocaleWithFallback(gallery, locale).map((item) => ({
    id: item.id,
    src: imageSrc(item.image),
    title: item.title,
    location: item.location,
  }));
}

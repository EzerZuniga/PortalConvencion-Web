"use client";

import { ROUTES } from "@/config/routes";
import { usePathname } from "@/lib/i18n/navigation";
import NewsletterSignup from "./NewsletterSignup";

/** Rutas internas donde el newsletter es relevante (válidas en todos los idiomas). */
const NEWSLETTER_ROUTES = new Set<string>([
  ROUTES.home,
  ROUTES.destinations,
  ROUTES.blog,
  ROUTES.tips,
  ROUTES.gastronomy,
]);

export default function NewsletterConditional() {
  const pathname = usePathname();
  if (!NEWSLETTER_ROUTES.has(pathname)) return null;
  return <NewsletterSignup />;
}

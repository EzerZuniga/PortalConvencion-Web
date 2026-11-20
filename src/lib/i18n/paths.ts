import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/config/i18n";
import { PATHNAMES, PROTECTED_ROUTES } from "@/config/routes";

/** Idioma de una URL pública (`/en/tips` → `en`), o el idioma por defecto. */
export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(segment ?? "")
    ? (segment as Locale)
    : DEFAULT_LOCALE;
}

function publicPathsOf(internal: keyof typeof PATHNAMES): string[] {
  const localized = PATHNAMES[internal];
  return LOCALES.map((locale) =>
    typeof localized === "string" ? `/${locale}${localized}` : `/${locale}${localized[locale]}`,
  );
}

const PROTECTED_PUBLIC_PATHS = PROTECTED_ROUTES.flatMap(publicPathsOf);

/** ¿La URL pública pertenece a una ruta protegida, en cualquier idioma? */
export function isProtectedPathname(pathname: string): boolean {
  return PROTECTED_PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

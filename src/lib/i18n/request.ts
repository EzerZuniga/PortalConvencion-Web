import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { TIME_ZONE } from "@/config/i18n";
import { messagesFor } from "@/lib/i18n/messages";
import { routing } from "@/lib/i18n/routing";

/** Configuración de next-intl por petición (idioma, mensajes y zona horaria). */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: messagesFor(locale),
    timeZone: TIME_ZONE,
  };
});

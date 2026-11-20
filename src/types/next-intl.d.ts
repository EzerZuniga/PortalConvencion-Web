import type { Locale } from "@/config/i18n";
import type { Messages } from "@/lib/i18n/messages";
import type { routing } from "@/lib/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
    Pathnames: (typeof routing)["pathnames"];
  }
}

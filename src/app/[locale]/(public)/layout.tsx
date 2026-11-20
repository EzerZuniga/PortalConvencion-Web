import type { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";

interface PublicLayoutProps extends LocaleParams {
  children: ReactNode;
}

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  // Cada layout registra el idioma: Next renderiza layouts y páginas en paralelo
  // y, sin esto, next-intl leería cabeceras y la página dejaría de ser estática.
  await resolveLocale(params);
  return <MainLayout>{children}</MainLayout>;
}

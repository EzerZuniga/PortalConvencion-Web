import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";
import { ProfileView } from "@/features/auth/components/ProfileView";
import { auth } from "@/lib/auth/server";
import { redirect } from "@/lib/i18n/navigation";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("profile", await resolveLocale(params));
}

export default async function ProfilePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);

  // Autorización junto a los datos: el proxy es solo una comprobación optimista.
  const session = await auth();
  if (!session) redirect({ href: ROUTES.login, locale });

  return <ProfileView />;
}

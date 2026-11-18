import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { auth } from "@/lib/auth/server";
import { createPageMetadata } from "@/lib/seo/metadata";
import Profile from "@/views/Profile";

export const metadata = createPageMetadata("profile");

export default async function ProfilePage() {
  // Autorización junto a los datos: el proxy es solo una comprobación optimista.
  const session = await auth();
  if (!session) redirect(ROUTES.login);

  return <Profile />;
}

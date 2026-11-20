import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginView } from "@/features/auth/components/LoginView";
import { type LocaleParams, resolveLocale } from "@/lib/i18n/server";
import { createPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return createPageMetadata("login", await resolveLocale(params));
}

/** Suspense: LoginView usa useSearchParams(), que lo requiere en App Router. */
export default async function LoginPage({ params }: LocaleParams) {
  await resolveLocale(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#25D366]" />
        </div>
      }
    >
      <LoginView />
    </Suspense>
  );
}

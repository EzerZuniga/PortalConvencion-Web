import { Suspense } from "react";
import { createPageMetadata } from "@/lib/seo/metadata";
import AuthPage from "@/views/Auth";

export const metadata = createPageMetadata("login");

/**
 * Suspense is required because AuthPage uses useSearchParams(),
 * which needs a Suspense boundary in Next.js App Router.
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#25D366]" />
        </div>
      }
    >
      <AuthPage />
    </Suspense>
  );
}

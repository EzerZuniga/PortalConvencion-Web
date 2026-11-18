"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/lib/auth/client";
import { LanguageProvider } from "@/features/i18n";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </SessionProvider>
  );
}

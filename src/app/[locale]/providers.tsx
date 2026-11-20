"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/lib/auth/client";

/** Proveedores de cliente. El de idioma (`NextIntlClientProvider`) va en el layout. */
export function AppProviders({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

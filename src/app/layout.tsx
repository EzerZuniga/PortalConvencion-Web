import type { ReactNode } from "react";

/**
 * Layout raíz mínimo. El `<html>` real vive en `app/[locale]/layout.tsx`, que
 * conoce el idioma. Este archivo existe porque `app/not-found.tsx` (URLs que el
 * proxy no asocia a ningún idioma) necesita un layout por encima.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

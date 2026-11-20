"use client";

import { useMessages } from "next-intl";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { errorPage } = useMessages();

  useEffect(() => {
    // En producción, reemplazar con un servicio de monitoreo (Sentry, Datadog…)
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <div className="max-w-lg text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">{errorPage.title}</h1>
        <p className="mb-6 text-gray-600">{errorPage.description}</p>
        <button
          onClick={reset}
          className="hover:bg-brand-text/90 rounded-lg bg-brand-text px-6 py-3 font-semibold text-white transition-colors"
        >
          {errorPage.retry}
        </button>
      </div>
    </main>
  );
}

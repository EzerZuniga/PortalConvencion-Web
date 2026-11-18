"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción, reemplazar con un servicio de monitoreo (Sentry, Datadog…)
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <div className="max-w-lg text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Algo salió mal</h1>
        <p className="mb-6 text-gray-600">
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <button
          onClick={reset}
          className="hover:bg-brand-text/90 rounded-lg bg-brand-text px-6 py-3 font-semibold text-white transition-colors"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}

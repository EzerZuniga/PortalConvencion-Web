import "@/styles/globals.css";

/** 404 para URLs fuera de cualquier idioma. Las demás usan `[locale]/not-found.tsx`. */
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-gray-50 p-8 text-center">
        <main>
          <h1 className="mb-4 font-heading text-6xl font-bold text-brand-text">404</h1>
          <p className="mb-6 text-gray-600">Página no encontrada · Page not found</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- fuera del árbol con idioma */}
          <a href="/" className="wp-btn-primary">
            Explorando la Convención
          </a>
        </main>
      </body>
    </html>
  );
}

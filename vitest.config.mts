import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: [
      // `server-only` lanza fuera de React Server Components; en tests (Node)
      // se usa su variante vacía, que el propio paquete incluye.
      {
        find: /^server-only$/,
        replacement: fileURLToPath(new URL("./node_modules/server-only/empty.js", import.meta.url)),
      },
    ],
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    clearMocks: true,
    env: { SKIP_ENV_VALIDATION: "1" },
    // next-intl importa `next/navigation` sin extensión, algo que Node (ESM) no
    // resuelve por sí solo; procesarlo con Vite lo soluciona.
    server: { deps: { inline: ["next-intl"] } },
  },
});

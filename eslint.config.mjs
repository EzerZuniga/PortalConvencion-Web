import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,

  {
    name: "project/rules",
    rules: {
      // ── Calidad general ────────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",
      "object-shorthand": "warn",
      "no-unused-expressions": "error",
      "no-duplicate-imports": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],

      // ── React ──────────────────────────────────────────────────────────
      "react/self-closing-comp": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-danger": "error",

      // ── TypeScript ─────────────────────────────────────────────────────
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // ── Arquitectura ───────────────────────────────────────────────────
      // Imports entre carpetas siempre por alias `@/`, nunca `../../`.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Usa el alias '@/…' en lugar de rutas relativas hacia carpetas superiores.",
            },
            {
              group: ["next-auth", "next-auth/*"],
              message: "Importa auth desde '@/lib/auth/*': es la única frontera con la librería.",
            },
          ],
        },
      ],
    },
  },

  {
    name: "project/auth-boundary",
    files: ["src/lib/auth/**", "src/types/next-auth.d.ts"],
    rules: { "no-restricted-imports": "off" },
  },

  {
    name: "project/tests",
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },

  // Desactiva reglas de formato que entran en conflicto con Prettier.
  prettier,

  globalIgnores([
    ".next/**",
    ".velite/**",
    "out/**",
    "build/**",
    "coverage/**",
    "public/**",
    "next-env.d.ts",
  ]),
]);

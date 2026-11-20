#!/usr/bin/env node
/**
 * Lista los textos de interfaz que parecen sin traducir: iguales al español o
 * (para pt/fr) iguales al inglés.
 *
 *   npm run i18n:check            → informe
 *   npm run i18n:check -- pt      → solo un idioma
 *
 * Úsalo antes de marcar un idioma como `indexable` en `src/config/i18n.ts`.
 */
import { readFileSync } from "node:fs";

const LOCALES = ["en", "pt", "fr"];
/** Claves técnicas que no se traducen. */
const TECHNICAL_KEY = /\.(route|id|icon|image|value|suffix|color)$/;
/** Palabras iguales en varios idiomas (nombres propios, préstamos). */
const SAME_IN_ALL = new Set([
  "Blog",
  "Tips",
  "Instagram",
  "Facebook",
  "YouTube",
  "Email",
  "E-mail",
  "Quillabamba",
]);

const load = (locale) =>
  JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

function leaves(value, prefix = "") {
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, inner]) =>
      leaves(inner, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [[prefix, value]];
}

const reference = {
  es: new Map(leaves(load("es"))),
  en: new Map(leaves(load("en"))),
};

const only = process.argv[2];
let total = 0;

for (const locale of LOCALES.filter((l) => !only || l === only)) {
  const sources = locale === "en" ? ["es"] : ["es", "en"];
  const pending = leaves(load(locale)).filter(([key, value]) => {
    if (typeof value !== "string" || value.trim().length < 4) return false;
    if (TECHNICAL_KEY.test(key) || SAME_IN_ALL.has(value)) return false;
    return sources.some((source) => reference[source].get(key) === value);
  });

  total += pending.length;
  console.log(`\n${locale.toUpperCase()} — ${pending.length} textos sin traducir`);
  const bySection = new Map();
  for (const [key] of pending) {
    const section = key.split(".").slice(0, 2).join(".");
    bySection.set(section, (bySection.get(section) ?? 0) + 1);
  }
  for (const [section, count] of [...bySection].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(3)}  ${section}`);
  }
}

console.log(`\nTotal: ${total}. Edita messages/<idioma>.json para traducirlos.`);

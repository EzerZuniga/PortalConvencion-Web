import { describe, expect, it } from "vitest";
import {
  FALLBACK_IMAGE,
  forLocale,
  forLocaleWithFallback,
  formatReadTime,
  imageSrc,
  newestFirst,
} from "@/lib/content/utils";

const docs = [
  { id: "a", locale: "es" as const },
  { id: "b", locale: "en" as const },
  { id: "c", locale: "es" as const },
];

describe("utilidades de contenido", () => {
  it("forLocale filtra por idioma", () => {
    expect(forLocale(docs, "es").map((d) => d.id)).toEqual(["a", "c"]);
  });

  it("forLocaleWithFallback usa el idioma por defecto si no hay traducción", () => {
    expect(forLocaleWithFallback(docs, "fr").map((d) => d.id)).toEqual(["a", "c"]);
    expect(forLocaleWithFallback(docs, "en").map((d) => d.id)).toEqual(["b"]);
  });

  it("newestFirst ordena por fecha descendente", () => {
    const sorted = [{ publishedAt: "2024-01-01" }, { publishedAt: "2025-01-01" }].sort(newestFirst);
    expect(sorted[0]?.publishedAt).toBe("2025-01-01");
  });

  it("imageSrc usa la imagen de respaldo cuando falta la portada", () => {
    expect(imageSrc(undefined)).toBe(FALLBACK_IMAGE);
  });

  it("formatReadTime nunca muestra menos de 1 minuto", () => {
    expect(formatReadTime(0.2)).toBe("1 min");
    expect(formatReadTime(4.6)).toBe("5 min");
  });
});

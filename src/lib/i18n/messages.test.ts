import { describe, expect, it } from "vitest";
import { LOCALES } from "@/config/i18n";
import { isRouteKey } from "@/config/routes";
import { messagesFor } from "@/lib/i18n/messages";

/** Rutas de todas las hojas del objeto (`pages.home.seo.title`, `navigation.main.0.name`…). */
function leafPaths(value: unknown, prefix = ""): string[] {
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, inner]) =>
      leafPaths(inner, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function routeValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(routeValues);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, inner]) =>
      key === "route" && typeof inner === "string" ? [inner] : routeValues(inner),
    );
  }
  return [];
}

describe("mensajes de interfaz", () => {
  const base = leafPaths(messagesFor("es")).sort();

  it.each(LOCALES)("'%s' tiene exactamente las mismas claves que 'es'", (locale) => {
    expect(leafPaths(messagesFor(locale)).sort()).toEqual(base);
  });

  it.each(LOCALES)("'%s' no deja vacío ningún texto que en español tiene contenido", (locale) => {
    const valueAt = (messages: unknown, path: string) =>
      path
        .split(".")
        .reduce<unknown>((obj, key) => (obj as Record<string, unknown>)?.[key], messages);
    const empty = base.filter((path) => {
      const value = valueAt(messagesFor(locale), path);
      const spanish = valueAt(messagesFor("es"), path);
      return typeof value === "string" && value.trim() === "" && spanish !== "";
    });
    expect(empty).toEqual([]);
  });

  it.each(LOCALES)("toda clave 'route' de '%s' es una ruta válida", (locale) => {
    for (const route of routeValues(messagesFor(locale))) {
      expect(isRouteKey(route), `ruta inválida: ${route}`).toBe(true);
    }
  });
});

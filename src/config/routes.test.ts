import { describe, expect, it } from "vitest";
import { LOCALES } from "@/config/i18n";
import {
  LEGACY_REDIRECTS,
  NON_INDEXABLE_ROUTES,
  PATHNAMES,
  ROUTES,
  indexableRouteKeys,
  isRouteKey,
  routeHref,
} from "@/config/routes";

describe("ROUTES", () => {
  it("no tiene rutas duplicadas", () => {
    const paths = Object.values(ROUTES);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("todas las rutas empiezan por '/' y no terminan en '/' (salvo home)", () => {
    for (const path of Object.values(ROUTES)) {
      expect(path.startsWith("/")).toBe(true);
      if (path !== "/") expect(path.endsWith("/")).toBe(false);
    }
  });

  it("cada ruta interna tiene URL pública declarada", () => {
    for (const path of Object.values(ROUTES)) {
      expect(PATHNAMES).toHaveProperty([path]);
    }
  });
});

describe("PATHNAMES", () => {
  it("en cada idioma, ninguna URL pública se repite", () => {
    for (const locale of LOCALES) {
      const publicPaths = Object.values(PATHNAMES).map((p) =>
        typeof p === "string" ? p : p[locale],
      );
      expect(new Set(publicPaths).size).toBe(publicPaths.length);
    }
  });

  it("las URLs públicas están en minúsculas y sin acentos (kebab-case)", () => {
    for (const localized of Object.values(PATHNAMES)) {
      const paths = typeof localized === "string" ? [localized] : Object.values(localized);
      for (const path of paths) {
        expect(path).toMatch(/^(\/|(\/([a-z0-9-]+|\[slug\]))+)$/);
      }
    }
  });
});

describe("indexación", () => {
  it("ninguna ruta privada o no indexable aparece en el sitemap", () => {
    const indexablePaths = indexableRouteKeys.map((key) => ROUTES[key]);
    for (const path of NON_INDEXABLE_ROUTES) {
      expect(indexablePaths).not.toContain(path);
    }
  });
});

describe("claves de ruta", () => {
  it("isRouteKey valida claves conocidas", () => {
    expect(isRouteKey("destinations")).toBe(true);
    expect(isRouteKey("no-existe")).toBe(false);
    expect(isRouteKey("toString")).toBe(false);
  });

  it("routeHref resuelve claves y envía las inválidas a la home", () => {
    expect(routeHref("blog")).toBe(ROUTES.blog);
    expect(routeHref("no-existe")).toBe(ROUTES.home);
  });
});

describe("redirecciones antiguas", () => {
  it("todas apuntan a URLs con idioma", () => {
    for (const { destination } of LEGACY_REDIRECTS) {
      expect(destination).toMatch(/^\/es\//);
    }
  });
});

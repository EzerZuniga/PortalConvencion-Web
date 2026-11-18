import { describe, expect, it, vi } from "vitest";
import {
  NON_INDEXABLE_ROUTES,
  PROTECTED_ROUTES,
  ROUTES,
  indexableRouteKeys,
} from "@/config/routes";

vi.mock("@/lib/auth/config", () => ({ auth: vi.fn() }));

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
});

describe("indexación", () => {
  it("ninguna ruta privada o no indexable aparece en el sitemap", () => {
    const indexablePaths = indexableRouteKeys.map((key) => ROUTES[key]);
    for (const path of NON_INDEXABLE_ROUTES) {
      expect(indexablePaths).not.toContain(path);
    }
  });
});

describe("proxy", () => {
  it("el matcher cubre todas las rutas protegidas", async () => {
    const { config } = await import("@/proxy");
    for (const route of PROTECTED_ROUTES) {
      expect(config.matcher).toContain(`${route}/:path*`);
    }
  });
});

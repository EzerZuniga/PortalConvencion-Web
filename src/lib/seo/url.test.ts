import { beforeEach, describe, expect, it, vi } from "vitest";

const mockEnv: {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
} = {};

vi.mock("@/config/env", () => ({ env: mockEnv }));

const { absoluteUrl, getSiteUrl } = await import("@/lib/seo/url");

describe("getSiteUrl", () => {
  beforeEach(() => {
    delete mockEnv.NEXT_PUBLIC_SITE_URL;
    delete mockEnv.VERCEL_PROJECT_PRODUCTION_URL;
  });

  it("prioriza NEXT_PUBLIC_SITE_URL", () => {
    mockEnv.NEXT_PUBLIC_SITE_URL = "https://ejemplo.pe";
    mockEnv.VERCEL_PROJECT_PRODUCTION_URL = "app.vercel.app";
    expect(getSiteUrl()).toBe("https://ejemplo.pe");
  });

  it("usa el dominio de producción de Vercel como respaldo", () => {
    mockEnv.VERCEL_PROJECT_PRODUCTION_URL = "app.vercel.app";
    expect(getSiteUrl()).toBe("https://app.vercel.app");
  });

  it("usa localhost en desarrollo", () => {
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("elimina la barra final", () => {
    mockEnv.NEXT_PUBLIC_SITE_URL = "https://ejemplo.pe/";
    expect(getSiteUrl()).toBe("https://ejemplo.pe");
  });
});

describe("absoluteUrl", () => {
  it("construye URLs absolutas a partir de rutas", () => {
    mockEnv.NEXT_PUBLIC_SITE_URL = "https://ejemplo.pe";
    expect(absoluteUrl("/blog")).toBe("https://ejemplo.pe/blog");
    expect(absoluteUrl("/")).toBe("https://ejemplo.pe/");
  });
});

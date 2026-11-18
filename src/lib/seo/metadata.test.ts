import { describe, expect, it } from "vitest";
import { ROUTES } from "@/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

describe("createPageMetadata", () => {
  it("marca como noindex las páginas privadas", () => {
    expect(createPageMetadata("profile").robots).toMatchObject({ index: false, follow: false });
    expect(createPageMetadata("login").robots).toMatchObject({ index: false, follow: false });
  });

  it("indexa las páginas públicas", () => {
    expect(createPageMetadata("destinations").robots).toMatchObject({ index: true });
  });

  it("define una URL canónica que corresponde a la ruta", () => {
    const canonical = createPageMetadata("blog").alternates?.canonical;
    expect(String(canonical).endsWith(ROUTES.blog)).toBe(true);
  });

  it("incluye el nombre del sitio en el título de las páginas internas", () => {
    expect(createPageMetadata("tips").title).toMatch(/\| Explorando la Convención$/);
  });
});

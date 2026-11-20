import { describe, expect, it } from "vitest";
import { isProtectedPathname, localeFromPathname } from "@/lib/i18n/paths";

describe("localeFromPathname", () => {
  it("extrae el idioma del primer segmento", () => {
    expect(localeFromPathname("/en/tips")).toBe("en");
    expect(localeFromPathname("/fr")).toBe("fr");
  });

  it("usa el idioma por defecto si no hay idioma válido", () => {
    expect(localeFromPathname("/")).toBe("es");
    expect(localeFromPathname("/de/tips")).toBe("es");
  });
});

describe("isProtectedPathname", () => {
  it("protege el perfil en todos los idiomas (con su URL traducida)", () => {
    expect(isProtectedPathname("/es/perfil")).toBe(true);
    expect(isProtectedPathname("/en/profile")).toBe(true);
    expect(isProtectedPathname("/pt/perfil")).toBe(true);
    expect(isProtectedPathname("/fr/profil")).toBe(true);
    expect(isProtectedPathname("/es/perfil/ajustes")).toBe(true);
  });

  it("no protege páginas públicas ni rutas con prefijo parecido", () => {
    expect(isProtectedPathname("/es/destinos")).toBe(false);
    expect(isProtectedPathname("/en/profiles")).toBe(false);
    expect(isProtectedPathname("/es/login")).toBe(false);
  });
});

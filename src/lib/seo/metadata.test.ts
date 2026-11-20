import { describe, expect, it } from "vitest";
import { INDEXABLE_LOCALES, isIndexableLocale, LOCALES } from "@/config/i18n";
import { createPageMetadata } from "@/lib/seo/metadata";

describe("createPageMetadata", () => {
  it("marca como noindex las páginas privadas y no les pone hreflang", () => {
    const profile = createPageMetadata("profile", "es");
    expect(profile.robots).toMatchObject({ index: false, follow: false });
    expect(profile.alternates?.languages).toBeUndefined();
    expect(createPageMetadata("login", "en").robots).toMatchObject({ index: false });
  });

  it("indexa las páginas públicas", () => {
    expect(createPageMetadata("destinations", "es").robots).toMatchObject({ index: true });
  });

  it("la URL canónica usa la ruta traducida del idioma", () => {
    expect(String(createPageMetadata("destinations", "es").alternates?.canonical)).toMatch(
      /\/es\/destinos$/,
    );
    expect(String(createPageMetadata("destinations", "en").alternates?.canonical)).toMatch(
      /\/en\/destinations$/,
    );
    expect(String(createPageMetadata("tips", "fr").alternates?.canonical)).toMatch(
      /\/fr\/conseils$/,
    );
  });

  it("declara hreflang solo para los idiomas indexables, más x-default (español)", () => {
    const languages = createPageMetadata("gallery", "en").alternates?.languages as Record<
      string,
      string
    >;
    const expected = [...INDEXABLE_LOCALES, "x-default"].sort();
    expect(Object.keys(languages).sort()).toEqual(expected);
    expect(languages["x-default"]).toBe(languages.es);
    expect(languages.en).toMatch(/\/en\/gallery$/);
  });

  it.each(LOCALES.filter((l) => !isIndexableLocale(l)))(
    "el idioma pendiente de traducción '%s' es visible pero noindex",
    (locale) => {
      expect(createPageMetadata("gallery", locale).robots).toMatchObject({
        index: false,
        follow: true,
      });
    },
  );

  it("título y descripción salen del idioma pedido", () => {
    const es = createPageMetadata("tips", "es");
    const en = createPageMetadata("tips", "en");
    expect(es.title).toMatch(/\| Explorando la Convención$/);
    expect(es.description).not.toBe(en.description);
    expect(en.openGraph).toMatchObject({ locale: "en_US" });
  });
});

import { destinations } from "#content";
import { describe, expect, it } from "vitest";
import { ROUTES } from "@/config/routes";
import {
  getDestination,
  getDestinationCards,
  getDestinationSlugs,
  getFeaturedDestinationCards,
  getRelatedDestinationCards,
} from "@/features/destinations/queries";
import { translations } from "@/features/i18n/translations";

describe("destinos", () => {
  const cards = getDestinationCards();

  it("hay contenido publicado", () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it("cada tarjeta enlaza a su página de detalle", () => {
    for (const card of cards) {
      expect(card.href).toMatch(new RegExp(`^${ROUTES.destinations}/[a-z0-9-]+$`));
    }
  });

  it("los slugs son únicos", () => {
    const slugs = getDestinationSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("se ordenan del más reciente al más antiguo", () => {
    const dates = cards.map((card) => card.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("los destacados son un subconjunto de los publicados", () => {
    const featured = getFeaturedDestinationCards();
    expect(featured.every((card) => card.featured)).toBe(true);
    expect(featured.every((card) => cards.some((c) => c.id === card.id))).toBe(true);
  });

  it("toda categoría del contenido tiene etiqueta en la interfaz", () => {
    const uiCategories = translations.es.pages.destinations.categories.map((c) => c.id);
    for (const doc of destinations) {
      expect(uiCategories).toContain(doc.category);
    }
  });

  it("getDestination devuelve undefined para un slug inexistente", () => {
    expect(getDestination("no-existe")).toBeUndefined();
  });

  it("los relacionados son de la misma categoría y excluyen el propio destino", () => {
    const doc = getDestination(getDestinationSlugs()[0]!)!;
    const related = getRelatedDestinationCards(doc);
    expect(related.length).toBeLessThanOrEqual(3);
    for (const card of related) {
      expect(card.id).not.toBe(doc.id);
      expect(card.category).toBe(doc.category);
    }
  });

  it("no expone el cuerpo MDX en las tarjetas (no llega al cliente)", () => {
    for (const card of cards) {
      expect(card).not.toHaveProperty("body");
    }
  });
});

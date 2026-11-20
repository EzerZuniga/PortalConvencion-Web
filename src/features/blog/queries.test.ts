import { posts } from "#content";
import { describe, expect, it } from "vitest";
import { ROUTES } from "@/config/routes";
import { getPost, getPostCards, getPostSlugs, getRelatedPostCards } from "@/features/blog/queries";
import es from "#messages/es.json";

describe("blog", () => {
  const cards = getPostCards();

  it("cada tarjeta enlaza a su página de detalle", () => {
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card.href).toEqual({
        pathname: `${ROUTES.blog}/[slug]`,
        params: { slug: expect.stringMatching(/^[a-z0-9-]+$/) },
      });
    }
  });

  it("toda categoría del contenido tiene etiqueta en la interfaz", () => {
    const uiCategories = es.pages.blog.categories.map((c) => c.id);
    for (const doc of posts) {
      expect(uiCategories).toContain(doc.category);
    }
  });

  it("getPost devuelve undefined para un slug inexistente", () => {
    expect(getPost("no-existe")).toBeUndefined();
  });

  it("los relacionados priorizan la misma categoría y excluyen el propio post", () => {
    const doc = getPost(getPostSlugs()[0]!)!;
    const related = getRelatedPostCards(doc);
    expect(related.map((card) => card.id)).not.toContain(doc.id);
    const firstOther = related[0];
    const hasSameCategory = cards.some((c) => c.category === doc.category && c.id !== doc.id);
    if (firstOther && hasSameCategory) expect(firstOther.category).toBe(doc.category);
  });
});

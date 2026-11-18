import { describe, expect, it } from "vitest";
import { createPageJsonLd, safeJsonLd } from "@/lib/seo/json-ld";

describe("safeJsonLd", () => {
  it("escapa caracteres que podrían cerrar el <script> (XSS)", () => {
    const output = safeJsonLd({ name: "</script><script>alert('x')</script>&" });

    expect(output).not.toContain("<");
    expect(output).not.toContain(">");
    expect(output).not.toContain("&");
    expect(output).not.toContain("'");
  });

  it("produce JSON válido que conserva el valor original", () => {
    const data = { name: "</script> & 'test'" };
    expect(JSON.parse(safeJsonLd(data))).toEqual(data);
  });
});

describe("createPageJsonLd", () => {
  it("no genera datos estructurados para páginas no indexables", () => {
    expect(createPageJsonLd("profile")).toBeNull();
    expect(createPageJsonLd("login")).toBeNull();
  });

  it("genera el tipo schema.org correcto por página", () => {
    expect(createPageJsonLd("blog")?.["@type"]).toBe("Blog");
    expect(createPageJsonLd("contact")?.["@type"]).toBe("ContactPage");
    expect(createPageJsonLd("gallery")?.["@type"]).toBe("ImageGallery");
  });
});

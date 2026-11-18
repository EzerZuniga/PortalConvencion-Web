import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import About from "@/views/About";

export const metadata = createPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("about")} />
      <About />
    </>
  );
}

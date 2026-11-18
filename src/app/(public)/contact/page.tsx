import { JsonLd } from "@/components/seo/JsonLd";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import Contact from "@/views/Contact";

export const metadata = createPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("contact")} />
      <Contact />
    </>
  );
}

import { JsonLd } from "@/components/seo/JsonLd";
import { ContactView } from "@/features/contact/components/ContactView";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("contact")} />
      <ContactView />
    </>
  );
}

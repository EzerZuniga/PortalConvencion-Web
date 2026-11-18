import { JsonLd } from "@/components/seo/JsonLd";
import { AboutView } from "@/features/about/components/AboutView";
import { getTeamMembers } from "@/features/about/queries";
import { createPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={createPageJsonLd("about")} />
      <AboutView team={getTeamMembers()} />
    </>
  );
}

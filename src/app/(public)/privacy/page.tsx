import { createPageMetadata } from "@/lib/seo/metadata";
import { Privacy } from "@/views/Legal";

export const metadata = createPageMetadata("privacy");

export default function PrivacyPage() {
  return <Privacy />;
}

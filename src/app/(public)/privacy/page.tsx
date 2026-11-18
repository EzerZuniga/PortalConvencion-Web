import { createPageMetadata } from "@/lib/seo/metadata";
import { PrivacyView } from "@/features/legal/components/PrivacyView";

export const metadata = createPageMetadata("privacy");

export default function PrivacyPage() {
  return <PrivacyView />;
}

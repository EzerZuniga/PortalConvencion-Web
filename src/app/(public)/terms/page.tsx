import { createPageMetadata } from "@/lib/seo/metadata";
import { TermsView } from "@/features/legal/components/TermsView";

export const metadata = createPageMetadata("terms");

export default function TermsPage() {
  return <TermsView />;
}

import { createPageMetadata } from "@/lib/seo/metadata";
import { Terms } from "@/views/Legal";

export const metadata = createPageMetadata("terms");

export default function TermsPage() {
  return <Terms />;
}

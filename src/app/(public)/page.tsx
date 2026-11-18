import { createPageMetadata } from "@/lib/seo/metadata";
import Home from "@/views/Home";

export const metadata = createPageMetadata("home");

export default function HomePage() {
  return <Home />;
}

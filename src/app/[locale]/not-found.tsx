import type { Metadata } from "next";
import { NotFoundView } from "@/components/feedback/NotFoundView";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFoundView />;
}

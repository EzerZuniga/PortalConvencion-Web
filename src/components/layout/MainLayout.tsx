import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NewsletterConditional from "./NewsletterConditional";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const { common } = await getMessages();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {common.skipToContent}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <NewsletterConditional />
      <Footer />
    </div>
  );
}

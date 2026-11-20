"use client";

import { Link } from "@/lib/i18n/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { useMessages } from "next-intl";

export const NotFoundView: React.FC = () => {
  const { notFound } = useMessages();

  return (
    <div className="wp-shell flex items-center justify-center px-4">
      <div className="wp-card max-w-md p-8 text-center sm:p-10">
        <h1 className="mb-4 font-heading text-8xl font-bold text-brand-text">404</h1>
        <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900">{notFound.heading}</h2>
        <p className="text-brand-text/75 mb-8 leading-relaxed">{notFound.description}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="wp-btn-primary">
            <Home className="h-5 w-5" />
            {notFound.home}
          </Link>
          <button onClick={() => window.history.back()} className="wp-btn-secondary">
            <ArrowLeft className="h-5 w-5" />
            {notFound.back}
          </button>
        </div>
      </div>
    </div>
  );
};

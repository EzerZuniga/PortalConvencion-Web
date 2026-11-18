"use client";

import React from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children,
}) => {
  return (
    <div className="min-h-screen bg-brand-background pb-20 pt-20 text-brand-text sm:pb-32 sm:pt-28">
      {/* Header */}
      <header className="relative overflow-hidden bg-brand-text py-20 text-white sm:py-32">
        {/* Background blobs for aesthetics */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-brand-primary opacity-30 mix-blend-multiply blur-3xl filter" />
          <div
            className="absolute -right-12 top-12 h-96 w-96 animate-pulse rounded-full bg-brand-secondary opacity-30 mix-blend-multiply blur-3xl filter"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl animate-reveal-up px-5 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-white drop-shadow-md">
            {title}
          </h1>
          <p className="text-[15px] font-medium tracking-wide text-white/80 sm:text-[17px]">
            Última actualización: {lastUpdated}
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full translate-y-[1px] rotate-180 overflow-hidden leading-none">
          <svg
            className="relative block h-[40px] w-[calc(100%+1.3px)] sm:h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-brand-background"
            />
          </svg>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-20 mx-auto -mt-8 max-w-4xl px-5 sm:-mt-12 sm:px-6 lg:px-8">
        <div className="animate-reveal-up rounded-[2rem] border border-slate-100/50 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:rounded-[2.5rem] sm:p-12 lg:p-16">
          <div className="space-y-8 text-[16px] leading-relaxed text-slate-600 sm:space-y-10 sm:text-[18px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

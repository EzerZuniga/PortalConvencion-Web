"use client";

import React from "react";
import { ScrollReveal, SectionHeader } from "@/components/ui";
import { useLanguage } from "@/features/i18n";
import type { TipGroupCard } from "@/features/tips/queries";

interface TipsViewProps {
  groups: TipGroupCard[];
}

export const TipsView: React.FC<TipsViewProps> = ({ groups }) => {
  const { content } = useLanguage();
  const page = content.pages.tips;

  return (
    <div className="wp-shell">
      <div className="wp-section">
        <ScrollReveal className="wp-container">
          {/* Header */}
          <SectionHeader title={page.title} subtitle={page.subtitle} />

          {/* Tips Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((tipCategory, index) => (
              <div
                key={tipCategory.id}
                className="wp-card wp-card-interactive animate-reveal-up border-t-4 border-brand-primary p-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <h3 className="mb-4 flex items-center font-heading text-2xl font-semibold text-brand-text">
                  <span className="mr-3 text-2xl">{tipCategory.icon}</span>
                  {tipCategory.title}
                </h3>
                <ul className="space-y-3">
                  {tipCategory.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="mr-2 mt-1 font-bold text-brand-primary">•</span>
                      <span className="text-brand-text/75">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="wp-card border-brand-primary/40 mt-16 border-2 p-8 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-brand-text">
              {page.moreHelpTitle}
            </h2>
            <p className="text-brand-text/75 mx-auto mb-6 max-w-2xl">{page.moreHelpDescription}</p>
            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
              <input type="email" placeholder={page.emailPlaceholder} className="wp-input flex-1" />
              <button className="wp-btn-primary whitespace-nowrap">{page.subscribe}</button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

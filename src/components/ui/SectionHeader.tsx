import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = "" }) => {
  return (
    <div className={cn("mx-auto mb-12 max-w-4xl animate-reveal-up text-center", className)}>
      <h2 className="wp-title mb-4 text-brand-text">{title}</h2>
      <div className="mx-auto mb-4 h-[2px] w-20 rounded-full bg-brand-primary" />
      {subtitle && <p className="wp-lead mx-auto max-w-3xl">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;

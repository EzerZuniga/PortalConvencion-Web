import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  accentColor = '#4CAF50',
  className = '',
}) => {
  return (
    <div className={`text-center max-w-4xl mx-auto mb-12 ${className}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212121] dark:text-white mb-4 tracking-tight">
        {title}
      </h2>
      <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: accentColor }} />
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

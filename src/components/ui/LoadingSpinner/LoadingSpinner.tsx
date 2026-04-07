import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div className={`${sizes[size]} border-emerald-200 border-t-emerald-600 rounded-full animate-spin ${className}`} role="status">
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;

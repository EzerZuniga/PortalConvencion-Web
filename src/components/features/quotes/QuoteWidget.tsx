import React from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { useApi } from '@/hooks';
import { getRandomQuote } from '@/api';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';

const QuoteWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getRandomQuote, []);

  if (loading) {
    return (
      <div className="wp-card bg-gradient-to-br from-sun-50 to-earth-50 dark:from-slate-800 dark:to-slate-800 p-6 flex items-center justify-center min-h-[140px] border-sun-200 dark:border-slate-700">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="wp-card p-6">
        <ErrorMessage message="No se pudo cargar la frase" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="wp-card wp-card-interactive bg-gradient-to-br from-sun-50 to-earth-50 dark:from-slate-800 dark:to-slate-900 p-6 border-sun-200 dark:border-slate-700 relative">
      <Quote className="w-8 h-8 text-sun-300 dark:text-sun-500 absolute top-4 left-4 opacity-50" />

      <div className="pt-6 px-2">
        <blockquote className="text-base sm:text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed mb-4">
          &ldquo;{data.content}&rdquo;
        </blockquote>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-sun-700 dark:text-sun-300">
            — {data.author}
          </p>
          <button
            onClick={refetch}
            className="p-2 rounded-lg text-gray-400 hover:text-sun-600 dark:hover:text-sun-300 hover:bg-sun-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Nueva frase"
            title="Nueva frase"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteWidget;


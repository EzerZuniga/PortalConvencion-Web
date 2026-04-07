import React from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { useApi } from '@/hooks';
import { getRandomQuote } from '@/api';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';

const QuoteWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getRandomQuote, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 rounded-xl p-6 flex items-center justify-center min-h-[140px] border border-amber-200 dark:border-slate-700">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
        <ErrorMessage message="No se pudo cargar la frase" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-amber-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 relative">
      <Quote className="w-8 h-8 text-amber-300 dark:text-amber-600 absolute top-4 left-4 opacity-50" />

      <div className="pt-6 px-2">
        <blockquote className="text-base sm:text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed mb-4">
          &ldquo;{data.content}&rdquo;
        </blockquote>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
            — {data.author}
          </p>
          <button
            onClick={refetch}
            className="p-2 rounded-lg text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
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

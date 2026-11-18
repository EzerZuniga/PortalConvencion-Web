import React from "react";
import { Quote, RefreshCw } from "lucide-react";
import { useApi } from "@/hooks";
import { getRandomQuote } from "@/lib/http";
import { LoadingSpinner, ErrorMessage } from "@/components/ui";

const QUOTE_CARD_CLASS =
  "h-full min-h-[285px] overflow-hidden border border-brand-primary/20  shadow-[0_18px_42px_rgba(37,211,102,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(37,211,102,0.18)]";

const QuoteWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getRandomQuote);

  if (loading) {
    return (
      <div
        className={`${QUOTE_CARD_CLASS} flex items-center justify-center bg-brand-dark-green p-6`}
      >
        <LoadingSpinner size="md" className="border-white/30 border-t-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${QUOTE_CARD_CLASS} flex items-center justify-center bg-white p-6`}>
        <ErrorMessage message="No se pudo cargar la frase" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={`${QUOTE_CARD_CLASS} relative bg-brand-dark-green p-6 text-white`}>
      <div className="absolute right-0 top-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-white/5 blur-xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm">
            <Quote className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Inspiración
          </span>
        </div>

        <blockquote className="mb-6 flex-grow text-lg font-medium leading-snug text-white/95 sm:text-xl">
          &ldquo;{data.content}&rdquo;
        </blockquote>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/15 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/20">
              <span className="text-[11px] font-bold text-white">{data.author.charAt(0)}</span>
            </div>
            <p className="text-sm font-semibold text-white/90">{data.author}</p>
          </div>
          <button
            onClick={refetch}
            className="rounded-full p-2 text-white/60 transition-all duration-200 hover:bg-white/20 hover:text-white"
            aria-label="Nueva frase"
            title="Nueva frase"
          >
            <RefreshCw className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteWidget;

import React from "react";
import { DollarSign, ArrowRightLeft } from "lucide-react";
import { useApi } from "@/hooks";
import { getExchangeRates } from "@/lib/http";
import { LoadingSpinner, ErrorMessage } from "@/components/ui";

const EXCHANGE_CARD_CLASS =
  "h-full min-h-[285px] overflow-hidden border border-brand-primary/20  shadow-[0_18px_42px_rgba(37,211,102,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_26px_58px_rgba(37,211,102,0.16)]";

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  PEN: "🇵🇪",
  BRL: "🇧🇷",
  COP: "🇨🇴",
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "Dólar USD",
  EUR: "Euro",
  PEN: "Sol Peruano",
  BRL: "Real Brasileño",
  COP: "Peso Colombiano",
};

const ExchangeWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(() => getExchangeRates("USD"));

  if (loading) {
    return (
      <div className={`${EXCHANGE_CARD_CLASS} flex items-center justify-center bg-[#111B21] p-6`}>
        <LoadingSpinner size="md" className="border-white/30 border-t-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${EXCHANGE_CARD_CLASS} flex items-center justify-center bg-white p-6`}>
        <ErrorMessage message="No se pudo cargar el tipo de cambio" onRetry={refetch} />
      </div>
    );
  }

  const displayCurrencies = ["PEN", "EUR", "BRL", "COP"] as const;

  return (
    <div className={`${EXCHANGE_CARD_CLASS} relative bg-[#111B21] p-6 text-white`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_40%)]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Tipo de Cambio</h3>
            <p className="mt-1 text-xs text-white/75">Base referencial: 1 USD</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm">
            <DollarSign className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
        </div>

        <div className="flex-grow space-y-2">
          {displayCurrencies.map((code) => (
            <div
              key={code}
              className="flex items-center justify-between gap-4 border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl drop-shadow-md">{CURRENCY_FLAGS[code]}</span>
                <div>
                  <span className="block text-sm font-bold leading-tight text-white">{code}</span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/60">
                    {CURRENCY_NAMES[code].split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-3 w-3 text-white/40" strokeWidth={1.75} />
                <span className="text-sm font-bold text-white">
                  {data.rates[code]?.toFixed(code === "COP" ? 0 : 2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-white/15 pt-4">
          <p className="text-center text-xs font-medium tracking-wide text-white/50">
            Actualizado: {data.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeWidget;

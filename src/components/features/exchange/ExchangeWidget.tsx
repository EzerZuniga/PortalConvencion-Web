import React from 'react';
import { DollarSign, ArrowRightLeft } from 'lucide-react';
import { useApi } from '@/hooks';
import { getExchangeRates } from '@/api';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';

const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  PEN: '🇵🇪',
  BRL: '🇧🇷',
  COP: '🇨🇴',
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'Dólar USD',
  EUR: 'Euro',
  PEN: 'Sol Peruano',
  BRL: 'Real Brasileño',
  COP: 'Peso Colombiano',
};

const ExchangeWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(() => getExchangeRates('USD'), []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex items-center justify-center min-h-[180px]">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
        <ErrorMessage message="No se pudo cargar el tipo de cambio" onRetry={refetch} />
      </div>
    );
  }

  const displayCurrencies = ['PEN', 'EUR', 'BRL', 'COP'] as const;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tipo de Cambio</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Base: 1 USD</p>
        </div>
      </div>

      <div className="space-y-3">
        {displayCurrencies.map((code) => (
          <div key={code} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{CURRENCY_FLAGS[code]}</span>
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{code}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{CURRENCY_NAMES[code]}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowRightLeft className="w-3 h-3 text-gray-400" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {data.rates[code]?.toFixed(code === 'COP' ? 0 : 2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
        Actualizado: {data.lastUpdated}
      </p>
    </div>
  );
};

export default ExchangeWidget;

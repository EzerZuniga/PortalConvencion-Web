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
      <div className="wp-card p-6 flex items-center justify-center min-h-[180px]">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="wp-card p-6">
        <ErrorMessage message="No se pudo cargar el tipo de cambio" onRetry={refetch} />
      </div>
    );
  }

  const displayCurrencies = ['PEN', 'EUR', 'BRL', 'COP'] as const;

  return (
    <div className="wp-card wp-card-interactive p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-primary-700 dark:text-primary-400" />
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

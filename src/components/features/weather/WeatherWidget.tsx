import React from 'react';
import { Wind, Droplets, ThermometerSun } from 'lucide-react';
import { useApi } from '@/hooks';
import { getWeather } from '@/api';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';

const WeatherWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getWeather, []);

  if (loading) {
    return (
      <div className="wp-card bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white flex items-center justify-center min-h-[180px]">
        <LoadingSpinner size="lg" className="border-white/30 border-t-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="wp-card p-6">
        <ErrorMessage message="No se pudo cargar el clima" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="wp-card wp-card-interactive bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white/80 uppercase tracking-wide">Clima en Quillabamba</h3>
          <p className="text-xs text-white/60 mt-0.5">La Convención, Cusco</p>
        </div>
        <span className="text-4xl" role="img" aria-label={data.description}>{data.icon}</span>
      </div>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-bold leading-none">{data.temperature}</span>
        <span className="text-xl text-white/80 mb-1">{data.unit}</span>
      </div>

      <p className="text-sm text-white/90 font-medium mb-4">{data.description}</p>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
        <div className="flex flex-col items-center gap-1">
          <ThermometerSun className="w-4 h-4 text-white/70" />
          <span className="text-xs text-white/70">Temp.</span>
          <span className="text-sm font-semibold">{data.temperature}°</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="w-4 h-4 text-white/70" />
          <span className="text-xs text-white/70">Humedad</span>
          <span className="text-sm font-semibold">{data.humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Wind className="w-4 h-4 text-white/70" />
          <span className="text-xs text-white/70">Viento</span>
          <span className="text-sm font-semibold">{data.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;

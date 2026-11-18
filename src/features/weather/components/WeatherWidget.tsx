import React from "react";
import { Wind, Droplets, ThermometerSun } from "lucide-react";
import { useApi } from "@/hooks";
import { getWeather } from "@/lib/http";
import { LoadingSpinner, ErrorMessage } from "@/components/ui";

const WEATHER_CARD_CLASS =
  "h-full min-h-[285px] rounded-2xl overflow-hidden border border-brand-primary/25 shadow-[0_18px_42px_rgba(37,211,102,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(37,211,102,0.20)]";

const WeatherWidget: React.FC = () => {
  const { data, loading, error, refetch } = useApi(getWeather);

  if (loading) {
    return (
      <div
        className={`${WEATHER_CARD_CLASS} flex items-center justify-center bg-brand-dark-green p-6 text-white`}
      >
        <LoadingSpinner size="lg" className="border-white/30 border-t-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${WEATHER_CARD_CLASS} flex items-center justify-center bg-white p-6`}>
        <ErrorMessage message="No se pudo cargar el clima" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={`${WEATHER_CARD_CLASS} relative bg-brand-dark-green p-6 text-white`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Clima en Quillabamba
            </h3>
            <p className="mt-1 text-xs text-white/75">La Convención, Cusco</p>
          </div>
          <span className="text-4xl drop-shadow-sm" role="img" aria-label={data.description}>
            {data.icon}
          </span>
        </div>

        <div className="mb-4 flex items-end gap-2">
          <span className="text-5xl font-bold leading-none">{data.temperature}</span>
          <span className="mb-1 text-xl text-white/80">{data.unit}</span>
        </div>

        <p className="mb-5 text-sm font-semibold text-white/95">{data.description}</p>

        <div className="mt-auto grid grid-cols-3 gap-3 border-t border-white/25 pt-5">
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3">
            <ThermometerSun className="h-4 w-4 text-white/70" strokeWidth={1.75} />
            <span className="text-xs text-white/70">Temp.</span>
            <span className="text-sm font-semibold">{data.temperature}°</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3">
            <Droplets className="h-4 w-4 text-white/70" strokeWidth={1.75} />
            <span className="text-xs text-white/70">Humedad</span>
            <span className="text-sm font-semibold">{data.humidity}%</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 p-3">
            <Wind className="h-4 w-4 text-white/70" strokeWidth={1.75} />
            <span className="text-xs text-white/70">Viento</span>
            <span className="text-sm font-semibold">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;

import { useState } from 'react';
import { Droplets, Wind, Gauge, Eye, Sun, Cloud } from 'lucide-react';
import { formatWind } from '../../utils/formatWind';

const MetricCard = ({ icon: Icon, label, value, info }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card p-3 sm:p-4 text-white flex flex-col items-center gap-2">
      <div className="w-full flex justify-center relative">
        <Icon className="w-5 h-5 text-white/60" />
        {info && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Информация"
            className="absolute -top-1 right-0 w-5 h-5 rounded-full border border-white/35 text-white/55 hover:border-white/70 hover:text-white flex items-center justify-center text-xs font-bold leading-none transition-colors"
          >
            !
          </button>
        )}
      </div>
      <span className="text-xs text-white/60 uppercase tracking-widest text-center leading-tight">{label}</span>
      <span className="text-lg sm:text-xl font-semibold">{value}</span>
      {open && info && (
        <p className="text-xs text-white/75 text-center leading-snug border-t border-white/20 pt-2 w-full">
          {info}
        </p>
      )}
    </div>
  );
};

const getUvLabel = (uv) => {
  if (uv === null) return 'н/д';
  return String(Math.round(uv));
};

const MetricsGrid = ({ current, uvIndex }) => {
  const metrics = [
    {
      icon: Droplets,
      label: 'Влажность',
      value: `${current.main.humidity}%`,
    },
    {
      icon: Wind,
      label: 'Ветер',
      value: formatWind(current.wind.speed, current.wind.deg),
    },
    {
      icon: Gauge,
      label: 'Давление',
      value: `${Math.round(current.main.pressure * 0.750064)} мм рт. ст.`,
    },
    {
      icon: Eye,
      label: 'Видимость',
      value: `${Math.round((current.visibility || 0) / 1000)} км`,
      info: 'Расстояние, на котором видны объекты. <1 км — туман, 1–5 км — дымка, 5–10 км — слабая видимость, >10 км — отличная.',
    },
    {
      icon: Sun,
      label: 'UV-индекс',
      value: getUvLabel(uvIndex),
      info: '0–2: низкий · 3–5: умеренный · 6–7: высокий · 8–10: очень высокий · 11+: экстремальный. При значении 3+ рекомендуется защита от солнца.',
    },
    {
      icon: Cloud,
      label: 'Облачность',
      value: `${current.clouds.all}%`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
};

export default MetricsGrid;

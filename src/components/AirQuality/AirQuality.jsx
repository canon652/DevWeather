import { Wind } from 'lucide-react';

const AQI_LEVELS = [
  { label: 'Хорошее',          color: '#4ade80', bg: 'bg-green-400/20',  border: 'border-green-400/40' },
  { label: 'Удовлетворит.',    color: '#a3e635', bg: 'bg-lime-400/20',   border: 'border-lime-400/40' },
  { label: 'Умеренное',        color: '#facc15', bg: 'bg-yellow-400/20', border: 'border-yellow-400/40' },
  { label: 'Плохое',           color: '#f97316', bg: 'bg-orange-500/20', border: 'border-orange-500/40' },
  { label: 'Очень плохое',     color: '#ef4444', bg: 'bg-red-500/20',    border: 'border-red-500/40' },
];

const POLLUTANTS = [
  { key: 'pm2_5', label: 'PM2.5', unit: 'мкг/м³' },
  { key: 'pm10',  label: 'PM10',  unit: 'мкг/м³' },
  { key: 'no2',   label: 'NO₂',   unit: 'мкг/м³' },
  { key: 'o3',    label: 'O₃',    unit: 'мкг/м³' },
];

const AirQuality = ({ airQuality }) => {
  if (!airQuality) return null;

  const aqiIndex = (airQuality.main?.aqi ?? 1) - 1;
  const level = AQI_LEVELS[aqiIndex] ?? AQI_LEVELS[0];
  const components = airQuality.components ?? {};

  return (
    <div className="glass-card mt-4 p-6 text-white">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">Качество воздуха</h3>

      <div className="flex items-center gap-4 mb-5">
        <Wind className="w-7 h-7 flex-shrink-0" style={{ color: level.color }} />
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${level.bg} ${level.border}`}
              style={{ color: level.color }}
            >
              {level.label}
            </span>
            <span className="text-white/50 text-xs">AQI {aqiIndex + 1} / 5</span>
          </div>
          <p className="text-xs text-white/45 mt-1">
            {aqiIndex <= 1
              ? 'Воздух чистый, прогулки безопасны'
              : aqiIndex === 2
              ? 'Чувствительным группам стоит ограничить время на улице'
              : 'Рекомендуется избегать длительного пребывания на улице'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {POLLUTANTS.map(({ key, label, unit }) => (
          <div key={key} className="bg-white/10 rounded-xl p-2 text-center">
            <p className="text-xs text-white/50 mb-1">{label}</p>
            <p className="font-semibold text-sm">{Math.round(components[key] ?? 0)}</p>
            <p className="text-xs text-white/35">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirQuality;

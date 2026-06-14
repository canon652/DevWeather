import { Droplets, Wind, Gauge, Eye, Sun, Cloud } from 'lucide-react';
import { formatWind } from '../../utils/formatWind';

const MetricCard = ({ icon: Icon, label, value }) => (
  <div className="glass-card p-4 text-white flex flex-col items-center gap-2">
    <Icon className="w-5 h-5 text-white/60" />
    <span className="text-xs text-white/60 uppercase tracking-widest">{label}</span>
    <span className="text-xl font-semibold">{value}</span>
  </div>
);

const MetricsGrid = ({ current }) => {
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
      value: `${current.main.pressure} гПа`,
    },
    {
      icon: Eye,
      label: 'Видимость',
      value: `${Math.round((current.visibility || 0) / 1000)} км`,
    },
    {
      icon: Sun,
      label: 'UV-индекс',
      value: 'н/д',
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

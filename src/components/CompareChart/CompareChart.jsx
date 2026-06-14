import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useSettings } from '../../context/SettingsContext';

const COLORS = ['#60a5fa', '#f472b6', '#34d399'];

const mergeHourlyData = (cities) => {
  if (!cities.length) return [];
  const base = cities[0].weatherData.forecast.list.slice(0, 8);
  return base.map((item, idx) => {
    const point = { time: new Date(item.dt * 1000).getHours() + ':00' };
    cities.forEach((city) => {
      const entry = city.weatherData.forecast.list[idx];
      if (entry) point[city.name] = Math.round(entry.main.temp);
    });
    return point;
  });
};

const CompareChart = ({ cities }) => {
  const { units } = useSettings();
  const symbol = units === 'imperial' ? '°F' : '°C';
  const data = mergeHourlyData(cities);

  return (
    <div className="glass-card mt-4 p-6">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">
        Сравнение температур (24 часа)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }}
            tickFormatter={(v) => `${v}${symbol}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(0,0,0,0.7)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
            }}
            formatter={(v) => [`${v}${symbol}`]}
          />
          <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
          {cities.map((city, i) => (
            <Line
              key={city.name}
              type="monotone"
              dataKey={city.name}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;

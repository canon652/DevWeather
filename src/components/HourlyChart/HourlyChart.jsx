import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useSettings } from '../../context/SettingsContext';

const HourlyChart = ({ forecast }) => {
  const { units } = useSettings();
  const symbol = units === 'imperial' ? '°F' : '°C';

  const hourlyData = forecast.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).getHours() + ':00',
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
  }));

  return (
    <div className="glass-card mt-4 p-6">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">
        Почасовой прогноз
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
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
            formatter={(v, name) => [`${v}${symbol}`, name === 'temp' ? 'Температура' : 'Ощущается']}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="feels"
            stroke="#a78bfa"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChart;

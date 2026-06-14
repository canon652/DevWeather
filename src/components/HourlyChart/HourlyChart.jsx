import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useSettings } from '../../context/SettingsContext';

const CustomTooltip = ({ active, payload, label, symbol }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(0,0,0,0.8)', borderRadius: 8, padding: '8px 12px', color: 'white', fontSize: 12 }}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.dataKey === 'pop' ? `${p.value}%` : `${p.value}${symbol}`}
        </p>
      ))}
    </div>
  );
};

const HourlyChart = ({ forecast }) => {
  const { units } = useSettings();
  const symbol = units === 'imperial' ? '°F' : '°C';

  const hourlyData = forecast.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).getHours() + ':00',
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
    pop: Math.round((item.pop || 0) * 100),
  }));

  return (
    <div className="glass-card mt-4 p-6">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">
        Почасовой прогноз
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={hourlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.65)' }}
          />
          <YAxis
            yAxisId="temp"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.65)' }}
            tickFormatter={(v) => `${v}${symbol}`}
          />
          <YAxis
            yAxisId="pop"
            orientation="right"
            domain={[0, 100]}
            stroke="rgba(255,255,255,0.2)"
            tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.4)' }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip symbol={symbol} />} />
          <Bar
            yAxisId="pop"
            dataKey="pop"
            name="Осадки"
            fill="rgba(96,165,250,0.3)"
            radius={[3, 3, 0, 0]}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temp"
            name="Температура"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="feels"
            name="Ощущается"
            stroke="#a78bfa"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 4"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyChart;

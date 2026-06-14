import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Droplets, Wind, Gauge } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { formatTemp } from '../../utils/formatTemp';
import { formatWind } from '../../utils/formatWind';

const FULL_DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const MONTHS = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

const DayDetail = ({ date, items }) => {
  const { units } = useSettings();
  const symbol = units === 'imperial' ? '°F' : '°C';

  const d = new Date(date);
  const title = `${FULL_DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;

  const chartData = items.map((item) => ({
    time: new Date(item.dt * 1000).getHours() + ':00',
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
    humidity: item.main.humidity,
  }));

  return (
    <div className="glass-card mt-4 p-6 text-white">
      <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>

      {/* Hourly cards */}
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide mb-6">
        {items.map((item) => {
          const hour = new Date(item.dt * 1000).getHours();
          const icon = item.weather[0].icon;
          return (
            <div
              key={item.dt}
              className="flex flex-col items-center gap-1 min-w-[70px] flex-shrink-0 bg-white/10 rounded-xl p-3"
            >
              <span className="text-xs text-white/60">{hour}:00</span>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={item.weather[0].description}
                className="w-9"
              />
              <span className="text-sm font-semibold">{formatTemp(item.main.temp, units)}</span>
              <span className="text-xs text-white/50 flex items-center gap-0.5">
                <Droplets className="w-3 h-3" />{item.main.humidity}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Temperature chart */}
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.7)' }}
            tickFormatter={(v) => `${v}${symbol}`}
          />
          <Tooltip
            contentStyle={{ background: 'rgba(0,0,0,0.75)', border: 'none', borderRadius: '8px', color: 'white' }}
            formatter={(v, name) => [`${v}${symbol}`, name === 'temp' ? 'Температура' : 'Ощущается']}
          />
          <Line type="monotone" dataKey="temp" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3, fill: '#60a5fa' }} />
          <Line type="monotone" dataKey="feels" stroke="#a78bfa" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats summary */}
      {items[0] && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center gap-1">
            <Droplets className="w-4 h-4 text-white/50" />
            <span className="text-xs text-white/50">Влажность</span>
            <span className="font-semibold">{items[0].main.humidity}%</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center gap-1">
            <Wind className="w-4 h-4 text-white/50" />
            <span className="text-xs text-white/50">Ветер</span>
            <span className="font-semibold text-sm">{formatWind(items[0].wind.speed, items[0].wind.deg)}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center gap-1">
            <Gauge className="w-4 h-4 text-white/50" />
            <span className="text-xs text-white/50">Давление</span>
            <span className="font-semibold text-sm">{Math.round(items[0].main.pressure * 0.750064)} мм рт. ст.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayDetail;

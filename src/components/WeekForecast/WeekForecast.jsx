import { useSettings } from '../../context/SettingsContext';
import { formatTemp } from '../../utils/formatTemp';

const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const groupByDay = (list) => {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.entries(days).slice(0, 7).map(([date, items]) => ({
    date,
    dayName: DAYS[new Date(date).getDay()],
    minTemp: Math.round(Math.min(...items.map((i) => i.main.temp_min))),
    maxTemp: Math.round(Math.max(...items.map((i) => i.main.temp_max))),
    icon: items[4]?.weather[0].icon || items[0].weather[0].icon,
    desc: items[4]?.weather[0].description || items[0].weather[0].description,
  }));
};

const WeekForecast = ({ forecast }) => {
  const { units } = useSettings();
  const days = groupByDay(forecast.list);

  return (
    <div className="glass-card mt-4 p-6">
      <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">
        Прогноз на неделю
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center gap-1 text-white min-w-[80px] flex-shrink-0 glass-card p-3"
          >
            <span className="text-xs text-white/60 uppercase">{day.dayName}</span>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.desc}
              className="w-10"
            />
            <span className="text-sm font-semibold">{formatTemp(day.maxTemp, units)}</span>
            <span className="text-xs text-white/50">{formatTemp(day.minTemp, units)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekForecast;

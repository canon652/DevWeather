import { useSettings } from '../../context/SettingsContext';
import { formatTemp } from '../../utils/formatTemp';

const HourlyForecast = ({ forecast, current }) => {
  if (!forecast?.list?.length) return null;

  const { units } = useSettings();

  // Get today's date string in local time
  const todayStr = new Date().toLocaleDateString('sv'); // "2026-06-16"

  // Filter forecast items that belong to today, plus add "сейчас" from current weather
  const todayItems = forecast.list.filter((item) => {
    const d = new Date(item.dt * 1000);
    return d.toLocaleDateString('sv') === todayStr;
  });

  // If no today items yet (early morning edge case), show next 8 slots
  const items = todayItems.length > 0 ? todayItems : forecast.list.slice(0, 8);

  // Prepend current conditions as "Сейчас"
  const nowItem = current
    ? {
        dt: null,
        isNow: true,
        main: { temp: current.main.temp, feels_like: current.main.feels_like },
        weather: current.weather,
        pop: 0,
      }
    : null;

  const all = nowItem ? [nowItem, ...items] : items;

  return (
    <div className="glass-card mt-4 p-4 overflow-hidden">
      <p className="text-white/50 text-xs uppercase tracking-widest mb-3 px-1">
        Погода на сегодня
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {all.map((item, i) => {
          const icon = item.weather[0].icon;
          const time = item.isNow
            ? 'Сейчас'
            : new Date(item.dt * 1000).toLocaleTimeString('ru', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
          const temp = formatTemp(item.main.temp, units);
          const pop = Math.round((item.pop || 0) * 100);

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-1 px-3 py-3 rounded-2xl flex-1 min-w-[72px] transition-colors hover:bg-white/15"
            >
              <span className="text-white/60 text-xs font-medium whitespace-nowrap">
                {time}
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt={item.weather[0].description}
                className="w-9 h-9"
              />
              <span className="text-white font-semibold text-sm">{temp}</span>
              {pop > 10 && (
                <span className="text-blue-300 text-xs">💧{pop}%</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;

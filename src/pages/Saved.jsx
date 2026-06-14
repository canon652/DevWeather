import { Star, X, Thermometer, Wind, Droplets } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWeather } from '../hooks/useWeather';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/formatTemp';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { useState } from 'react';

const SORT_OPTIONS = [
  { value: 'date', label: 'По дате' },
  { value: 'name', label: 'По алфавиту' },
  { value: 'temp', label: 'По температуре' },
];

const SavedCityCard = ({ city, units, onRemove }) => {
  const { data, loading } = useWeather(city.lat, city.lon, units);

  if (loading) return <Skeleton className="h-36" />;
  if (!data) return null;

  const { current } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

  return (
    <div className="glass-card p-5 text-white relative">
      <button
        onClick={() => onRemove(city.lat)}
        aria-label={`Удалить ${city.name} из избранного`}
        className="absolute top-3 right-3 p-1 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-lg">{city.name}</p>
          <p className="text-white/50 text-xs">{city.country}</p>
        </div>
        <img src={iconUrl} alt={current.weather[0].description} className="w-12" />
      </div>

      <p className="text-4xl font-bold mb-2">
        {formatTemp(current.main.temp, units)}
      </p>
      <p className="capitalize text-sm text-white/70 mb-3">
        {current.weather[0].description}
      </p>

      <div className="flex gap-3 text-xs text-white/50">
        <span className="flex items-center gap-1">
          <Droplets className="w-3 h-3" /> {current.main.humidity}%
        </span>
        <span className="flex items-center gap-1">
          <Wind className="w-3 h-3" /> {Math.round(current.wind.speed)} м/с
        </span>
        <span className="flex items-center gap-1">
          <Thermometer className="w-3 h-3" />
          Ощущ. {formatTemp(current.main.feels_like, units)}
        </span>
      </div>
    </div>
  );
};

const Saved = () => {
  const [savedCities, setSavedCities] = useLocalStorage('savedCities', []);
  const { units } = useSettings();
  const [sortBy, setSortBy] = useState('date');

  const removeCity = (lat) =>
    setSavedCities(savedCities.filter((c) => c.lat !== lat));

  const sorted = [...savedCities].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'date') return b.addedAt - a.addedAt;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Star className="w-7 h-7 text-yellow-300 fill-yellow-300" />
            <h1 className="text-2xl font-bold text-white">Избранное</h1>
          </div>

          {savedCities.length > 0 && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/20 text-white border border-white/30 text-sm outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-gray-800">
                  {o.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {savedCities.length === 0 && (
          <div className="flex flex-col items-center justify-center text-white/60 py-24 gap-4">
            <Star className="w-20 h-20 text-white/20" />
            <p className="text-xl">Нет избранных городов</p>
            <p className="text-sm text-white/40">
              Нажмите ★ на карточке погоды, чтобы добавить город
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sorted.map((city) => (
            <SavedCityCard
              key={city.lat}
              city={city}
              units={units}
              onRemove={removeCity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saved;

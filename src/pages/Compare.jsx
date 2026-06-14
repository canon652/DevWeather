import { useState, useEffect } from 'react';
import { X, BarChart2 } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import CompareChart from '../components/CompareChart/CompareChart';
import { useWeather } from '../hooks/useWeather';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/formatTemp';
import { formatWind } from '../utils/formatWind';
import { Skeleton } from '../components/Skeleton/Skeleton';

const CHIP_COLORS = ['bg-blue-500/40', 'bg-pink-500/40', 'bg-emerald-500/40'];

const CityChip = ({ city, index, onRemove, units, onDataReady }) => {
  const { data } = useWeather(city.lat, city.lon, units);

  useEffect(() => {
    if (data) onDataReady(data);
  }, [data]);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm ${CHIP_COLORS[index % 3]} backdrop-blur border border-white/20`}>
      <span>{city.name}</span>
      {data && (
        <span className="text-white/70">{formatTemp(data.current.main.temp, units)}</span>
      )}
      <button onClick={onRemove} aria-label={`Удалить ${city.name}`}>
        <X className="w-3.5 h-3.5 text-white/60 hover:text-white" />
      </button>
    </div>
  );
};

const CompareTable = ({ cities, units }) => (
  <div className="glass-card mt-4 p-6 overflow-x-auto">
    <h3 className="text-white/70 text-sm uppercase tracking-widest mb-4">
      Сравнительная таблица
    </h3>
    <table className="w-full text-white text-sm">
      <thead>
        <tr className="text-white/50 border-b border-white/10">
          <th className="text-left py-2 pr-4">Показатель</th>
          {cities.map((c) => (
            <th key={c.lat} className="text-center py-2 px-2">{c.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          { label: 'Температура', getValue: (d) => formatTemp(d.current.main.temp, units) },
          { label: 'Влажность', getValue: (d) => `${d.current.main.humidity}%` },
          { label: 'Ветер', getValue: (d) => formatWind(d.current.wind.speed, d.current.wind.deg) },
          { label: 'Давление', getValue: (d) => `${d.current.main.pressure} гПа` },
          { label: 'Погода', getValue: (d) => d.current.weather[0].description },
        ].map((row) => (
          <tr key={row.label} className="border-b border-white/5">
            <td className="py-3 pr-4 text-white/60">{row.label}</td>
            {cities.map((c) => (
              <td key={c.lat} className="py-3 px-2 text-center capitalize">
                {row.getValue(c)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Compare = () => {
  const [cities, setCities] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const { units } = useSettings();

  const addCity = (city) => {
    if (cities.length >= 3) return;
    if (cities.find((c) => c.lat === city.lat)) return;
    setCities((prev) => [...prev, city]);
  };

  const removeCity = (lat) => {
    setCities((prev) => prev.filter((c) => c.lat !== lat));
    setCitiesData((prev) => prev.filter((c) => c.lat !== lat));
  };

  const handleDataReady = (city, data) => {
    setCitiesData((prev) => {
      const filtered = prev.filter((c) => c.lat !== city.lat);
      return [...filtered, { ...city, weatherData: data }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart2 className="w-7 h-7 text-blue-300" />
          <h1 className="text-2xl font-bold text-white">Сравнение городов</h1>
        </div>

        {cities.length < 3 && <SearchBar onSelect={addCity} />}

        {cities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {cities.map((city, i) => (
              <CityChip
                key={city.lat}
                city={city}
                index={i}
                onRemove={() => removeCity(city.lat)}
                units={units}
                onDataReady={(data) => handleDataReady(city, data)}
              />
            ))}
          </div>
        )}

        {citiesData.length >= 2 && <CompareChart cities={citiesData} />}
        {citiesData.length > 0 && <CompareTable cities={citiesData} units={units} />}

        {cities.length === 0 && (
          <div className="flex flex-col items-center justify-center text-white/60 py-24 gap-4">
            <BarChart2 className="w-20 h-20 text-white/30" />
            <p className="text-xl">Добавьте до 3 городов для сравнения</p>
            <p className="text-sm text-white/40">Поиск доступен выше — введите название города</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;

import { useState } from 'react';
import { CloudSun } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import MetricsGrid from '../components/MetricsGrid/MetricsGrid';
import SunriseSunset from '../components/SunriseSunset/SunriseSunset';
import HourlyChart from '../components/HourlyChart/HourlyChart';
import WeekForecast, { groupByDay } from '../components/WeekForecast/WeekForecast';
import DayDetail from '../components/DayDetail/DayDetail';
import { DashboardSkeleton } from '../components/Skeleton/Skeleton';
import { useWeather } from '../hooks/useWeather';
import { useSettings } from '../context/SettingsContext';
import { getBackground } from '../utils/weatherBackground';
import { useLocalStorage } from '../hooks/useLocalStorage';

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-white/60 py-24 gap-4">
    <CloudSun className="w-20 h-20 text-white/30" />
    <p className="text-xl">Введите город, чтобы узнать погоду</p>
    <p className="text-sm text-white/40">Или нажмите на иконку геолокации</p>
  </div>
);

const Dashboard = () => {
  const [lastCity, setLastCity] = useLocalStorage('lastCity', null);
  const [coords, setCoords] = useState(lastCity);
  const [selectedDate, setSelectedDate] = useState(null);
  const { units } = useSettings();
  const { data, loading, error } = useWeather(coords?.lat, coords?.lon, units);

  const bgClass = data
    ? getBackground(data.current.weather[0].id, data.current.sys)
    : 'from-sky-400 to-blue-600';

  const handleSelect = (city) => {
    setCoords(city);
    setLastCity(city);
    setSelectedDate(null);
  };

  const selectedDayItems = selectedDate && data
    ? groupByDay(data.forecast.list).find((d) => d.date === selectedDate)?.items
    : null;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-1000`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SearchBar onSelect={handleSelect} />

        {!coords && !loading && <EmptyState />}
        {loading && <DashboardSkeleton />}
        {error && (
          <div className="mt-8 glass-card p-6 text-center">
            <p className="text-red-300 text-lg">{error}</p>
            <p className="text-white/50 text-sm mt-2">Проверьте название города или API ключ</p>
          </div>
        )}
        {data && !loading && (
          <>
            <WeatherCard current={data.current} />
            <MetricsGrid current={data.current} />
            <SunriseSunset sys={data.current.sys} />
            <HourlyChart forecast={data.forecast} />
            <WeekForecast
              forecast={data.forecast}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            {selectedDate && selectedDayItems && (
              <DayDetail date={selectedDate} items={selectedDayItems} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

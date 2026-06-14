import { Star } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { formatTemp } from '../../utils/formatTemp';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const WeatherCard = ({ current }) => {
  const { units } = useSettings();
  const [savedCities, setSavedCities] = useLocalStorage('savedCities', []);
  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;

  const isSaved = savedCities.some((c) => c.lat === current.coord?.lat);

  const toggleSave = () => {
    if (isSaved) {
      setSavedCities(savedCities.filter((c) => c.lat !== current.coord?.lat));
    } else {
      setSavedCities([
        ...savedCities,
        {
          lat: current.coord?.lat,
          lon: current.coord?.lon,
          name: current.name,
          country: current.sys.country,
          addedAt: Date.now(),
        },
      ]);
    }
  };

  return (
    <div className="glass-card mt-6 p-8 text-white text-center relative animate-fade-in">
      <button
        onClick={toggleSave}
        aria-label={isSaved ? 'Удалить из избранного' : 'Добавить в избранное'}
        className="absolute top-4 right-4 text-white/60 hover:text-yellow-300 transition-colors"
      >
        <Star className={`w-6 h-6 ${isSaved ? 'fill-yellow-300 text-yellow-300' : ''}`} />
      </button>

      <p className="text-lg text-white/70">
        {current.name}, {current.sys.country}
      </p>

      <div className="flex items-center justify-center gap-4 my-4">
        <img
          src={iconUrl}
          alt={current.weather[0].description}
          className="w-24"
        />
        <span className="text-8xl font-bold">
          {formatTemp(current.main.temp, units)}
        </span>
      </div>

      <p className="capitalize text-xl text-white/90">
        {current.weather[0].description}
      </p>
      <p className="text-white/60 mt-2">
        Ощущается как {formatTemp(current.main.feels_like, units)}
      </p>
    </div>
  );
};

export default WeatherCard;

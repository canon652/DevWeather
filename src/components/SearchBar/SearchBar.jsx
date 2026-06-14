import { useState, useRef, useCallback, useEffect } from 'react';
import { MapPin, X, Search } from 'lucide-react';
import { searchCity, getCityName, getCityLabel } from '../../api/geocodingApi';
import { useGeolocation } from '../../hooks/useGeolocation';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef(null);
  const { geoLoading, getLocation, coords } = useGeolocation();

  useEffect(() => {
    if (coords) {
      onSelect({ lat: coords.lat, lon: coords.lon, name: 'Моё местоположение' });
      setQuery('Моё местоположение');
    }
  }, [coords]);

  const handleInput = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceRef.current);
    if (value.length < 2) { setResults([]); setIsOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchCity(value);
        setResults(data);
        setIsOpen(true);
      } catch {}
    }, 300);
  }, []);

  const handleSelect = (item) => {
    const name = getCityName(item);
    onSelect({ lat: item.lat, lon: item.lon, name, country: item.country });
    setQuery(name);
    setIsOpen(false);
    setResults([]);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
        <input
          value={query}
          onChange={handleInput}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          placeholder="Введите город..."
          className="w-full pl-9 pr-9 py-3 rounded-2xl backdrop-blur-md bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none focus:border-white/60 transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Очистить поиск"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {isOpen && results.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white/90 backdrop-blur rounded-xl shadow-lg z-50 overflow-hidden">
            {results.map((item) => (
              <li
                key={`${item.lat}-${item.lon}`}
                onClick={() => handleSelect(item)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm border-b last:border-0"
              >
                {getCityLabel(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={getLocation}
        disabled={geoLoading}
        aria-label="Определить местоположение"
        className="px-4 py-3 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors disabled:opacity-50"
      >
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;

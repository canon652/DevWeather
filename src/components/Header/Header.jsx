import { Link, useLocation } from 'react-router-dom';
import { Cloud, BarChart2, Star, Thermometer } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useSettings } from '../../context/SettingsContext';

const getHeaderBg = (code, day) => {
  if (!code) return 'bg-slate-900/85';
  if (!day) return 'bg-indigo-950/90';
  if (code >= 200 && code < 300) return 'bg-gray-800/90';
  if (code >= 300 && code < 600) return 'bg-slate-700/85';
  if (code >= 600 && code < 700) return 'bg-slate-600/85';
  if (code >= 700 && code < 800) return 'bg-gray-600/85';
  if (code === 800) return 'bg-sky-600/85';
  if (code > 800) return 'bg-blue-700/85';
  return 'bg-slate-900/85';
};

const Header = () => {
  const location = useLocation();
  const { units, setUnits, weatherCode, isDay } = useSettings();
  const headerBg = getHeaderBg(weatherCode, isDay);

  const navItems = [
    { to: '/', label: 'Главная', icon: Cloud },
    { to: '/compare', label: 'Сравнение', icon: BarChart2 },
    { to: '/saved', label: 'Избранное', icon: Star },
  ];

  return (
    <header className={`backdrop-blur-md ${headerBg} border-b border-white/15 sticky top-0 z-40 transition-colors duration-1000`}>
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl flex-shrink-0">
          <Cloud className="w-6 h-6 text-blue-300" />
          <span className="hidden sm:inline">DevWeather</span>
        </div>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl text-sm transition-colors ${
                location.pathname === to
                  ? 'bg-white/25 text-white font-medium'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}
            aria-label="Переключить единицы температуры"
            className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors text-sm"
          >
            <Thermometer className="w-4 h-4 hidden sm:block" />
            {units === 'metric' ? '°C' : '°F'}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

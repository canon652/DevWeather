import { Link, useLocation } from 'react-router-dom';
import { Cloud, BarChart2, Star, Thermometer } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useSettings } from '../../context/SettingsContext';

const Header = () => {
  const location = useLocation();
  const { units, setUnits } = useSettings();

  const navItems = [
    { to: '/', label: 'Главная', icon: Cloud },
    { to: '/compare', label: 'Сравнение', icon: BarChart2 },
    { to: '/saved', label: 'Избранное', icon: Star },
  ];

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Cloud className="w-6 h-6 text-blue-300" />
          DevWeather
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                location.pathname === to
                  ? 'bg-white/25 text-white font-medium'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}
            aria-label="Переключить единицы температуры"
            className="flex items-center gap-1 px-3 py-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors text-sm"
          >
            <Thermometer className="w-4 h-4" />
            {units === 'metric' ? '°C' : '°F'}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

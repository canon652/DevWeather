import { Sun, Moon } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useSettings();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Переключить тему"
      className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;

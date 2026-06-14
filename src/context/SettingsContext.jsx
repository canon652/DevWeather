import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [units, setUnits] = useLocalStorage('units', 'metric');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [weatherCode, setWeatherCode] = useState(null);
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const setWeatherInfo = (code, day) => {
    setWeatherCode(code);
    setIsDay(day);
  };

  return (
    <SettingsContext.Provider value={{ units, setUnits, theme, setTheme, weatherCode, isDay, setWeatherInfo }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

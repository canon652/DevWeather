const BASE = 'https://api.openweathermap.org/data/2.5';
const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchCurrentWeather = async (lat, lon, units = 'metric') => {
  const res = await fetch(
    `${BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=ru&appid=${KEY}`
  );
  if (!res.ok) throw new Error('Ошибка получения погоды');
  return res.json();
};

export const fetchForecast = async (lat, lon, units = 'metric') => {
  const res = await fetch(
    `${BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=ru&appid=${KEY}`
  );
  if (!res.ok) throw new Error('Ошибка получения прогноза');
  return res.json();
};

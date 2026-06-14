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

// Open-Meteo — бесплатно, без ключа
export const fetchUvIndex = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max&timezone=auto&forecast_days=1`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.daily?.uv_index_max?.[0] ?? null;
  } catch { return null; }
};

// Open-Meteo Marine API — возвращает null для inland городов
export const fetchSeaTemp = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=sea_surface_temperature`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.current?.sea_surface_temperature ?? null;
  } catch { return null; }
};

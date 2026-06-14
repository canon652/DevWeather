const BASE_GEO = 'https://api.openweathermap.org/geo/1.0';
const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const searchCity = async (query) => {
  const res = await fetch(
    `${BASE_GEO}/direct?q=${encodeURIComponent(query)}&limit=6&appid=${KEY}`,
  );
  if (!res.ok) throw new Error('Ошибка поиска города');
  return res.json();
};

export const getCityName = (item) =>
  item.local_names?.ru || item.local_names?.en || item.name;

export const getCityLabel = (item) => {
  const name = getCityName(item);
  const parts = [name, item.state, item.country].filter(Boolean);
  return parts.join(', ');
};

export const searchCity = async (query) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
    { headers: { 'Accept-Language': 'ru,en' } }
  );
  if (!res.ok) throw new Error('Ошибка поиска города');
  return res.json();
};

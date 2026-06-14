import { useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../api/weatherApi';
import { getCached, setCached } from '../utils/cache';

export const useWeather = (lat, lon, units = 'metric') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const cacheKey = `${lat}_${lon}_${units}`;
    const cached = getCached(cacheKey);
    if (cached) { setData(cached); return; }

    setLoading(true);
    setError(null);

    Promise.all([
      fetchCurrentWeather(lat, lon, units),
      fetchForecast(lat, lon, units),
    ])
      .then(([current, forecast]) => {
        const result = { current, forecast };
        setData(result);
        setCached(cacheKey, result);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lat, lon, units]);

  return { data, loading, error };
};

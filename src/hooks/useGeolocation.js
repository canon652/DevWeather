import { useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Геолокация не поддерживается браузером');
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoLoading(false);
      },
      (err) => { setGeoError(err.message); setGeoLoading(false); }
    );
  };

  return { coords, geoLoading, geoError, getLocation };
};

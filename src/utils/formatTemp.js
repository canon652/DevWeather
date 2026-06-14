export const formatTemp = (temp, units) =>
  units === 'imperial'
    ? `${Math.round(temp)}°F`
    : `${Math.round(temp)}°C`;

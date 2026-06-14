const DIRS = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

export const formatWind = (speed, deg) => {
  const dir = DIRS[Math.round(deg / 45) % 8];
  return `${Math.round(speed)} м/с ${dir}`;
};

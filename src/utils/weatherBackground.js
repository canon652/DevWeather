export const getBackground = (weatherCode, sys) => {
  const now = Date.now() / 1000;
  const isDay = now > sys.sunrise && now < sys.sunset;

  if (!isDay) return 'from-slate-900 via-blue-950 to-slate-900';

  if (weatherCode >= 200 && weatherCode < 300)
    return 'from-gray-700 via-slate-800 to-gray-900';
  if (weatherCode >= 300 && weatherCode < 400)
    return 'from-slate-500 via-blue-700 to-slate-600';
  if (weatherCode >= 500 && weatherCode < 600)
    return 'from-slate-600 via-blue-800 to-slate-700';
  if (weatherCode >= 600 && weatherCode < 700)
    return 'from-slate-200 via-blue-200 to-slate-300';
  if (weatherCode >= 700 && weatherCode < 800)
    return 'from-gray-400 via-slate-400 to-gray-500';
  if (weatherCode === 800)
    return 'from-sky-400 via-blue-500 to-blue-600';
  if (weatherCode > 800)
    return 'from-blue-300 via-slate-400 to-blue-500';

  return 'from-sky-400 to-blue-600';
};

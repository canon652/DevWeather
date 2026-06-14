const CACHE_TTL = 30 * 60 * 1000;

export const getCached = (key) => {
  try {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;
    const { data, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    return data;
  } catch { return null; }
};

export const setCached = (key, data) => {
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
};

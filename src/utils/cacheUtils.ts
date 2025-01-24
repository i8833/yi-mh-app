const CACHE_PREFIX = 'divination_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24小时

interface CacheItem<T> {
  value: T;
  timestamp: number;
}

export const cacheUtils = {
  set: <T>(key: string, value: T): void => {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  },

  get: <T>(key: string): T | null => {
    const data = localStorage.getItem(CACHE_PREFIX + key);
    if (!data) return null;

    const item: CacheItem<T> = JSON.parse(data);
    if (Date.now() - item.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return item.value;
  },

  clear: (key?: string): void => {
    if (key) {
      localStorage.removeItem(CACHE_PREFIX + key);
    } else {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    }
  }
}; 
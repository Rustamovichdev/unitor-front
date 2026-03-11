/**
 * Safe localStorage wrapper with optional SSR guard.
 */

const isBrowser = typeof window !== "undefined";

export const storage = {
  getItem<T>(key: string): T | null {
    if (!isBrowser) return null;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  setItem<T>(key: string, value: T): void {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  },

  removeItem(key: string): void {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },

  clear(): void {
    if (!isBrowser) return;
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  },
};

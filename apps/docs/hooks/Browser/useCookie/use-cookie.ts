import { useState, useCallback, useEffect } from 'react';

interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

type UseCookieReturn = [
  string | null,
  (newValue: string, options?: CookieOptions) => void,
  () => void,
];

const isServer = typeof window === 'undefined';

export function useCookie(key: string, initialValue?: string): UseCookieReturn {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    if (isServer) {
      return initialValue ?? null;
    }
    try {
      const item = window.document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1];
      return item ? decodeURIComponent(item) : initialValue ?? null;
    } catch (error) {
      console.error(`Error reading cookie "${key}":`, error);
      return initialValue ?? null;
    }
  });

  const setValue = useCallback(
    (value: string, options: CookieOptions = {}) => {
      try {
        const encodedValue = encodeURIComponent(value);
        const cookieValue = `${key}=${encodedValue}`;
        const cookieOptions = Object.entries(options).reduce(
          (acc, [key, value]) => {
            if (key === 'expires' && typeof value === 'number') {
              return `${acc}; expires=${new Date(value).toUTCString()}`;
            }
            return `${acc}; ${key}=${value}`;
          },
          cookieValue,
        );

        window.document.cookie = cookieOptions;
        setStoredValue(value);
      } catch (error) {
        console.error(`Error setting cookie "${key}":`, error);
      }
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      setStoredValue(null);
    } catch (error) {
      console.error(`Error removing cookie "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    if (!isServer && initialValue !== undefined && storedValue === null) {
      setValue(initialValue);
    }
  }, [initialValue, setValue, storedValue]);

  return [storedValue, setValue, removeValue];
}

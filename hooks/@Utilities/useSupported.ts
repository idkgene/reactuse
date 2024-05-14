import { useState, useEffect } from 'react';

export function useSupported(callback: () => unknown): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    try {
      const result = callback();
      setIsSupported(Boolean(result));
    } catch {
      setIsSupported(false);
    }
  }, [callback]);

  return isSupported;
}
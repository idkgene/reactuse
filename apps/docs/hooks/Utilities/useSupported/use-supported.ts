import { useEffect, useState } from 'react';
import { type SupportCheckCallback } from '../utilities';

export function useSupported(callback: SupportCheckCallback): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const checkSupport = async (): Promise<void> => {
      try {
        const result = await Promise.resolve(callback());
        if (isMounted) {
          setIsSupported(Boolean(result));
        }
      } catch (error) {
        if (isMounted) {
          setIsSupported(false);
        }

        console.error('Error in support check:', error);

        throw new Error(
          `Failed to check support: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    };

    void checkSupport();

    return () => {
      isMounted = false;
    };
  }, [callback]);

  return isSupported;
}

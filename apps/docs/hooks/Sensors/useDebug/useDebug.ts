import { useMemo } from 'react';
import { useIsClient } from '@/hooks/Browser/useIsClient/use-is-client';

export const useDebug = () => {
  const isClient = useIsClient();

  const debug = useMemo(() => {
    if (isClient) {
      const hasDebugHash = window.location.hash.includes('#debug');
      const isDevelopment = process.env.NODE_ENV === 'development';

      const isNotProduction = !window.location.hash.includes('#production');

      return (hasDebugHash || isDevelopment) && isNotProduction;
    }

    return false;
  }, [isClient]);

  return debug;
};

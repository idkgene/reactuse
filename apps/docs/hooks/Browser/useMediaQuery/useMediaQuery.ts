import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsClient } from '../useIsClient/use-is-client';

interface MediaQueryEvent {
  matches: boolean;
  media: string;
}

export function useMediaQuery(queryString: string): boolean | undefined {
  const isClient = useIsClient();

  const mediaQuery: MediaQueryList | null = useMemo(() => {
    if (isClient) {
      try {
        return window.matchMedia(queryString);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error creating `MediaQueryList`:', error);
        }
      }
    }

    return null;
  }, [queryString, isClient]);

  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);

  const onChange = useCallback((event: MediaQueryEvent) => {
    setIsMatch(event.matches);
  }, []);

  useEffect(() => {
    if (mediaQuery) {
      setIsMatch(mediaQuery.matches);

      mediaQuery.addEventListener('change', onChange);

      return () => {
        mediaQuery.removeEventListener('change', onChange);
      };
    }
  }, [mediaQuery, onChange]);

  return isMatch;
}

import { useEffect, useState } from 'react';

export type ReducedMotionState = 'no-preference' | 'reduce';

export function usePreferredReducedMotion(): ReducedMotionState {
  const [preferredMotion, setPreferredMotion] =
    useState<ReducedMotionState>('no-preference');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreferredMotion = (e: MediaQueryListEvent) => {
      setPreferredMotion(e.matches ? 'reduce' : 'no-preference');
    };

    setPreferredMotion(mediaQuery.matches ? 'reduce' : 'no-preference');

    mediaQuery.addEventListener('change', updatePreferredMotion);

    return () => {
      mediaQuery.removeEventListener('change', updatePreferredMotion);
    };
  }, []);

  return preferredMotion;
}

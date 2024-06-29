import { useState, useEffect, useCallback } from 'react';

interface UseBreakpointResult {
  windowWidth: number;
  isBreakpointCrossed: boolean;
}

export function useBreakpoint(breakpoint: number): UseBreakpointResult {
  if (typeof breakpoint !== 'number' || breakpoint <= 0) {
    throw new Error('Breakpoint must be a positive number');
  }

  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  const [isBreakpointCrossed, setIsBreakpointCrossed] = useState<boolean>(
    () => {
      if (typeof window !== 'undefined') {
        return window.innerWidth >= breakpoint;
      }
      return false;
    },
  );

  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);
      setIsBreakpointCrossed(newWindowWidth >= breakpoint);
    }
  }, [breakpoint]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize]);

  return { windowWidth, isBreakpointCrossed };
}

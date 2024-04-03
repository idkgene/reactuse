import { useState } from 'react';
import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * @returns {WindowSize} The current window size.
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEventListener('resize', handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []); // Empty dependency array to run the effect only once on mount

  return windowSize;
};
import { useState, useEffect, useCallback } from 'react';

type WindowSize = {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
};

/**
 * The function `useWindowResize` in TypeScript is a custom React hook that tracks and returns the
 * window's inner and outer dimensions on resize.
 * @returns The `useWindowResize` custom hook is returning an object containing the current window size
 * information. The object has the following properties:
 */

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};

export default useWindowResize;
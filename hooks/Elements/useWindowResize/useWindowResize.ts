import { useCallback, useEffect, useState } from 'react';

/**
 * Type representing the dimensions of a window.
 *
 * @type {Object} WindowSize
 * @property {number} innerWidth - The width of the browser window's viewport, including scrollbars.
 * @property {number} innerHeight - The height of the browser window's viewport, including scrollbars.
 * @property {number} outerWidth - The width of the entire browser window, including sidebar, window chrome, and scrollbars.
 * @property {number} outerHeight - The height of the entire browser window, including toolbar, window chrome, and scrollbars.
 */
type WindowSize = {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
};

/**
 * A custom hook that provides the current window size and udpates it on window resize.
 * 
 * @returns {WindowSize} An object containing the current window size dimensions.
 * 
 * @example
 * const { innerWidth, innerHeight, outerWidth, outerHeight } = useWindowResize();
 */
export function useWindowResize(): WindowSize {
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
}

import { useState, useEffect, useCallback } from 'react';

type WindowSize = {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
};

/**
 * Custom React hook that tracks and returns the window's inner and outer dimensions on resize.
 * @returns An object containing the current window size information.
 */
const useWindowResize = () => {
  // Initialize the window size state with default values
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      };
    }
    // Return default values for non-browser environments
    return {
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0,
    };
  });

  // Memoized callback function to handle the window resize event
  const handleResize = useCallback(() => {
    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      });
    }
  }, []);

  useEffect(() => {
    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      // Attach the resize event listener
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleResize]);

  return windowSize;
};

export default useWindowResize;
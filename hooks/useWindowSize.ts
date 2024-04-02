import { useState } from 'react';
import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Custom hook that returns the current size of the window.
 * @returns {WindowSize} The current window size.
 */
export const useWindowSize = (): WindowSize => {
  // State variable to store the current window size
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  // Function to update the window size state
  const handleSize = () => {
    // Check if the window object is available (browser environment)
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  // Use the useEventListener hook to attach the resize event listener
  useEventListener('resize', handleSize);

  // Use the useIsomorphicLayoutEffect hook to update the window size on component mount
  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []); // Empty dependency array to run the effect only once on mount

  return windowSize;
};
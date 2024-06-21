import { useState, useEffect } from 'react';

/**
 * Type representing the scroll position of the window.
 *
 * @interface ScrollPosition
 * @property {number} x - The horizontal scroll position of the window.
 * @property {number} y - The vertical scroll position of the window.
 */
interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Custom hook that returns the current scroll position of the window.
 *
 * @returns {ScrollPosition} The current scroll position of the window.
 *
 * @example
 * const { x, y } = useScrollPosition();
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: window.scrollX,
    y: window.scrollY,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}

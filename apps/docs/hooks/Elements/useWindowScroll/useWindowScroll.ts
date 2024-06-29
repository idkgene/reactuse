import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

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

import { useRef, useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollOptions {
  throttleMs?: number;
}

interface UseElementScrollPositionReturn {
  ref: React.RefObject<HTMLElement>;
  scrollPosition: ScrollPosition;
  scrollTo: (x: number, y: number) => void;
}

export function useElementScrollPosition(
  options: ScrollOptions = {},
): UseElementScrollPositionReturn {
  const { throttleMs = 100 } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  const lastUpdateRef = useRef<number>(0);

  const getScrollPosition = useCallback((): ScrollPosition => {
    if (!elementRef.current) {
      return { x: 0, y: 0 };
    }
    return {
      x: elementRef.current.scrollLeft,
      y: elementRef.current.scrollTop,
    };
  }, []);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateRef.current >= throttleMs) {
      setScrollPosition(getScrollPosition());
      lastUpdateRef.current = now;
    }
  }, [getScrollPosition, throttleMs]);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const scrollTo = useCallback((x: number, y: number) => {
    if (elementRef.current) {
      elementRef.current.scrollTo(x, y);
    }
  }, []);

  return { ref: elementRef, scrollPosition, scrollTo };
}

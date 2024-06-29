import { useRef, useState, useEffect, useCallback } from 'react';

interface Dimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface UseElementDimensionsOptions {
  debounceMs?: number;
}

interface UseElementDimensionsReturn {
  ref: React.RefObject<HTMLElement>;
  dimensions: Dimensions | null;
  updateDimensions: () => void;
}

const initialDimensions: Dimensions = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export function useElementDimensions(
  options: UseElementDimensionsOptions = {},
): UseElementDimensionsReturn {
  const { debounceMs = 250 } = options;
  const elementRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getDimensions = useCallback((): Dimensions => {
    if (!elementRef.current) return initialDimensions;

    const rect = elementRef.current.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
    };
  }, []);

  const updateDimensions = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDimensions(getDimensions());
    }, debounceMs);
  }, [getDimensions, debounceMs]);

  useEffect(() => {
    setDimensions(getDimensions());

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', updateDimensions);

    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [getDimensions, updateDimensions]);

  return { ref: elementRef, dimensions, updateDimensions };
}

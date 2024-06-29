import type React from 'react';
import { useState, useEffect, useRef } from 'react';

interface Dimensions {
  height: number;
  width: number;
}

type UseMeasureReturn = Dimensions & {
  ref: React.RefObject<HTMLElement | null>;
};

export const useMeasure = (): UseMeasureReturn => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const element = ref.current;
      if (element) {
        setDimensions({
          height: element.offsetHeight,
          width: element.offsetWidth,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return {
    ...dimensions,
    ref,
  };
};

interface UseSizeReturn {
  size: Dimensions;
  ref: React.RefObject<HTMLElement | null>;
}

export const useSize = (): UseSizeReturn => {
  const [size, setSize] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const element = ref.current;
      if (element) {
        setSize({
          height: element.offsetHeight,
          width: element.offsetWidth,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return {
    size,
    ref,
  };
};

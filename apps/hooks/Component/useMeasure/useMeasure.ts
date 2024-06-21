import React, { useState, useEffect, useRef } from 'react';

/**
 * Represents the dimensions of an element.
 *
 * @typedef {Object} Dimensions
 * @property {number} height - The height of the element in pixels.
 * @property {number} width - THe width of the element in pixels.
 */
interface Dimensions {
  height: number;
  width: number;
}

/**
 * The return type of the `useMeasure` hook.
 *
 * @typedef {Object} UseMeasureReturn
 * @property {number} height - The current height of the measures element.
 * @property {number} width - The current width of the measure element.
 * @property {React.RefObject<HTMLElement | null>} ref - The ref object to attach to the target element.
 */
type UseMeasureReturn = Dimensions & {
  ref: React.RefObject<HTMLElement | null>;
};

/**
 * A custom hook that measures the dimensions of a referenced element.
 *
 * @returns {UseMeasureReturn} An object containing the dimension and the ref.
 *
 * @example
 * const { height, width, ref } = useMeasure()
 * return <div ref={ref}>Element to measure</div>
 */
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

/**
 * The return type of the `useSize` hook.
 *
 * @typedef {Object} UseSizeReturn
 * @property {Dimensions} size - The current size (height and width) of the measured element.
 * @property {React.RefObject<HTMLElement | null>} ref - The ref object to attach to the target element.
 */
type UseSizeReturn = {
  size: Dimensions;
  ref: React.RefObject<HTMLElement | null>;
};

/**
 * A custom hook that measures the size of a referenced element.
 *
 * @returns {UseSizeReturn} An object containing the size and the ref.
 *
 * @example
 * const { size, ref } = useSize();
 * return <div ref={ref}>Element to measure</div>
 */
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

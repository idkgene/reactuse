import { useState, useEffect, useRef } from "react";

/**
 * @type UseMeasureReturn
 * @property {number} height - The height of the element.
 * @property {number} width - The width of the element.
 * @property {React.RefObject<HTMLElement | null>} ref - A reference to the element.
 */
type UseMeasureReturn = {
  height: number;
  width: number;
  ref: React.RefObject<HTMLElement | null>;
};

/**
 * A custom hook that returns the height and width of an element, as well as a reference to the element.
 * @returns {UseMeasureReturn} An object containing the height and width of the element, as well as a reference to the element.
 */
export const useMeasure = (): UseMeasureReturn => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
    }
  }, [ref.current]);

  return {
    height,
    width,
    ref,
  };
};

/**
 * @type UseSizeReturn
 * @property {number} height - The height of the element.
 * @property {number} width - The width of the element.
 * @property {React.RefObject<HTMLElement | null>} ref - A reference to the element.
 */
type UseSizeReturn = {
  size: { height: number; width: number };
  ref: React.RefObject<HTMLElement | null>;
};

/**
 * A custom hook that returns the size of an element, as well as a reference to the element.
 * @returns {UseSizeReturn} An object containing the size of the element, as well as a reference to the element.
 */
export const useSize = (): UseSizeReturn => {
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setSize({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
      });
    }
  }, [ref.current]);

  return {
    size,
    ref,
  };
};
import { useCallback, useLayoutEffect, useState } from 'react';

import type { MutableRefObject } from 'react';

/**
 * Represents the result of measuring the bounding rectangle of an element.
 *
 * @interface RectResult
 * @property {number} x - The x-coordinate of the element.
 * @property {number} y - The y-coordinate of the element.
 * @property {number} width - The width of the element.
 * @property {number} height - The height of the element.
 * @property {number} top - The top position of the element.
 * @property {number} right - The right position of the element.
 * @property {number} bottom - The bottom position of the element.
 * @property {number} left - The left position of the element.
 */
interface RectResult {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * The return type of the `useRect` hook.
 *
 * @type {RectResult | null} UseRectReturn
 */
type UseRectReturn = RectResult | null;

/**
 * A custom hook that measures the bounding rectangle of a referenced element.
 *
 * @template T - The type of the referenced element.
 * @param {MutableRefObject<T | null>} ref - The ref object of the element to measure.
 * @returns {UseRectReturn} The bounding rectangle of the referenced element or null if
 * the element is not available.
 *
 * @example
 * const ref = useRef<HTMLDivElement | null>(null);
 * const rect = useRect(ref);
 * return <div ref={ref}></div>
 */
export const useRect = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>
): UseRectReturn => {
  const [rect, setRect] = useState<UseRectReturn>(null);

  const handleResize = useCallback(() => {
    if (!ref.current) {
      setRect(null);
      return;
    }

    const { x, y, width, height, top, right, bottom, left } =
      ref.current.getBoundingClientRect();
    setRect({ x, y, width, height, top, right, bottom, left });
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(handleResize);

      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [ref, handleResize]);

  return rect;
};
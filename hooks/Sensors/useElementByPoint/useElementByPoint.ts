import { useState, useEffect } from 'react';

/**
 * Options for the `useElementByPoint` hook.
 * 
 * @typedef {Object} UseElementByPointOptions
 * @property {number} x - The x coordinate of the point.
 * @property {number} y - The y coordinate of the point.
 * @property {boolean} [multiple=false] - Whether to return multiple elements.
 */
interface UseElementByPointOptions {
  x: number;
  y: number;
  multiple?: boolean;
}

/**
 * Return value of the `useElementByPoint` hook.
 * 
 * @typedef {Object} UseElementByPointReturn
 * @property {HTMLElement | HTMLElement[] | null} element - The HTMLElement or HTMLElement[]
 * at the specified coordinates.
 */
interface UseElementByPointReturn {
  element: HTMLElement | HTMLElement[] | null;
}

/**
 * Returns the HTMLElement or HTMLElement[] at the specified coordinates on the page.
 *
 * @param {UseElementByPointOptions} options - Object containing the x and y coordinates
 * and an optional boolean indicating whether to return multiple elements.
 * @param {number} options.x - The x coordinate of the point.
 * @param {number} options.y - The y coordinate of the point.
 * @param {boolean} [options.multiple=false] - Whether to return multiple elements.
 * @returns {UseElementByPointReturn} - An object containing the HTMLElement or HTMLElement[]
 * at the specified coordinates.
 * @example
 * const { element } = useElementByPoint({ x: 100, y: 50 });
 * console.log(element.tagName); // 'DIV'
 */
export const useElementByPoint = ({
  x,
  y,
  multiple = false,
}: UseElementByPointOptions): UseElementByPointReturn => {
  const [element, setElement] = useState<HTMLElement | HTMLElement[] | null>(
    null
  );

  useEffect(() => {
    const targetElement = multiple
      ? (document.elementsFromPoint(x, y) as HTMLElement[]) || null
      : (document.elementFromPoint(x, y) as HTMLElement) || null;

    setElement(targetElement);
  }, [x, y, multiple]);

  return { element };
};

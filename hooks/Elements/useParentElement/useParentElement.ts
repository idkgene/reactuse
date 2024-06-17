import { useRef, useEffect } from 'react';

/**
 * A hook that returns a ref to the parent element of a given element.
 *
 * @template T - The type of the element (HTMLElement or SVGElement).
 * @param {React.RefObject<T> | (() => T | null | undefined)} [elementRef] - A ref
 * to the element or a function that returns the element.
 * @returns {React.RefObject<T | null | undefined>} A ref to the parent element of
 * the specified element.
 *
 * @example
 * const MyComponent = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const parentRef = useParentElement(elementRef);
 *
 *   return (
 *     <div ref={elementRef}>
 *       ...
 *     </div>
 *   );
 * };
 */
export function useParentElement<T extends HTMLElement | SVGElement>(
  elementRef?: React.RefObject<T> | (() => T | null | undefined)
): React.RefObject<T> {
  const parentRef = useRef<T>(null!);

  useEffect(() => {
    const getElement = () => {
      if (elementRef instanceof Function) {
        return elementRef();
      } else {
        return elementRef?.current;
      }
    };

    const updateParentElement = () => {
      const element = getElement();
      parentRef.current = element?.parentElement as T;
    };

    updateParentElement();

    const observer = new MutationObserver(updateParentElement);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return parentRef;
}

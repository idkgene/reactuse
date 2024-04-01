import { useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * A React hook that adds an event listener to a specified target element or window.
 *
 * @module useEventListener
 * @template K - The event name type.
 * @template T - The target element type.
 * @param {K} eventName - The name of the event to listen for.
 * @param {(event: Event) => void} handler - The event handler function.
 * @param {RefObject<T>} [element] - A reference to the target element. If not provided, defaults to the window object.
 * @param {boolean | AddEventListenerOptions} [options] - Optional options to pass to the addEventListener method.
 * @returns {void}
 *
 * @example
 * // Listen for click events on a button
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useEventListener('click', handleClick, buttonRef);
 *
 * @example
 * // Listen for resize events on the window
 * useEventListener('resize', handleResize);
 */
export function useEventListener<
  K extends keyof WindowEventMap | keyof HTMLElementEventMap | keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | Window = HTMLElement | MediaQueryList | Window
>(
  eventName: K,
  handler: (event: Event) => void,
  element?: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
) {
  // Use a ref to store the latest handler function
  const handlerRef = useRef(handler);

  // Update the handler ref whenever the handler function changes
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // Get the target element from the ref or default to the window
    const targetElement: T | Window = element?.current ?? window;

    // Check if the target element has the addEventListener method
    if (targetElement && typeof targetElement.addEventListener === 'function') {
      // Add the event listener to the target element
      targetElement.addEventListener(eventName, handlerRef.current, options);

      // Return a cleanup function to remove the event listener on component unmount
      return () => {
        targetElement.removeEventListener(eventName, handlerRef.current, options);
      };
    }
  }, [eventName, element, options]);
}
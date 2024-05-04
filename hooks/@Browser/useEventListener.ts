import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";
import React from "react";

/**
 * @module useEventListener
 * @template K - The event name type.
 * @template T - The target element type.
 * @param {K} eventName - The name of the event to listen for.
 * @param {(event: Event) => void} handler - The event handler function.
 * @param {RefObject<T>} [element] - A reference to the target element. If not provided, defaults to the window object.
 * @param {boolean | AddEventListenerOptions} [options] - Optional options to pass to the addEventListener method.
 * @returns {void}
 *
 */
export const useEventListener = <
  K extends
    | keyof WindowEventMap
    | keyof HTMLElementEventMap
    | keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | Window =
    | HTMLElement
    | MediaQueryList
    | Window,
>(
  eventName: K,
  handler: (event: Event) => void,
  element?: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) => {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

    if (targetElement && typeof targetElement.addEventListener === "function") {
      targetElement.addEventListener(eventName, handlerRef.current, options);

      return () => {
        targetElement.removeEventListener(
          eventName,
          handlerRef.current,
          options,
        );
      };
    }
  }, [eventName, element, options]);
};

/**
 * @param {() => void} callback - The callback function to be executed on each interval tick.
 * @param {number | null} delay - The delay in milliseconds between each interval tick. If null or undefined, the interval will not be set.
 */

import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

import { useState, useEffect, useCallback } from "react";

/**
 * A custom React hook that returns a boolean indicating whether the user is currently scrolling.
 * @module useScroll
 * @returns {boolean} - A boolean indicating whether the user is currently scrolling.
 * 
 * @example
 * const isScrolling = useScroll();
 * if (isScrolling) {
 *   // Do something while scrolling
 * }
 */
const useScroll = (): boolean => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    setIsScrolling(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const debounceScroll = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", debounceScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", debounceScroll);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  return isScrolling;
};

export default useScroll;
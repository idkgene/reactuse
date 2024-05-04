import { useCallback, useEffect, useState } from "react";

type WindowSize = {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
};

/**
 * @interface WindowSize
 * @property {number} innerHeight - The inner height of the window.
 * @propery {number} innerWidth - The inner width of the window.
 * @propety {number} outherHeight - The outher height of the window.
 * @property {number} outherWidth - The outher width of the window.
 * @returns An object containing the current window size information.
 */
export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      });

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  return windowSize;
};

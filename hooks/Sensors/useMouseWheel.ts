import { useState, useEffect } from "react";

/**
 * A custom React hook that returns the mouse scroll delta Y
 * @returns {number} The mouse scroll delta Y
 */
export const useMouseWheel = (): number => {
  const [deltaY, setDeltaY] = useState<number>(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setDeltaY(event.deltaY);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return deltaY;
};
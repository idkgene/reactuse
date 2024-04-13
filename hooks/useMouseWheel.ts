import { useState, useEffect } from "react";

/**
 * A custom React hook that returns the mouse scroll delta Y
 * @returns {number} The mouse scroll delta Y
 */
const useMouseScrollDeltaY = (): number => {
  const [deltaY, setDeltaY] = useState<number>(0);

  useEffect(() => {
    /**
     * Handles the wheel event and updates the deltaY state.
     *
     * @param {WheelEvent} event - The wheel event object.
     */
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

export default useMouseScrollDeltaY;

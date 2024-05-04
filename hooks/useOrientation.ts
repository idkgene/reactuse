import { useLayoutEffect, useState } from "react";

interface OrientationState {
  angle: number;
  type: string;
}

/**
 * A custom React hook that returns the current orientation of the screen.
 * @returns {OrientationState} The current orientation of the screen.
 * @returns {number} angle - The current orientation angle.
 * @returns {string} type - The current orientation type.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
 */
export const useOrientation = (): OrientationState => {
  const [orientation, setOrientation] = useState<OrientationState>({
    angle: 0,
    type: "landscape-primary",
  });

  useLayoutEffect(() => {
    const handleChange = () => {
      const angle = window.screen.orientation?.angle ?? 0;
      const type = window.screen.orientation?.type ?? "landscape-primary";
      setOrientation({
        angle,
        type,
      });
    };

    const handleOrientationChange = () => {
      setOrientation({
        type: "UNKNOWN",
        angle: window.orientation,
      });
    };

    if (window.screen?.orientation) {
      handleChange();
      window.screen.orientation.addEventListener("change", handleChange);
    } else {
      handleOrientationChange();
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", handleChange);
      } else {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      }
    };
  }, []);

  return orientation;
}

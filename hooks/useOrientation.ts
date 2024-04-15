import { useLayoutEffect, useState } from "react";

interface OrientationState {
  angle: number;
  type: string;
}

/**
 * @returns {Object} An object containing the current orientation state.
 * @returns {number} orientation.angle - The angle of the device orientation.
 * @returns {string} orientation.type - The type of the device orientation.
 */
export function useOrientation(): OrientationState {
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

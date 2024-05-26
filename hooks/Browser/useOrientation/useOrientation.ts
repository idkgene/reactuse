import { useLayoutEffect, useState } from "react";

interface OrientationState {
  angle: number;
  type: ScreenOrientation['type'] | 'UNKNOWN';
}

interface UseOrientationOptions {
  initialState?: OrientationState;
}

export function useOrientation(
  options: UseOrientationOptions = {}
): OrientationState {
  const { initialState = { angle: 0, type: 'landscape-primary' } } = options;
  const [orientation, setOrientation] = useState<OrientationState>(initialState);

  useLayoutEffect(() => {
    const handleChange = () => {
      const angle = window.screen.orientation?.angle ?? 0;
      const type = window.screen.orientation?.type ?? 'landscape-primary';
      setOrientation({ angle, type });
    };

    const handleOrientationChange = () => {
      setOrientation({
        type: 'UNKNOWN',
        angle: window.orientation,
      });
    };

    if (window.screen?.orientation) {
      handleChange();
      window.screen.orientation.addEventListener('change', handleChange);
    } else {
      handleOrientationChange();
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleChange);
      } else {
        window.removeEventListener(
          'orientationchange',
          handleOrientationChange
        );
      }
    };
  }, []);

  return orientation;
}
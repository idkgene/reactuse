import { useState, useEffect } from 'react';

interface UseDevicePixelRatioOptions {
  window?: Window;
}

interface UseDevicePixelRatioReturn {
  pixelRatio: number;
}

export function useDevicePixelRatio(
  options: UseDevicePixelRatioOptions = {}
): UseDevicePixelRatioReturn {
  const { window: targetWindow = window } = options;

  const [pixelRatio, setPixelRatio] = useState(targetWindow.devicePixelRatio);

  useEffect(() => {
    const updatePixelRatio = () => {
      setPixelRatio(targetWindow.devicePixelRatio);
    };

    const mediaQuery = targetWindow.matchMedia(
      `(resolution: ${pixelRatio}dppx)`
    );

    mediaQuery.addEventListener('change', updatePixelRatio);

    return () => {
      mediaQuery.removeEventListener('change', updatePixelRatio);
    };
  }, [targetWindow, pixelRatio]);

  return { pixelRatio };
}

import { useState, useEffect } from 'react';

interface UseDevicePixelRatioOptions {
  window?: Window;
}

interface UseDevicePixelRatioReturn {
  pixelRatio: number;
}

export function useDevicePixelRatio(
  options: UseDevicePixelRatioOptions = {},
): UseDevicePixelRatioReturn {
  const { window: targetWindow = window } = options;

  const [pixelRatio, setPixelRatio] = useState(targetWindow.devicePixelRatio);

  useEffect(() => {
    const updatePixelRatio = () => {
      setPixelRatio(targetWindow.devicePixelRatio);
    };

    targetWindow.addEventListener('resize', updatePixelRatio);

    return () => {
      targetWindow.removeEventListener('resize', updatePixelRatio);
    };
  }, [targetWindow]);

  return { pixelRatio };
}

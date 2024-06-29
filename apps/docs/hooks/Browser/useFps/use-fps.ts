import { useEffect, useState } from 'react';

export interface UseFpsOptions {
  interval?: number;
  onFpsUpdate: (fps: number) => void;
}

export function useFps(options?: UseFpsOptions): number {
  const [fps, setFps] = useState(0);
  const interval = options?.interval ?? 1000;
  const onFpsUpdate = options?.onFpsUpdate;

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let requestId: number;

    const calculateFps = () => {
      frameCount += 1;
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= interval) {
        const calculatedFps = Math.round((frameCount * 1000) / elapsedTime);
        setFps(calculatedFps);
        onFpsUpdate?.(calculatedFps);
        frameCount = 0;
        startTime = currentTime;
      }
    };

    const onRequestAnimationFrame = () => {
      calculateFps();
      requestId = requestAnimationFrame(onRequestAnimationFrame);
    };

    requestId = requestAnimationFrame(onRequestAnimationFrame);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [interval, onFpsUpdate]);

  return fps;
}

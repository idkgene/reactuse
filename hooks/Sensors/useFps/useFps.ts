import * as React from 'react';

type useFpsReturn = {
  fps: number;
};

export function useFps(): useFpsReturn {
  const [fps, setFps] = React.useState<number>(0);
  const frameCountRef = React.useRef<number>(0);
  const startTimeRef = React.useRef<number>(0);
  const requestIdRef = React.useRef<number | null>(0);

  const updateFps = React.useCallback(() => {
    frameCountRef.current += 1;
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTimeRef.current;

    if (elapsedTime >= 1000) {
      const calculatedFps = Math.round(
        (frameCountRef.current * 1000) / elapsedTime
      );
      setFps(calculatedFps);
      frameCountRef.current = 0;
      startTimeRef.current = currentTime;
    }

    requestIdRef.current = requestAnimationFrame(updateFps);
  }, []);

  React.useEffect(() => {
    requestIdRef.current = requestAnimationFrame(updateFps);

    return () => {
      if (requestIdRef.current !== null) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [updateFps]);

  return { fps };
}

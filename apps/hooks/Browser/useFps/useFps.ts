import { useEffect, useState } from 'react';

/**
 * Options for `useFps` hook.
 *
 * @typedef {Object} UseFpsOptions
 * @param {number} [options.interval=1000] - The interval (in milliseconds) at which to update the FPS value.
 * @param {Function} [options.onFpsUpdate] - A callback function that receives the updated FPS value.
 */
export interface UseFpsOptions {
  interval?: number;
  onFpsUpdate: (fps: number) => void;
}

/**
 * A hook to monitor and report the framer per second (FPS).
 *
 * @param {FpsOptions} [options] - Configuration options for the hook.
 * @param {number} [options.interval=1000] - The interval (in milliseconds) at which to update the FPS value.
 * @param {Function} [options.onFpsUpdate] - A callback function that receives the updated FPS value.
 * @returns {number} The current FPS value.
 *
 * @example
 * // Example usage of the hook with explanation
 * const onFpsUpdate = (fps) => {
 *   console.log(`Current FPS: ${fps}`);
 * };
 * const fps = useFps({ interval: 500, onFpsUpdate });
 */
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

import * as React from 'react';

/**
 * Options for the useDevicePixelRatio hook.
 *
 * @typedef {Object} UseDevicePixelRatioOptions
 * @property {Window} [window] - The window object to use instead of the
 * default window object.
 */
interface UseDevicePixelRatioOptions {
  window?: Window;
}

/**
 * Return value of the useDevicePixelRatio hook.
 *
 * @typedef {Object} UseDevicePixelRatioReturn
 * @property {number} pixelRatio - The current device pixel ratio.
 */
interface UseDevicePixelRatioReturn {
  pixelRatio: number;
}

/**
 * Returns the device pixel ratio of the curent window.
 *
 * The device pixel ratio is a ratio of the resolution in physical pixels
 * to the resolution in CSS pixels for the current window. This hook
 * listens for changes in the device pixel ratio and updates the
 * returned value accordingly.
 *
 * @param {UseDevicePixelRatioOptions} options - Optional configuration
 * object.
 * @param {Window} options.window - The window object to use instead of the
 * default window object.
 *
 * @returns {UseDevicePixelRatioReturn} An object containing the current
 * device pixel ratio.
 *
 * @example
 * // Example usage of the hook
 * const { pixelRatio } = useDevicePixelRatio();
 */
export function useDevicePixelRatio(
  options: UseDevicePixelRatioOptions = {}
): UseDevicePixelRatioReturn {
  const { window: targetWindow = window } = options;

  const [pixelRatio, setPixelRatio] = React.useState(
    targetWindow.devicePixelRatio
  );

  React.useEffect(() => {
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

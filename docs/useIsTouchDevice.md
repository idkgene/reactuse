# `useIsTouchDevice`

A versatile and reliable React hook that detects whether the user's device supports touch interactions, allowing you to create touch-friendly user interfaces and optimize your application's user experience. 📱🖐️

## Usage

```tsx
import { useIsTouchDevice } from "./useIsTouchDevice";

const MyComponent = () => {
  const isTouchDevice = useIsTouchDevice();

  return (
    <div>
      {isTouchDevice ? "Touch device detected" : "Non-touch device detected"}
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns {boolean} A boolean indicating if the device is a touch device.
 */
export function useIsTouchDevice(): boolean;
```

## Under the Hood

The `useIsTouchDevice` hook utilizes React's `useState`, `useEffect`, and `useCallback` hooks to determine if the user's device supports touch interactions. It checks for the presence of touch support using various methods, such as checking the `maxTouchPoints` property of the navigator object, using a media query to detect coarse pointers, or analyzing the user agent string. The hook sets the `isTouchDevice` state based on the detected touch support and updates it whenever the window is resized. The `useCallback` hook is used to memoize the check function and the resize event handler for optimal performance.

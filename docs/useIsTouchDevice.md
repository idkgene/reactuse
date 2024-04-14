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

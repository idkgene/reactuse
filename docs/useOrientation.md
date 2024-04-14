# `useOrientation`

A powerful and intuitive React hook that effortlessly detects and provides the current orientation of the device, empowering your components to adapt and deliver an optimal user experience across different screen orientations. 📱🌀

## Usage

```tsx
import { useOrientation } from "./useOrientation";

const MyComponent = () => {
  const { angle, type } = useOrientation();

  return (
    <div>
      <p>Orientation: {type}</p>
      <p>Angle: {angle}°</p>
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns {Object} An object containing the current device orientation.
 * @returns {number} orientation.angle - The angle of the device orientation.
 * @returns {string} orientation.type - The type of the device orientation (e.g., 'landscape-primary', 'portrait-primary').
 */
export function useOrientation(): {
  angle: number;
  type: string;
};
```

## Under the hood

The `useOrientation` hook leverages React's `useLayoutEffect` and `useState` hooks to efficiently detect and update the device orientation state. It listens for the `change` event on the `window.screen.orientation` object, if available, or falls back to the `orientationchange` event on the window object for older browsers. The hook updates the orientation state whenever a change in the device orientation is detected, providing the current angle and orientation type.

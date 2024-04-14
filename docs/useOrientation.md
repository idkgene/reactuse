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

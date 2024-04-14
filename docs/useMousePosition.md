# `useMousePosition`

A captivating and versatile React hook that effortlessly detects and responds to changes in the user's device viewport, empowering your application to adapt seamlessly to different screen sizes and device capabilities. 🖥️📱

## Usage

```tsx
import { useMousePosition } from "./useMousePosition";

const MyComponent = () => {
  const { x, y } = useMousePosition();

  return (
    <div>
      <p>Mouse Position:</p>
      <p>X: {x}</p>
      <p>Y: {y}</p>
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns {Object} An object containing the current mouse position.
 * @returns {number} position.x - The x-coordinate of the mouse position.
 * @returns {number} position.y - The y-coordinate of the mouse position.
 */
const useMousePosition: () => { x: number; y: number };
```
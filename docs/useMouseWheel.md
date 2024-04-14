# `useMouseScrollDeltaY`

A lightweight and efficient React hook that effortlessly captures the vertical scroll delta of the mouse wheel, empowering your components to respond to scrolling interactions with precision and ease. 🖱️📜

## Usage

```tsx
import { useMouseScrollDeltaY } from "./useMouseScrollDeltaY";

const MyComponent = () => {
  const deltaY = useMouseScrollDeltaY();

  return (
    <div>
      <p>Mouse Scroll Delta Y: {deltaY}</p>
    </div>
  );
};
```

## Reference

```tsx
/**
 * A custom React hook that returns the mouse scroll delta Y
 * @returns {number} The mouse scroll delta Y
 */
const useMouseScrollDeltaY = (): number;
```

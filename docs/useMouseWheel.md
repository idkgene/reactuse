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

## Under the Hood

The `useMouseScrollDeltaY` hook utilizes React's `useState` and `useEffect` hooks to efficiently track and update the vertical scroll delta of the mouse wheel. It attaches a wheel event listener to the `window` object, capturing the `deltaY` value from the event object whenever the mouse wheel is scrolled. The hook updates the `deltaY` state with the latest scroll delta value, providing real-time updates to your components.

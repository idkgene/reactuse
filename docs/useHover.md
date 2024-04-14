# `useHover`

A simple and intuitive React hook that allows you to easily track the hover state of an element, providing a seamless way to create interactive and engaging user experiences. 🖱️✨

## Usage

```tsx
import { useHover } from "./useHover";

const MyComponent = () => {
  const [ref, isHovering] = useHover<HTMLDivElement>();

  return (
    <div ref={ref}>{isHovering ? "Hovering over me!" : "Hover over me!"}</div>
  );
};
```

## Reference

```tsx
/**
 * @module useHover
 * @template T - The type of the HTML element to track hover state for.
 * @returns {[RefObject<T>, boolean]} An array containing a ref object to attach to the target element, and a boolean indicating the hover state.
 */
export function useHover<T extends HTMLElement>(): [RefObject<T>, boolean];
```

## Under the Hood

The useHover hook utilizes React's `useRef` and `useState` hooks to manage the ref object and hover state respectively. It also leverages the `useEffect` hook to attach and remove event listeners for the `mouseenter` and `mouseleave` events on the target element.

When the target element is hovered over, the `mouseenter` event is triggered, setting the hover state to `true`. Conversely, when the mouse leaves the target element, the `mouseleave` event is triggered, setting the hover state to `false`.

The hook returns an array containing the ref object to be attached to the target element and the current hover state. This allows for easy integration and utilization of the hover functionality within your React components.

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

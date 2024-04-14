# `useOnClickOutside`

A versatile and efficient React hook that simplifies the process of detecting clicks outside a specified DOM element, enabling you to easily handle interactions and close menus, modals, or other components when the user clicks elsewhere on the page. 🎯🖱️

## Usage

```tsx
import { useRef } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

const MyComponent = () => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    console.log("Clicked outside the element");
    // Perform any necessary actions
  });

  return <div ref={ref}>Hello, World!</div>;
};
```

## Reference

```tsx
/**
 * @template T - The type of the DOM element to be observed.
 * @param {RefObject<T>} ref - A React ref object that references the DOM element to observe.
 * @param {Handler} handler - The callback function to be called when a click outside the element is detected.
 * @param {'mousedown' | 'mouseup'} [mouseEvent='mousedown'] - The mouse event type to listen for ('mousedown' or 'mouseup').
 * @returns {void}
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void;
```

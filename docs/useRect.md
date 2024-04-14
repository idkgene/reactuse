# `useRect`

A powerful and flexible React hook that effortlessly observes the size and position of a specified HTML element, providing real-time updates whenever the element's dimensions change. 📏🎯

## Usage

```tsx
import { useRef } from "react";
import { useRect } from "./useRect";

const MyComponent = () => {
  const ref = useRef(null);
  const rect = useRect(ref);

  return (
    <div ref={ref}>
      {rect && (
        <p>
          Element size: {rect.width}px x {rect.height}px
        </p>
      )}
    </div>
  );
};
```

## Reference

```tsx
/**
 * @param {MutableRefObject<HTMLElement | null>} ref - The reference to the HTML element you want to observe.
 * @returns {DOMRect | null} - The size and position of the observed element, or null if the element is not available.
 */
export const useRect = (ref: MutableRefObject<HTMLElement | null>): DOMRect | null;
```

## Under the hood

The `useRect` hook leverages the power of React's `useCallback`, `useLayoutEffect`, and `useState` hooks to efficiently observe and update the size and position of the specified HTML element. It utilizes the `ResizeObserver` API, when available, to detect changes in the element's dimensions and falls back to the `resize` event listener for older browsers. The hook returns the current size and position of the element as a `DOMRect` object or `null` if the element is not available.

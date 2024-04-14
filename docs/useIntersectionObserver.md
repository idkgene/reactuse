# `useIntersectionObserver`

A powerful and flexible React hook that simplifies the process of detecting when an element enters or leaves the viewport using the Intersection Observer API, enabling you to create dynamic and optimized user experiences. 👀📏

## Usage

```tsx
import { useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref}>
      {entry?.isIntersecting ? "Visible" : "Not Visible"}
    </div>
  );
};
```

## Reference

```tsx
/**
 * @param {RefObject<Element>} elementRef - A React ref object that references the DOM element to observe.
 * @param {Args} options - An object containing options for the Intersection Observer.
 * @param {number} [options.threshold=0] - A number or an array of numbers representing the percentage of the target element's visibility that should trigger the observer callback.
 * @param {Element} [options.root=null] - The root element to use as the intersection root for the observer.
 * @param {string} [options.rootMargin='0%'] - A string describing a set of offsets to add to the root's bounding box when calculating intersections.
 * @param {boolean} [options.freezeOnceVisible=false] - A boolean indicating whether to freeze the observer once the target element becomes visible.
 * @returns {IntersectionObserverEntry | undefined} An object representing the current intersection information for the target element, or undefined if the Intersection Observer API is not supported or if the observer is frozen.
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: Args
): IntersectionObserverEntry | undefined;
```

## Under the hood

The `useIntersectionObserver` hook leverages React's `useState` and `useEffect` hooks to manage the intersection entry state and set up the Intersection Observer.

It first checks if the Intersection Observer API is supported by the browser. If not supported or if the observer is frozen (when `freezeOnceVisible` is set to `true` and the element has already intersected), the hook returns early.

The hook then creates a new `IntersectionObserver` instance with the provided options and a callback function to update the intersection entry state. It observes the target element referenced by `elementRef`.

The`useEffect` hook is used to set up the observer when the component mounts and to disconnect the observer when the component unmounts. It also triggers the effect whenever the `elementRef`, `threshold`, `root`, or `rootMargin` options change.

Finally, the hook returns the current `IntersectionObserverEntry` object, which contains information about the intersection state of the target element, or `undefined` if the Intersection Observer API is not supported or if the observer is frozen.

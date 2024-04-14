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

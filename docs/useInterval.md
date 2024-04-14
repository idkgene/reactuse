# `useInterval`

A handy and efficient React hook that simplifies the process of setting up and managing intervals in your components, allowing you to execute a callback function at a specified delay. ⏰🔁

## Usage

```tsx
import { useInterval } from "./useInterval";

const MyComponent = () => {
  useInterval(() => {
    console.log("Tick");
  }, 1000);

  return <div>Interval is running...</div>;
};
```

## Reference

```
/**
 * @param {() => void} callback - The callback function to be executed on each interval tick.
 * @param {number | null} delay - The delay in milliseconds between each interval tick. If null or undefined, the interval will not be set.
 */
export function useInterval(callback: () => void, delay: number | null): void;
```

## Under the hood

The `useInterval` hook utilizes React's `useEffect` and `useRef` hooks to manage the interval and ensure that the latest callback function is always executed.

The `useRef` hook is used to store the latest version of the callback function, which is updated whenever the callback changes using the `useIsomorphicLayoutEffect` hook.

The `useEffect` hook is responsible for setting up and clearing the interval based on the provided `delay`. If the `delay` is `null` or `undefined`, the interval is not set.

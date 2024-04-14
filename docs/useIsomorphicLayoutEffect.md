# `useIsomorphicLayoutEffect`

A smart and environment-aware React hook that automatically selects the appropriate effect hook (useEffect or useLayoutEffect) based on whether the code is running on the client-side or server-side, ensuring consistent behavior across different environments. 🌍🔄

## Usage

```tsx
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

const MyComponent = () => {
  useIsomorphicLayoutEffect(() => {
    console.log("This will run with the appropriate effect hook!");
  }, []);

  return <div>Hello, world!</div>;
};
```

## Reference

```tsx
/**
 * @returns {typeof useEffect | typeof useLayoutEffect} The appropriate effect hook based on the environment.
 */
export const useIsomorphicLayoutEffect: typeof useEffect | typeof useLayoutEffect;
```

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

## Under the Hood

The `useIsomorphicLayoutEffect` hook is a simple yet powerful utility that conditionally selects the appropriate effect hook based on the execution environment. It checks if the `window` object is defined, indicating that the code is running on the client-side. If `window` is available, it uses the `useLayoutEffect` hook, which runs synchronously after all DOM mutations. Otherwise, it falls back to the `useEffect` hook, which is suitable for server-side rendering or environments without a `window` object.

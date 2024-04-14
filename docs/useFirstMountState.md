# `useFirstMountState`

A simple yet powerful React hook that allows you to determine whether the current render is the initial render of a component. This hook is particularly useful when you need to perform certain actions only on the first render, such as initializing state or triggering one-time side effects. 🎉🔍

## Usage

```tsx
import { useFirstMountState } from "./useFirstMountState";

const MyComponent = () => {
  const isFirstMount = useFirstMountState();

  if (isFirstMount) {
    console.log("This is the first render!");
  }

  return <div>Hello, World!</div>;
};
```

## Reference

```tsx
/**
 * @returns {boolean} True on the initial render, false on subsequent renders.
 */
export function useFirstMountState(): boolean;
```

The `useFirstMountState` hook utilizes React's `useRef` hook to create a mutable reference that persists across re-renders. It initializes the `isFirst` ref with a value of `true`, indicating that the current render is the first mount.


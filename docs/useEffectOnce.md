# `useEffectOnce`

A versatile React module that encapsulates the functionality of running an effect function only once during the component's lifecycle. 🔄🔍

## Usage

```tsx
import { useEffectOnce } from "./hooks/useEffectOnce";

function MyComponent() {
  useEffectOnce(() => {
    console.log("This effect runs only once on mount");

    return () => {
      console.log("This cleanup runs only once on unmount");
    };
  });

  return (
    <div>
      <h1>My Component</h1>
      {/* Component content */}
    </div>
  );
}
```

## Reference

```tsx
/**
 * Executes the provided effect function only once during the component lifecycle.
 * @param effect - The effect function to be executed once.
 * @returns void
 */
import { useEffect, useRef } from "react";

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const effectCalled = useRef(false);

  useEffect(() => {
    if (!effectCalled.current) {
      const destroyFn = effect();
      effectCalled.current = true;
      return () => {
        if (destroyFn && typeof destroyFn === "function") {
          destroyFn();
        }
      };
    }
  }, []);
};
```

This module efficiently manages the execution of the effect function, ensuring it runs only once by utilizing a useRef hook to keep track of its invocation status. The clean-up mechanism is included to handle any necessary cleanup operations when the component unmounts. ⚙️🔄

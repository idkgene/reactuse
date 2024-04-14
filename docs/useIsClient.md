# `useIsClient`

A simple and lightweight React hook that helps you determine whether your code is running on the client-side or server-side, enabling you to conditionally render components or execute client-specific logic. 🖥️🌐

## Usage

```tsx
import { useIsClient } from "./useIsClient";

const MyComponent = () => {
  const isClient = useIsClient();

  return (
    <div>
      {isClient ? "Running on the client-side" : "Running on the server-side"}
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns {boolean} A boolean indicating if the code is running on the client-side.
 */
export function useIsClient(): boolean;
```

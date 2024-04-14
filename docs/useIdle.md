# `useIdle`

A powerful and efficient React hook that allows you to easily detect when a user becomes idle or inactive on your website or application, enabling you to create more engaging and responsive user experiences. ⏰💤

## Usage

```tsx
import { useIdle } from "./useIdle";

const MyComponent = () => {
  const isIdle = useIdle(5000); // User is considered idle after 5 seconds

  return <div>{isIdle ? "User is idle" : "User is active"}</div>;
};
```

## Reference

```tsx
/**
 * @module useIdle
 * @param {number} [ms=60000] - The amount of time in milliseconds after which the user is considered idle.
 * @returns {boolean} A boolean indicating whether the user is currently idle.
 */
export function useIdle(ms?: number): boolean;
```

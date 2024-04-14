# `useThrottle`

A powerful and efficient React hook that intelligently throttles a rapidly changing value, providing a smooth and optimized way to control the rate of updates in your components. ⏱️💨

## Usage

```tsx
import { useThrottle } from "./useThrottle";

const MyComponent = () => {
  const [value, setValue] = useState(0);
  const throttledValue = useThrottle(value, 500);

  return (
    <div>
      <p>Value: {value}</p>
      <p>Throttled Value: {throttledValue}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

## Reference

```tsx
/**
 * @param {T} value - The value to be throttled.
 * @param {number} [ms=200] - The throttle delay in milliseconds.
 * @returns {T} The throttled value.
 *
 * @example
 * const throttledValue = useThrottle(value, 500);
 */
export const useThrottle = <T>(value: T, ms: number = 200): T;
```

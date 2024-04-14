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

## Under the Hood

The `useThrottle` hook is a masterpiece of performance optimization, leveraging the power of React's `useEffect`, `useRef`, and `useState` hooks to create a sophisticated throttling mechanism. 🎨

At its core, `useThrottle` takes a rapidly changing value and a throttle delay (in milliseconds) as input. It intelligently manages the rate at which the throttled value is updated, ensuring that your component remains responsive and efficient. ⚡

Behind the scenes, the hook maintains a state variable to store the throttled value and utilizes refs to keep track of the next value, the presence of a next value, and the timeout reference. This allows for precise control over the throttling behavior. 🎯

When the input value changes, `useThrottle` springs into action. It checks if a timeout is already in progress and, if not, immediately updates the throttled value to the latest input value. It then sets up a timeout to handle subsequent updates after the specified delay. 🕰️

If a timeout is already active, the hook stores the next value in the ref and sets a flag indicating the presence of a pending update. This ensures that the most recent value is captured and will be processed once the current timeout concludes. 🎟️

To guarantee proper cleanup and prevent memory leaks, `useThrottle` leverages the `useUnmount` hook to clear any active timeouts when the component is unmounted. This ensures that your application runs smoothly and efficiently. 🧹

By abstracting away the complexities of throttling logic, `useThrottle` empowers you to effortlessly control the rate of updates in your components. It enables you to optimize performance, reduce unnecessary re-renders, and create buttery-smooth user experiences. 🚀

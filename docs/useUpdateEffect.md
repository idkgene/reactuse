# `useUpdateEffect`

A sleek and efficient React hook that elegantly executes an effect function after the initial render, ensuring your component stays up to date with the latest changes. 🎨🚀

## Usage

```tsx
import { useUpdateEffect } from "./useUpdateEffect";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log("Count updated:", count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## Reference

```tsx
/**
 * @param {() => void | (() => void)} effect - The effect function to be executed after the initial render.
 * @param {readonly any[]} [deps=[]] - An optional array of dependencies for the effect function.
 */
export const useUpdateEffect: typeof useEffect;
```

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

## Under the Hood

The `useUpdateEffect` hook leverages the power of React's `useEffect` and `useRef` hooks to intelligently determine when to execute the effect function. By utilizing a ref to track the component's mount status, it ensures that the effect is only triggered after the initial render. 🎯

This hook takes an effect function and an optional array of dependencies as arguments. The effect function is executed whenever any of the dependencies change, allowing you to perform side effects based on specific conditions. 🧩

By abstracting away the need to manually track the component's mount status, `useUpdateEffect` simplifies the process of executing effects after the initial render. It empowers you to focus on the logic of your effect, while the hook takes care of the rest. 💪

Whether you need to fetch data, subscribe to events, or perform any other side effects that should only occur after the component has mounted, `useUpdateEffect` is your go-to solution. Embrace the power of this hook and elevate your React components to new heights! 🌟

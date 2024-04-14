# `useUnmount`

A robust and reliable React hook that seamlessly handles the execution of a cleanup function when a component is unmounted, ensuring a smooth and efficient teardown process. 🧹🎉

## Usage

```tsx
import { useUnmount } from "./useUnmount";

const MyComponent = () => {
  useUnmount(() => {
    console.log("Component unmounted");
    // Perform cleanup tasks here
  });

  return <div>Hello, World!</div>;
};
```

## Reference

```tsx
/**
 * @param {function} fn - The function to be executed when the component is unmounted.
 * @returns {void}
 */
export const useUnmount = (fn: () => void) => void;
```

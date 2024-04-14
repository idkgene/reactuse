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

## Under the Hood

The `useUnmount` hook leverages the power of React's `useRef` and `useEffectOnce` hooks to create a resilient and efficient mechanism for executing cleanup tasks when a component is unmounted. 💪

By utilizing a ref to store the cleanup function, `useUnmount` ensures that the latest version of the function is always available, even if the component re-renders multiple times. This approach guarantees that the correct cleanup logic is executed, regardless of any updates to the function during the component's lifecycle. 🎯

The hook takes advantage of the `useEffectOnce` hook, which is a specialized version of useEffect that only runs once during the component's lifecycle. This ensures that the cleanup function is registered only once and avoids any unnecessary re-registrations. ⚡

When the component is unmounted, the cleanup function stored in the ref is automatically invoked, allowing you to perform any necessary cleanup tasks, such as canceling subscriptions, clearing timers, or releasing resources. 🧹

By abstracting away the intricacies of cleanup logic and providing a simple and intuitive API, `useUnmount` empowers you to write cleaner and more maintainable code. It takes care of the heavy lifting, so you can focus on building amazing user experiences. 💫

Embrace the power of `useUnmount` and say goodbye to manual cleanup management. Let this hook handle the dirty work while you craft beautiful and efficient React components! 🚀✨

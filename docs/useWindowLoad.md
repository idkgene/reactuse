# `useWindowLoad`

A handy and efficient React hook that allows you to easily detect when the window has finished loading, enabling you to trigger specific actions or render components based on the load state. 🏁🌟

## Usage

```tsx
import { useWindowLoad } from "./useWindowLoad";

const MyComponent = () => {
  const isLoaded = useWindowLoad();

  return (
    <div>
      {isLoaded ? <h1>Window has finished loading!</h1> : <p>Loading...</p>}
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns The `useWindowLoad` custom hook returns a boolean value indicating whether the window has finished loading (`isLoaded`).
 */
const useWindowLoad = (): boolean;
```

## Usage

The `useWindowLoad` hook utilizes React's `useState` and `useEffect` hooks to manage the load state and handle the `window` load event. It checks if the window object is available and listens for the `load` event. Once the window has finished loading, it updates the `isLoaded` state to true. The hook also handles the cleanup by removing the event listener when the component unmounts.

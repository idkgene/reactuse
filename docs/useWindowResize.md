# `useWindowResize`

A versatile and powerful React hook that effortlessly captures and provides real-time window size information, empowering your components to adapt and respond to window resizing events with ease. 🗜📏

## Usage

```tsx
import { useWindowResize } from "./useWindowResize";

const MyComponent = () => {
  const { innerWidth, innerHeight, outerWidth, outerHeight } =
    useWindowResize();

  return (
    <div>
      <p>
        Inner Window Size: {innerWidth}px x {innerHeight}px
      </p>
      <p>
        Outer Window Size: {outerWidth}px x {outerHeight}px
      </p>
    </div>
  );
};
```

## Reference

```tsx
type WindowSize = {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
};

/**
 * @returns An object containing the current window size information.
 */
const useWindowResize = (): WindowSize;
```

## Under the Hood
The `useWindowResize` hook is a marvel of window size tracking, leveraging the power of React's `useState`, `useEffect`, and `useCallback` hooks to create a seamless and efficient solution. 🎨

At its core, the hook maintains a state object that holds the current window size information, including the inner and outer dimensions of the window. This state is initially set to default values of zero. 🌟

To ensure optimal performance, `useWindowResize` utilizes the `useCallback` hook to memoize the event handler function responsible for updating the window size state. This prevents unnecessary re-creations of the handler on every render. ⚡

When the component mounts, the hook performs an initial update of the window size state using the current window dimensions. It then attaches the memoized event handler to the window's 'resize' event, ensuring that the state is always in sync with the latest window size. 🎯

To guarantee proper cleanup and prevent memory leaks, `useWindowResize` leverages the cleanup function returned by `useEffect`. When the component unmounts, it removes the event listener, ensuring that no unnecessary computations occur. 🧹

By abstracting away the intricacies of window size tracking, `useWindowResize` provides a simple and intuitive API for accessing window size information. It empowers you to create responsive and adaptive components that seamlessly adjust to changes in the window size. 💪

Whether you need to dynamically update layouts, resize elements, or trigger specific behaviors based on the window dimensions, `useWindowResize` has got you covered. It delivers real-time window size data straight to your components, enabling you to craft immersive and responsive user experiences. 🌟

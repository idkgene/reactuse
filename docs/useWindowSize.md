# `useWindowSize`

A powerful React sensor hook that effortlessly captures the current window size, empowering your components with real-time responsiveness. 💻

## Usage

```tsx
import { useWindowSize } from "./useWindowSize";

const MyComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      Current window size: {width}px x {height}px
    </div>
  );
};
```

## Reference

```tsx
interface WindowSize {
width: number;
height: number;
}

/**
*- @returns {WindowSize} The current window size.
*/
  export const useWindowSize = (): WindowSize;
```

## Under the Hood

The `useWindowSize` hook leverages the power of React's `useState` and `useEffect` hooks to efficiently monitor changes in the window size. By attaching an event listener to the 'resize' event, it ensures that the component stays in sync with the latest window dimensions. 🚀

With just a few lines of code, `useWindowSize` abstracts away the complexities of window size tracking, allowing you to focus on building responsive and adaptive user interfaces. Whether you need to adjust layouts, resize elements, or trigger specific behaviors based on the window size, this hook has got you covered. 💪

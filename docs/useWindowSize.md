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

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

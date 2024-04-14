# `useLongPress`

A captivating React hook that effortlessly handles long press events, empowering your applications with a seamless and responsive user experience. 🎮🖱️

## Usage

```tsx
import { useLongPress } from "./useLongPress";

const MyComponent = () => {
  const onLongPress = () => {
    console.log("Long press detected!");
    // Perform your desired action here
  };

  const { onMouseDown, onMouseUp, onTouchStart, onTouchEnd } = useLongPress(onLongPress, {
    duration: 1000,
  });

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1>Press and hold me!</h1>
    </div>
  );
};
```

## Reference

```tsx
interface LongPressOptions {
  duration?: number;
}

/**
 * A custom React hook that handles long press events.
 * @param callback - The callback function to be executed on a long press event.
 * @param options - Optional configuration options for the long press event.
 * @returns An object containing event handlers for mouse and touch events.
 */
const useLongPress: (
  callback: () => void,
  options?: LongPressOptions
) => {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
};
```

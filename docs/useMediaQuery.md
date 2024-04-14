# `useMediaQuery`

A captivating and versatile React hook that effortlessly detects and responds to changes in the user's device viewport, empowering your application to adapt seamlessly to different screen sizes and device capabilities. 🖥️📱

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

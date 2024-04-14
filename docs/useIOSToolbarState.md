# `useIOSToolbarState`

A specialized React hook that detects the visibility state of the iOS toolbar in Safari, allowing you to create adaptive and responsive designs for iOS devices. 📱🧭

## Usage

```tsx
import { useIOSToolbarState } from "./useIOSToolbarState";

const MyComponent = () => {
  const { isVisible } = useIOSToolbarState();

  return (
    <div>
      {isVisible !== undefined && (
        <p>iOS Toolbar is {isVisible ? "visible" : "hidden"}</p>
      )}
    </div>
  );
};
```

## Reference

```tsx
/**
 * @returns {{isVisible: boolean | undefined}} An object containing the visibility state of the iOS toolbar.
 */
export function useIOSToolbarState(): {
  isVisible: boolean | undefined;
};
```

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

## Under the Hood

The `useIOSToolbarState` hook utilizes React's `useState` and `useEffect` hooks to manage the visibility state of the iOS toolbar. It checks if the user is using iOS Safari and if the web app is running in standalone mode. If both conditions are met, it adds a scroll event listener to detect changes in the window height and updates the `isVisible` state accordingly. The event listener is removed when the component unmounts to prevent memory leaks.  

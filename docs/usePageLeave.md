# `usePageLeave`

A clever and handy React hook that allows you to easily detect when the user's mouse leaves the page, enabling you to trigger specific actions or perform cleanup tasks before the user navigates away. 🐭🚪

## Usage

```tsx
import { usePageLeave } from "./usePageLeave";

const MyComponent = () => {
  usePageLeave(() => {
    console.log("User is leaving the page");
    // Perform any necessary actions or cleanup tasks
  });

  return <div>Hello, World!</div>;
};
```

## Reference

```tsx
/**
 * @param {() => void} onPageLeave - The callback function to be called when the user leaves the page.
 * @param {readonly any[]} [args=[]] - An optional array of dependencies for the `onPageLeave` callback function.
 */
export const usePageLeave = (onPageLeave: () => void, args: readonly any[] = []): void;
```

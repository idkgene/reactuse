# `useLocationHash`

A captivating React hook that seamlessly tracks the current hash of the URL, empowering your application to stay in sync with the user's navigation. 🌐🔗

## Usage

```tsx
import { useLocationHash } from "./useLocationHash";

const MyComponent = () => {
  const hash = useLocationHash();

  return (
    <div>
      <h1>Current Hash: {hash}</h1>
      <a href="#section1">Go to Section 1</a>
      <a href="#section2">Go to Section 2</a>
    </div>
  );
};
```

## Reference

```tsx
/**
 * A custom hook that returns the current hash of the URL.
 * @returns {string} The current hash of the URL.
 */
const useLocationHash: () => string;
```

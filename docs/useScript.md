# `useScript`

A lightweight and efficient React hook that simplifies the process of dynamically loading external scripts into your components, enabling you to easily extend your application's functionality. 📜🚀

## Usage

```tsx
import { useScript } from "./useScript";

const MyComponent = () => {
  useScript("https://example.com/script.js");

  return <div>Hello, World!</div>;
};
```

## Reference

```tsx
/**
 * @param {string} url - The URL of the script to be loaded.
 */
export const useScript = (url: string) => void;
```

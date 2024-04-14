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

Under the Hood
The useScript hook leverages React's `useEffect` hook to dynamically create a `<script>` element and append it to the document's `<body>`. It sets the `src` attribute of the script to the provided URL and marks it as `async` for non-blocking execution. When the component unmounts, the hook removes the script element from the document to prevent memory leaks.

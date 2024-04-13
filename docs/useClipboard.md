# `useClipboard`

A cutting-edge React hook that empowers developers to effortlessly copy text to the clipboard with just a few lines of code. 📋✨

## Usage

```tsx
import { useClipboard } from "./hooks/useClipboard";

function MyComponent() {
  const [copiedText, copy] = useClipboard();

  const handleCopy = () => {
    copy("Hello, world!", () => {
      console.log("Text copied to clipboard!");
    });
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy Text</button>
      <p>Copied Text: {copiedText}</p>
    </div>
  );
}
```

## Reference

```ts
const [copiedText, copy] = useClipboard(copiedValue, copyFn);
```

- **`copiedValue`** _`string | null`_ (optional) - The initial value of the copied text. Defaults to null. 📝

- **`copyFn`** _`CopyFn`_ (optional) - A custom copy function to use instead of the default implementation. 🔧

- **`copiedText`** _`CopiedValue`_ - The current value of the copied text. 📋

- **`copy`** _`CopyFn`_ - A function that copies the provided text to the clipboard. Returns a promise that resolves to true if the copy operation was successful, or false otherwise. 📋✅

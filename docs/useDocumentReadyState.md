# `useDocumentReadyState`

A dynamic React hook that tracks the current `readyState` of the document 📄🔄

## Usage

```tsx
import { useDocumentReadyState } from "./hooks/useDocumentReadyState";

function MyComponent() {
  const readyState = useDocumentReadyState();

  return (
    <div>
      <h1>My Component</h1>
      <p>Document Ready State: {readyState}</p>
    </div>
  );
}
```

## Reference

```tsx
const documentState = useDocumentReadyState();
```

- `documentState` _DocumentReadyState_ - Represents the current readiness state of the document.

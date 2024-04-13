# `useDocumentTitle`

A handy React hook for dynamically updating the document title based on the provided input. 📄🔖

## Usage

```tsx
import { useDocumentTitle } from "./hooks/useDocumentTitle";

function MyComponent() {
  useDocumentTitle("My App - Dashboard");

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Component content */}
    </div>
  );
}
```

## Reference

```tsx
useDocumentTitle("New Page Title");
```

- `title` _`string`_ - The new title to be set for the document.

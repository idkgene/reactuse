# `useDebug`

A React Hook designed to determine if the current environment is in debug mode or not. 🛠️🔍

## Usage

```tsx
import { useDebug } from "./useDebug";

function MyComponent() {
  const isDebugMode = useDebug();

  return (
    <div>
      <h1>My Component</h1>
      {isDebugMode && (
        <div>
          <p>Debug information:</p>
          <ul>
            <li>Current URL: {window.location.href}</li>
            <li>Environment: {process.env.NODE_ENV}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Reference

```tsx
const debug = useDebug();
```

- *`debugMode`* _`boolean`_ - Indicates if the current environment is in debug mode. 🛠️🔍 
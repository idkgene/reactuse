# `useLogger`

A captivating React hook that effortlessly logs the lifecycle events of your components, empowering you to gain valuable insights into your application's behavior. 🔍🧭

## Usage

```tsx
import { useLogger } from "./useLogger";

const MyComponent = ({ id, name }) => {
  useLogger("MyComponent", id, name);

  return (
    <div>
      <h1>Component: {name}</h1>
      <p>ID: {id}</p>
    </div>
  );
};
```

## Reference

```tsx
type LoggerArgs = any[];

/**
 * A custom hook that logs the mount and unmount events of a component.
 * @param name - The name of the component.
 * @param args - Additional arguments to be logged.
 * @returns void
 */
export const useLogger: <T>(name: T, ...args: LoggerArgs) => void;
```

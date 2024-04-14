# `useList`

A captivating and versatile React hook that empowers you to effortlessly manage dynamic lists, elevating your application's state management to new heights. 🌟

## Usage

```tsx
import { useList } from "./useList";

const MyComponent = () => {
  const [list, { push, removeAt, insertAt, updateAt, clear }] = useList([
    "Apple",
    "Banana",
    "Orange",
  ]);

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => push("Grape")}>Add Grape</button>
      <button onClick={() => removeAt(1)}>Remove Banana</button>
      <button onClick={() => insertAt(2, "Mango")}>Insert Mango at index 2</button>
      <button onClick={() => updateAt(0, "Pineapple")}>Update Apple to Pineapple</button>
      <button onClick={clear}>Clear List</button>
    </div>
  );
};
```

## Reference

```tsx
/**
 * @template T - The type of elements in the list.
 * @param {T[]} [defaultList=[]] - The initial list of elements.
 * @returns {[T[], { set: (l: T[]) => void, push: (element: T) => void, removeAt: (index: number) => void, insertAt: (index: number, element: T) => void, updateAt: (index: number, element: T) => void, clear: () => void }]} An array containing the list and an object with utility functions to manage the list.
 */
export function useList<T>(defaultList?: T[]): [
  T[],
  {
    set: (l: T[]) => void;
    push: (element: T) => void;
    removeAt: (index: number) => void;
    insertAt: (index: number, element: T) => void;
    updateAt: (index: number, element: T) => void;
    clear: () => void;
  }
];
```

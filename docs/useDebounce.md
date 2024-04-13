# `useDebounce`

A versatile React hook that allows developers to debounce any value changes effortlessly. 🔄⏳

## Usage

```tsx
import { useDebounce } from "./hooks/useDebounce";

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Perform search with the debounced search term
    searchItems(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <p>Debounced Search Term: {debouncedSearchTerm}</p>
    </div>
  );
}
```

## Reference

```tsx
const debouncedValue = useDebounce(value, delay);
```

- `debouncedValue` _`T`_ - The debounced value returned by the hook. 🔄⏳
- `value` _`T`_ - The original value to be debounced.
- `delay` _`number`_ - The debounce delay in milliseconds. Defaults to 500.

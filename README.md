# React Hooks Collection

![](https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png)

Welcome to the React Hooks Collection repository! This is a collection of custom React hooks that are designed to simplify and improve your React development experience. These hooks provide reusable and effective solutions to problems and patterns found in React applications.

## Available Hooks

Currently, the following hooks have been implemented and thoroughly (almost) tested:

- `useClipboard`: Simplifies clipboard operations, allowing you to easily copy and paste text.
- `useDebounce`: A hook that provides a debounced version of a value, which is updated only after a certain delay.
- `useDebug`: A hook that returns true if the current window URL contains the string `#debug` or if we're in development mode.
- `useDocumentReadyState`: A hook that returns the document ready state, which is useful for detecting when the document is fully loaded.
- `useDocumentTitle`: A hook that sets the document title based on a given string.
- `useEffectOnce`: A hook that runs an effect only once, on the initial render.
- `useEventListener`: A hook that adds an event listener to a specified target and removes it when the component unmounts.
- `useFavicon`: A hook that sets the favicon of the document.
- `useFirstMountState`: A hook that returns true if the component is being rendered for the first time.
- `useFoucFix`: A hook that fixes the focus issue in iOS Safari.
- `useHover`: A hook that tracks the hover state of a given ref.
- `useIdle`: A hook that tracks whether the user is idle or active based on mouse and keyboard events.
- `useIntersectionObserver`: A hook that observes the intersection of a target element with an ancestor element or the viewport.
- `useInterval`: A hook that sets up an interval and clears it after the component unmounts.
- `useIOSToolbarState`: A hook that returns the current state of the iOS toolbar (visible or hidden).
- `useIsClient`: A hook that returns true if the current window is a client-side window.
- `useIsomorphicLayoutEffect`: A hook that resolves to useEffect on the server and useLayoutEffect on the client.
- `useIsTouchDevice`: A hook that returns true if the current window is a touch device.
- `useIsVisible`: A hook that returns true if an element is visible within the viewport.
- `useKeySequence`: A hook that listens for a sequence of keyboard events and triggers a callback when the sequence is completed.
- `useList`: A hook that manages a list of items and provides convenience methods for adding, removing, and updating items.
- `useMediaQuery`: A hook that returns true if a given media query matches the current viewport.
useOnClickOutside: A hook that triggers a callback when a click event occurs outside of a specified ref.
- `useOrientation`: A hook that returns the current orientation of the device (portrait or landscape).
usePageLeave: A hook that triggers a callback when the user attempts to leave the current page.
- `useScript`: A hook that dynamically loads an external script.
- `useSessionStorage`: A hook that provides a convenient way to interact with session storage.
- `useThrottle`: A hook that throttles a value, ensuring that it is only updated at most once per specified duration.
- `useUnmount`: A hook that triggers a callback when the component unmounts.
- `useUpdateEffect`: A hook that runs an effect only when the dependencies change, skipping the initial render.
- `useWindowSize`: A hook that returns the current size of the browser window.

## Usage

`useClipboard`

The `useClipboard` hook simplifies clipboard operations, allowing you to easily copy text to the clipboard and retrieve the currently copied value

```tsx
import { useClipboard } from './hooks/useClipboard';

function MyComponent() {
  const [copiedText, copy] = useClipboard();

  const handleCopy = () => {
    copy('Hello, world!', () => {
      console.log('Text copied to clipboard!');
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

`useDebounce`

The `useDebounce` hook is used to debounce a value, which means delaying the update of the value until a certain amount of time has passed since the last change. This is useful for scenarios where you want to wait for a user to finish typing or for a certain event to settle before triggering an action

```tsx
import { useDebounce } from './hooks/useDebounce';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
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

`useDebug`

The `useDebug` hook is a utility that determines whether the current environment is in debug mode. It returns true if the current window URL contains the string #debug or if the application is running in development mode.

```tsx
import { useDebug } from './useDebug';

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

`useDocumentReadyState`

The `useDocumentReadyState` hook provides the current `readyState` of the document. It returns the `readyState` value, which can be one of the following:

- `'loading'`: The document is still loading.
- `'interactive'`: The document has finished loading and the document has been parsed, but sub-resources such as images, stylesheets, and frames are still loading.
- `'complete'`: The document and all sub-resources have finished loading. The state indicates that the `load` event is about to fire.


```tsx
import { useDocumentReadyState } from './hooks/useDocumentReadyState';

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

`useDocumentTitle`

The `useDocumentTitle` hook is used to update the document title with a provided string. It takes a single parameter, `title`, which represents the new title to be set for the document.

```tsx
import { useDocumentTitle } from './hooks/useDocumentTitle';

function MyComponent() {
  useDocumentTitle('My App - Dashboard');

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Component content */}
    </div>
  );
}
```

`useEffectOnce`

The `useEffectOnce` hook is used to run an effect function only once, on the initial render of a component. It takes a single parameter, `effect`, which is the effect function to be executed.

```jsx
import { useEffectOnce } from './hooks/useEffectOnce';

function MyComponent() {
  useEffectOnce(() => {
    console.log('This effect runs only once on mount');

    return () => {
      console.log('This cleanup runs only once on unmount');
    };
  });

  return (
    <div>
      <h1>My Component</h1>
      {/* Component content */}
    </div>
  );
}```

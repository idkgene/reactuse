![Banner Logo](https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png)

Welcome to the React Hooks Collection repository! This is a collection of custom React hooks that are designed to simplify and improve your React development experience. These hooks provide reusable and effective solutions to problems and patterns found in React applications.

## Available Hooks

Currently, the following hooks have been implemented and thoroughly (almost) tested:

- [`useBattery`](/docs/useBattery.md): A hook that provides information about the battery level of the device.
- [`useClipboard`](/docs/useClipboard.md): Simplifies clipboard operations, allowing you to easily copy and paste text.
- [`useConnectedDevice`](/docs//useConnectedDevice.md): A hook that returns information about the connected device, such as the device type, battery level, and signal strength.
- [`useDebounce`](/docs/useDebounce.md): A hook that provides a debounced version of a value, which is updated only after a certain delay.
- [`useDebug`](/docs/useDebug.md): A hook that returns true if the current window URL contains the string `#debug` or if we're in development mode.
- [`useDocumentReadyState`](/docs/useDocumentReadyState.md): A hook that returns the document ready state, which is useful for detecting when the document is fully loaded.
- [`useDocumentTitle`](/docs/useDocumentTitle.md): A hook that sets the document title based on a given string.
- [`useDrag`](/docs/useDrag.md): A hook that provides a convenient way to handle drag in React.
- [`useEffectOnce`](/docs/useEffectOnce.md): A hook that runs an effect only once, on the initial render.
- [`useEventListener`](/docs/useEventListener.md): A hook that adds an event listener to a specified target and removes it when the component unmounts.
- [`useFavicon`](/docs/useFavicon.md): A hook that sets the favicon of the document.
- [`useFetch`](/docs/useFetch.md): A hook that simplifies fetching data from an API.
- [`useFirstMountState`](/docs/useFirstMountState.md): A hook that returns true if the component is being rendered for the first time.
- [`useFoucFix`](/docs/useFoucFix.md): A hook that fixes the focus issue in Next JS.
- [`useGeolocation`](/docs/useGeolocation.md): A hook that alows to get the current geolocation of the user.
- [`useHover`](/docs/useHover.md): A hook that tracks the hover state of a given ref.
- [`useIdle`](/docs/useIdle.md): A hook that tracks whether the user is idle or active based on mouse and keyboard events.
- [`useIntersectionObserver`](/docs/useIntersectionObserver.md): A hook that observes the intersection of a target element with an ancestor element or the viewport.
- [`useInterval`](/docs/useInterval.md): A hook that sets up an interval and clears it after the component unmounts.
- [`useIOSToolbarState`](/docs/useIOSToolbarState.md): A hook that returns the current state of the iOS toolbar (visible or hidden).
- [`useIsClient`](/docs/useIsClient.md): A hook that returns true if the current window is a client-side window.
- [`useIsomorphicLayoutEffect`](/docs/useIsomorphicLayoutEffect.md): A hook that resolves to useEffect on the server and useLayoutEffect on the client.
- [`useIsTouchDevice`](/docs/useIsTouchDevice.md): A hook that returns true if the current window is a touch device.
- `useIsVisible`: A hook that returns true if an element is visible within the viewport.
- `useKeySequence`: A hook that listens for a sequence of keyboard events and triggers a callback when the sequence is completed.
- `useList`: A hook that manages a list of items and provides convenience methods for adding, removing, and updating items.
- `useLocationHash`: A hook that allows you to update the URL hash and listen for changes to the hash.
- `useLogger`: A hook that logs messages to the console.
- `useLongPress`: A hook that triggers a callback when a user long presses a given element.
- `useMediaQuery`: A hook that returns true if a given media query matches the current viewport.
- `useMousePosition`: A hook that returns the current mouse position.
- [`useMouseWheel`](/docs/useMouseWheel.md): A hook that tracks the mouse wheel movement and provides information about the direction and amount of scrolling.
- [`useNetworkState`](/docs/useNetworkState.md): A hook that returns the current network state (online/offline).
- [`useOnClickOutside`](/docs/useOnClickOutside.md): A hook that triggers a callback when a click event occurs outside of a specified ref.
- [`useOrientation`](/docs/useOrientation.md): A hook that returns the current orientation of the device (portrait or landscape).
- [`usePageLeave`](/docs/usePageLeave.md): A hook that triggers a callback when the user attempts to leave the current page.
- [`usePreferredLanguage`](/docs/usePrefferedLanguage.md): A hook that returns the preferred language code of the browser.
- [`useRect`](/docs//useRect.md): A hook that returns the current dimensions of a DOM element.
- [`useScript`](/docs/useScript.md): A hook that dynamically loads an external script.
- [`useSessionStorage`](/docs/useSessionStorage.md): A hook that provides a convenient way to interact with session storage.
- [`useThrottle`](/docs/useThrottle.md): A hook that throttles a value, ensuring that it is only updated at most once per specified duration.
- [`useUnmout`](/docs/useUnmout.md): A hook that triggers a callback when the component unmounts.
- [`useUpdateEffect`](/docs/useUpdateEffect.md): A hook that runs an effect only when the dependencies change, skipping the initial render.
- [`useWindowLoad`](/docs/useWindowLoad.md): A hook that returns a boolean value indicating whether the window has finished loading.
- [`useWindowResize`](/docs/useWindowResize.md): A hook that returns the current size of the browser window.
- [`useWindowSize`](/docs/useWindowSize.md): A hook that returns the current size of the browser window.

### Usage

- [Available Hooks](#available-hooks)
  - [Usage](#usage)
    - [`useIsVisible`](#useisvisible)
    - [`useKeySequence`](#usekeysequence)
    - [`useList`](#uselist)
    - [`useMediaQuery`](#usemediaquery)

---

#### `useIsVisible`

The useIsVisible hook is a utility that uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if an element is visible within the viewport or a specified root element. It provides a convenient way to track the visibility of elements and trigger actions based on their visibility state.

```tsx
import { useIsVisible } from "./hooks/useIsVisible";

function MyComponent() {
  const { setRef, inView } = useIsVisible({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    once: true,
  });

  return (
    <div ref={setRef}>
      {inView ? "Element is visible" : "Element is not visible"}
    </div>
  );
}
```

---

#### `useKeySequence`

The `useKeySequence` hook is a utility that listens for a specific key sequence and executes a callback function when the sequence is detected. It allows you to define custom keyboard shortcuts or triggers in your application.

```tsx
import { useKeySequence } from "./hooks/useKeySequence";

function MyComponent() {
  useKeySequence({
    sequence: "abc",
    callback: () => {
      console.log('Key sequence "abc" detected!');
    },
    eventType: "keydown",
    keystrokeDelay: 500,
  });

  return (
    <div>
      Press the keys 'a', 'b', and 'c' in sequence to trigger the callback.
    </div>
  );
}
```

---

#### `useList`

The `useList` hook is a custom React hook that provides a list and a set of utility functions to manage the list. It allows you to easily manipulate the elements of the list without directly modifying the state.

```tsx
import { useList } from "./hooks/useList";

function MyComponent() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([
    "apple",
    "banana",
    "orange",
  ]);

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => push("grape")}>Add Grape</button>
      <button onClick={() => removeAt(1)}>Remove at Index 1</button>
      <button onClick={() => insertAt(2, "pineapple")}>
        Insert Pineapple at Index 2
      </button>
      <button onClick={() => updateAt(0, "mango")}>
        Update at Index 0 with Mango
      </button>
      <button onClick={clear}>Clear List</button>
    </div>
  );
}
```

---

#### `useMediaQuery`

The useMediaQuery hook is a utility that checks if the current browser window matches a given media query. It allows you to conditionally render components or apply styles based on the viewport size or other media features.

```tsx
import { useMediaQuery } from "./hooks/useMediaQuery";

function MyComponent() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <div>
      {isSmallScreen ? (
        <div>
          <h2>Small Screen</h2>
          <p>This content is optimized for small screens.</p>
        </div>
      ) : (
        <div>
          <h2>Large Screen</h2>
          <p>This content is optimized for large screens.</p>
        </div>
      )}
    </div>
  );
}
```

---

`useMousePosition`

The `useMousePosition` hook is a utility that returns the current mouse position. It provides a `x` and `y` property that represent the mouse's x and y coordinates, respectively.

```tsx
import { useMousePosition } from "./hooks/useMousePosition";

function MyComponent() {
  const { x, y } = useMousePosition();

  return (
    <div>
      <p>Mouse X: {x}</p>
      <p>Mouse Y: {y}</p>
    </div>
  );
}
```

---

# `useIdle`

A powerful and efficient React hook that allows you to easily detect when a user becomes idle or inactive on your website or application, enabling you to create more engaging and responsive user experiences. ⏰💤

## Usage

```tsx
import { useIdle } from "./useIdle";

const MyComponent = () => {
  const isIdle = useIdle(5000); // User is considered idle after 5 seconds

  return <div>{isIdle ? "User is idle" : "User is active"}</div>;
};
```

## Reference

```tsx
/**
 * @module useIdle
 * @param {number} [ms=60000] - The amount of time in milliseconds after which the user is considered idle.
 * @returns {boolean} A boolean indicating whether the user is currently idle.
 */
export function useIdle(ms?: number): boolean;
```

## Under the Hood

The useIdle hook utilizes React's `useState` and `useEffect` hooks to manage the idle state and set up event listeners. It listens for various user events such as `mousemove`, `mousedown`, `resize`, `keydown`, `touchstart`, and `wheel` to determine if the user is active.

When any of these events occur, the idle state is set to `false`, and a timeout is started using `setTimeout`. If no further events are detected within the specified time (`ms`), the idle state is set to `true`, indicating that the user is idle.

The hook also listens for the `visibilitychange` event to detect when the user switches to another tab or window. If the user returns to the page, the idle state is reset to `false`.

The `useEffect` hook is used to set up the initial timeout and event listeners when the component mounts and to clean up the listeners when the component unmounts.

Finally, the hook returns a boolean value indicating whether the user is currently idle or not, which can be used to conditionally render content or trigger actions in your React components.

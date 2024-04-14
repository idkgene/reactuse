# `useIsClient`



## Usage



## Reference



## Under the Hood

The `useIsClient` hook leverages React's `useState` and `useEffect` hooks to determine whether the code is running on the client-side. Initially, the `isClient` state is set to `false`. Once the component mounts, the useEffect hook is triggered, setting the `isClient` state to `true`. This ensures that the hook returns `false` during server-side rendering and `true` once the component is hydrated on the client-side.

![Banner Logo](https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png)

# 📚 React Hooks Collection

This is a collection of custom React hooks that are designed to simplify and improve your React development experience. These hooks provide reusable and effective solutions to problems and patterns found in React applications.

## 🔋 Device and Browser

- [useBattery](/docs/useBattery.md): Provides information about the battery level of the device.
- [useConnectedDevice](/docs/useConnectedDevice.md): Returns information about the connected device, such as the device type, battery level, and signal strength.
- [useGeolocation](/docs/useGeolocation.md): Retrieves the current geolocation of the user.
- [useIsTouchDevice](/docs/useIsTouchDevice.md): Detects if the current window is a touch device.
- [useMediaQuery](/docs/useMediaQuery.md): Checks if a given media query matches the current viewport.
- [useNetworkState](/docs/useNetworkState.md): Returns the current network state (online/offline).
- [useOrientation](/docs/useOrientation.md): Returns the current orientation of the device (portrait or landscape).
- [usePreferredLanguage](/docs/usePrefferedLanguage.md): Returns the preferred language code of the browser.

## 🖱️ User Interaction

- [`useClipboard`](/docs/useClipboard.md): Simplifies clipboard operations, allowing you to easily copy and paste text.
- [`useDrag`](/docs/useDrag.md): Handles drag interactions in React.
- [`useHover`](/docs/useHover.md): Tracks the hover state of a given ref.
- [`useIdle`](/docs/useIdle.md): Tracks whether the user is idle or active.
- [`useIntersectionObserver`](/docs/useIntersectionObserver.md): Observes the intersection of a target element.
- [`useMousePosition`](/docs/useMousePosition.md): Returns the current mouse position.
- [`useMouseWheel`](/docs/useMouseWheel.md): Tracks the mouse wheel movement.
- [`useOnClickOutside`](/docs/useOnClickOutside.md): Triggers a callback when a click event occurs outside of a specified ref.
- [`usePageLeave`](/docs/usePageLeave.md): Triggers a callback when the user attempts to leave the current page.

## ⚙️ Lifecycle and State

- [`useDebounce`](/docs/useDebounce.md): Provides a debounced version of a value, which is updated only after a certain delay.
- [`useEffectOnce`](/docs/useEffectOnce.md): Runs an effect only once, on the initial render.
- [`useEventListener`](/docs/useEventListener.md): Adds an event listener to a specified target.
- [`useFirstMountState`](/docs/useFirstMountState.md): Returns true if the component is being rendered for the first time.
- [`useInterval`](/docs/useInterval.md): Sets up an interval and clears it after the component unmounts.
- [`useIsClient`](/docs/useIsClient.md): Returns true if the current window is a client-side window.
- [`useIsomorphicLayoutEffect`](/docs/useIsomorphicLayoutEffect.md): Resolves to useEffect on the server and useLayoutEffect on the client.
- [`useThrottle`](/docs/useThrottle.md): Throttles a value, ensuring that it is only updated at most once per specified duration.
- [`useUnmount`](/docs/useUnmount.md): Triggers a callback when the component unmounts.
- [`useUpdateEffect`](/docs/useUpdateEffect.md): Runs an effect only when the dependencies change.

## 📜 Document and Window

- [`useDocumentReadyState`](/docs/useDocumentReadyState.md): Returns the document ready state.
- [`useDocumentTitle`](/docs/useDocumentTitle.md): Sets the document title based on a given string.
- [`useFavicon`](/docs/useFavicon.md): Sets the favicon of the document.
- [`useIOSToolbarState`](/docs/useIOSToolbarState.md): Returns the current state of the iOS toolbar (visible or hidden).
- [`useWindowLoad`](/docs/useWindowLoad.md): Returns a boolean indicating whether the window has finished loading.
- [`useWindowResize`](/docs/useWindowResize.md): Returns the current size of the browser window.
- [`useWindowSize`](/docs/useWindowSize.md): Returns the current size of the browser window.

## 🌐 Data Fetching

- [`useFetch`](/docs/useFetch.md): Simplifies fetching data from an API.
- [`useScript`](/docs/useScript.md): Dynamically loads an external script.

## 💾 Storage

- [`useSessionStorage`](/docs/useSessionStorage.md): Provides a convenient way to interact with session storage.

## 🐛 Debugging

- [`useDebug`](/docs/useDebug.md): Returns true if the current window URL contains #debug or if in development mode.

## 🎨 UI and Layout

- [`useFocusFix`](/docs/useFocusFix.md): Fixes the focus issue in Next.js.
- [`useRect`](/docs/useRect.md): Returns the current dimensions of a DOM element.

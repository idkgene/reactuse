# `useEventListener`

A dynamic React module designed to facilitate event listening on specified target elements with customizable options. 🎧🔍

## Usage

```tsx
import { useEventListener } from "./hooks/useEventListener";
import { useRef } from "react";

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener("click", handleClick, buttonRef);

  function handleClick(event: MouseEvent) {
    console.log("Button clicked!", event);
  }

  return (
    <div>
      <button ref={buttonRef}>Click me</button>
    </div>
  );
}
```

## Reference

```tsx
/**
 * A versatile module for listening to events on target elements with customizable options.
 * @param eventName - The name of the event to listen for.
 * @param handler - The event handler function.
 * @param element - A reference to the target element. If not provided, defaults to the window object.
 * @param options - Optional options to pass to the addEventListener method.
 * @returns void
 */
import { useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useEventListener<
  K extends keyof WindowEventMap | keyof HTMLElementEventMap | keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | Window = HTMLElement | MediaQueryList | Window

> (
>   eventName: K,
>   handler: (event: Event) => void,
>   element?: React.RefObject<T>,
>   options?: boolean | AddEventListenerOptions
> ) {
>   const handlerRef = useRef(handler);

useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

if (targetElement && typeof targetElement.addEventListener === 'function') {
      targetElement.addEventListener(eventName, handlerRef.current, options);

return () => {
        targetElement.removeEventListener(eventName, handlerRef.current, options);
      };
    }
  }, [eventName, element, options]);
}
```

This module enabled efficient event handling by allowing users to specify the event name, event handler function, target element, and optional options. The use of useRef ensures that the event handler is consistently updated, while the use of useEffect manages the event listener attachment and removal based on the specified parameters. 🚀🔍

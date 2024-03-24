/**
 * A custom React hook that provides a unified way to use either `useEffect` or `useLayoutEffect`
 * based on the environment (client-side or server-side).
 *
 * This hook is useful when dealing with server-side rendering (SSR) scenarios, where the `useLayoutEffect`
 * hook cannot be used on the server-side because it requires a browser environment.
 *
 * On the client-side, this hook will use `useLayoutEffect`, which is synchronous and fires after all
 * DOM mutations. On the server-side, it will use `useEffect`, which is asynchronous and fires after
 * the browser has painted.
 *
 * @returns {typeof useEffect | typeof useLayoutEffect} The appropriate effect hook based on the environment.
 */

import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
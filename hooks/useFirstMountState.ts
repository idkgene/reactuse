/**
 * A React hook that returns true on the initial render and false on subsequent renders.
 *
 * @module useFirstMountState
 * @returns {boolean} True on the initial render, false on subsequent renders.
 */

import { useRef } from 'react';

export function useFirstMountState(): boolean {
  /**
   * Create a mutable reference using the `useRef` hook.
   * 
   * The `useRef` hook returns a mutable ref object whose `.current` property is initialized
   * to the passed argument (`true` in this case). The returned object will persist for the
   * full lifetime of the component.
   * 
   * By using `useRef`, we can maintain a value between renders without triggering a re-render
   * when the value changes. This is useful for storing and updating values that don't require
   * the component to re-render.
   */
  const isFirst = useRef(true);

  /**
   * Check if it's the first render by accessing the `.current` property of the `isFirst` ref.
   * 
   * On the initial render, `isFirst.current` will be `true` because it was initialized with
   * `true` when the `useRef` hook was called.
   */
  if (isFirst.current) {
    /**
     * If it's the first render, set `isFirst.current` to `false`.
     * 
     * This ensures that on subsequent renders, `isFirst.current` will be `false`, indicating
     * that it's no longer the first render.
     */
    isFirst.current = false;

    /**
     * Return `true` to indicate that it's the first render.
     */
    return true;
  }

  /**
   * If it's not the first render, `isFirst.current` will be `false`.
   * 
   * Return `isFirst.current`, which is `false`, to indicate that it's not the first render.
   */
  return isFirst.current;
}
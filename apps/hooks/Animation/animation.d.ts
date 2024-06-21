/**
 * Options for the `useInterval` hook.
 * 
 * @interface UseIntervalOptions
 * @description Configuration options for the `useInterval` hook
 * @property {boolean} [immediate=true] - Whether or not to run the callback function immediately when the hook is called.
 * @property {(count: number) => void} [callback] - An optional function to be called each time the interval elapses.
 */
export interface UseIntervalOptions {
  immediate?: boolean;
  callback?: (count: number) => void;
}

/**
 * Controls for the `useInterval` hook.
 * 
 * @interface UseIntervalControls
 * @description Controls for the `useInterval` hook.
 * @property {number} counter - The current count of intervals that have elapsed.
 * @property {() => void} reset - A function to reset the counter to 0.
 * @property {() => void} pause - A function to pause the interval.
 * @property {() => void} resume - A function to resume the interval.
 */
export interface UseIntervalControls {
  counter: number;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Type representing the callback function used in `whenever`
 *
 * @template T
 * @param {T} current - The current value of the observed variable.
 * @param {T| undefined} previous - The previous value of the observed variable.
 */
export type WatchCallback<T> = (current: T, previous: T | undefined) => void;

/**
 * Options that can be passed to the `whenever` function.
 *
 * @interface WheneverOptions
 * @property {boolean} [once] - If true, the callback will only be triggered once.
 */
export interface WheneverOptions {
  once?: boolean;
}

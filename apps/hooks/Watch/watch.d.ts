/**
 * Type alias representing the callback function used by `useWhenever`.
 *
 * The callback function receives two arguments: the current value being
 * monitored and the previous value.
 *
 * @template T
 * @callback WatchCallback
 * @param {T} current - The current truthy value.
 * @param {T | undefined} previous - The previous value, which may be undefined.
 * @returns {void}
 */
export type WatchCallback<T> = (current: T, previous: T | undefined) => void;

/**
 * Options object for the `useWhenever` hook.
 *
 * This object can include additional configuration options for the hook.
 *
 * @typedef {Object} WheneverOptions
 * @property {boolean} [once=false] - If true, the callback will only be triggered once.
 */
export interface WheneverOptions {
  once?: boolean;
}

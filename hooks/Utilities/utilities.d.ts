import { MutableRefObject } from 'react';

/**
 * Defines a type that excludes `null` and `undefined` values from the given type `T`.
 *
 * @param T - The original type.
 * @returns A new type that excludes `null` and `undefined` values.
 */
export type Defined<T> = Exclude<T, null | undefined>;

/**
 * A task function that is executed in the async queue.
 *
 * @type {(...args: any[]) => T | Promise<T>} UseAsyncQueueTask
 * @template T - The type of the task result.
 */
export type UseAsyncQueueTask<T> = (...args: any[]) => T | Promise<T>;

/**
 * Represents the result of an individual task in the async queue.
 *
 * @type {Object} UseAsyncQueueResult
 * @template T - The type of the task result.
 * @property {'aborted' | 'fulfilled' | 'pending' | 'rejected'} state - The state of the task.
 * @property {T | null} data - The result data of the task, or null if the task is not fulfilled.
 */
export type UseAsyncQueueResult<T> = {
  state: 'aborted' | 'fulfilled' | 'pending' | 'rejected';
  data: T | null;
};

/**
 * The return object provided by the `useAsyncQueue` hook.
 *
 * @type {Object} UseAsyncQueueReturn
 * @template T - An array of task result types.
 * @property {number} activeIndex - The index of the currently executing task.
 * @property {UseAsyncQueueResult<T[P]>[]} result - An array of results for each task in the queue.
 */
export type UseAsyncQueueReturn<T extends unknown[]> = {
  activeIndex: number;
  result: {
    [P in keyof T]: UseAsyncQueueResult<T[P]>;
  };
};

/**
 * Options to customize the behavior of the async queue.
 *
 * @type {Object} UseAsyncQueueOptions
 * @property {boolean} [interrupt=true] - Whether to stop executing subsequent tasks if a task fails.
 * @property {() => void} [onError] - A callback function that's called when a task fails.
 * @property {() => void} [onFinished] - A callback function that's called when all tasks have finished executing.
 * @property {AbortSignal} [signal] - An AbortSignal to cancel the queue execution.
 */
export type UseAsyncQueueOptions = {
  interrupt?: boolean;
  onError?: () => void;
  onFinished?: () => void;
  signal?: AbortSignal;
};

/**
 * Options for customizing the cloning behavior in the `useCloned` hook.
 *
 * @interface UseClonedOptions
 * @template T - The type of the source object.
 * @property {(source: T) => T} [clone=cloneFnJSON] - A function to clone the source object.
 * @property {boolean} [manual=false] - Whether to manually control when the clone is updated.
 */
export interface UseClonedOptions<T = any> {
  clone?: (source: T) => T;
  manual?: boolean;
}

/**
 * The return object provided by the `useCloned` hook.
 *
 * @interface UseClonedReturn
 * @template T - The type of the source object.
 * @property {MutableRefObject<T>} cloned - The reference to the cloned object.
 * @property {() => void} sync - A function to manually sync the clone with the source.
 */
export interface UseClonedReturn<T> {
  cloned?: MutableRefObject<T>;
  sync: () => void;
}

/**
 * Options for configuring the `useCounter` hook.
 *
 * @interface UseCounterOptions
 * @property {number} [min] - The minimum value the counter can have.
 * @property {number} [max] - The maximum value the counter can have.
 */
export interface UseCounterOptions {
  min?: number;
  max?: number;
}

/**
 * The return object provided by the `useCounter` hook.
 *
 * @interface UseCounterResult
 * @property {number} count - The current count value.
 * @property {(delta?: number) => void} inc - Function to increment the count by a specified delta.
 * @property {(delta?: number) => void} dec - Function to decrement the count by a specified delta.
 * @property {() => number} get - Function to get the current count value.
 * @property {(value: number) => void} set - Function to set the count to a specific value.
 * @property {(value?: number) => void} reset - Function to reset the count to the initial value or a specified value.
 */
export interface UseCounterResult {
  count: number;
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

/**
 * Options for customizing the behavior of the `useCycleList` hook.
 *
 * @interface UseCycleListOptions
 * @template T - The type of items in the list.
 * @property {T} [initialValue] - The initial value to start at.
 * @property {number} [fallbackIndex=0] - The index to fall back to if the initial value is not found in the list.
 * @property {(value: T, list: T[]) => number} [getIndexOf] - A function to find the index of an item in the list.
 */
export interface UseCycleListOptions<T> {
  initialValue?: T;
  fallbackIndex?: number;
  getIndexOf?: (value: T, list: T[]) => number;
}

/**
 * The return object provided by the `useCycleList` hook.
 *
 * @interface UseCycleListReturn
 * @template T - The type of items in the list.
 * @property {T} state - The current state value.
 * @property {number} index - The current index.
 * @property {(n?: number) => T} next - Function to move to the next item.
 * @property {(n?: number) => T} prev - Function to move to the previous item.
 * @property {(i: number) => T} go - Function to move to a specific item.
 */
export interface UseCycleListReturn<T> {
  state: T;
  index: number;
  next: (n?: number) => T;
  prev: (n?: number) => T;
  go: (i: number) => T;
}

/**
 * Options for configuring the debounce behavior.
 *
 * @interface DebounceOptions
 * @property {number} [wait=0] - The wait time in milliseconds before updating the debounced value.
 * @property {boolean} [leading=false] - Whether to update the value immediately on leading edge.
 * @property {boolean} [trailing=true] - Whether to update the value at the trailing edge.
 * @property {number} [maxWait] - The maximum wait time in milliseconds before forcing the update.
 */
export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Options for controlling the debounce behavior.
 *
 * @interface DebounceFilterOptions
 * @property {number} [maxWait=0] - The maximum wait time in milliseconds before forcing the function to execute.
 * @property {boolean} [rejectOnCancel=false] - Whether to reject the promise when the function execution is cancelled.
 */
export interface DebounceFilterOptions {
  maxWait?: number;
  rejectOnCancel?: boolean;
}

/**
 * A utility type that creates a destructible object from a given object type `T`.
 *
 * @type {Object} DestructibleObject
 * @template T - The type of the object.
 * @property {K} [K in keyof T] - Each property of the object.
 */
export type DestructibleObject<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};

/**
 * A utility type that creates a destructible array from a given array type `A`.
 *
 * @type {Object} DestructibleArray
 * @template A - The type of the array.
 * @property {K} [K in keyof A] - Each element of the array.
 */
export type DestructibleArray<A extends readonly any[]> = {
  [K in keyof A]: A[K];
};

/**
 * A utility type that creates a destructible object from a given object type `T` and a given array type `A`.
 *
 * @typedef {Object} MakeDestructibleResult
 * @template T - The type of the object.
 * @template A - The type of the array.
 * @property {K} [K in keyof T | keyof A] - Each property of the object and each element of the array.
 */
export type MakeDestructibleResult<
  T extends Record<string, unknown>,
  A extends readonly any[],
> = DestructibleObject<T> & DestructibleArray<A>;

/**
 * A type representing a language code.
 *
 * @type {string} LanguageCode
 */
export type LanguageCode = string;

/**
 * Options for the `usePreferredLanguage` hook.
 *
 * @interface UsePreferredLanguageOptions
 * @property {(languageCode: LanguageCode) => void} [onLanguageChange] - A callback function triggered when the language changes.
 * @property {LanguageCode} [initialLanguage='en'] - The initial language code to use.
 */
export interface UsePreferredLanguageOptions {
  onLanguageChange?: (languageCode: LanguageCode) => void;
  initialLanguage?: LanguageCode;
}

/**
 * Represents the previous value of a given type or `undefined`.
 *
 * @type {T | undefined} PreviousValue
 * @template T - The type of the value being tracked.
 */
export type PreviousValue<T> = T | undefined;

/**
 * A callback function that checks for feature or capability support.
 *
 * @type {() => unknown} SupportCheckCallback
 */
export type SupportCheckCallback = () => unknown;

/**
 * An array of any types representing function arguments.
 *
 * @type {any[]} FunctionArgs
 */
export type FunctionArgs = any[];

/**
 * A type representing a function that returns a promise.
 *
 * @type {(...args: T) => Promise<void>} PromiseType
 * @template T - The argument types of the function.
 */
export type PromiseType<T extends FunctionArgs> = (...args: T) => Promise<void>;

/**
 * A type representing a callback function.
 *
 * @type {(...args: T) => void} CallbackType
 * @template T - The argument types of the function.
 */
export type CallbackType<T extends FunctionArgs> = (...args: T) => void;

/**
 * Options for the `useTimeoutPoll` hook.
 *
 * @interface UseTimeoutPollOptions
 * @property {boolean} [immediate=true] - Whether to start polling immediately.
 */
export interface UseTimeoutPollOptions {
  immediate?: boolean;
}

/**
 * An interface to control the polling state.
 *
 * @interface Pausable
 * @property {boolean} isActive - Indicates if the polling is active.
 * @property {() => void} pause - Pauses the polling.
 * @property {() => void} resume - Resumes the polling.
 */
export interface Pausable {
  isActive: boolean;
  pause: () => void;
  resume: () => void;
}

/**
 * Options for the `useToggle` hook.
 *
 * @interface UseToggleOptions
 * @template Truthy - The type of the "truthy" value.
 * @template Falsy - The type of the "falsy" value.
 * @property {Truthy} [truthyValue=true as Truthy] - The value representing the "truthy" state.
 * @property {Falsy} [falsyValue=false as Falsy] - The value representing the "falsy" state.
 */
export interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: Truthy;
  falsyValue?: Falsy;
}

/**
 * Options for the `useToNumber` hook.
 *
 * @interface UseToNumberOptions
 * @property {'parseFloat' | 'parseInt'} [method='parseFloat'] - Specifies the method to convert the value.
 * @property {number} [radix=10] - The radix to use when `method` is 'parseInt'.
 * @property {boolean} [nanToZero=false] - If true, returns 0 instead of NaN when the conversion fails.
 */
export interface UseToNumberOptions {
  method?: 'parseFloat' | 'parseInt';
  radix?: number;
  nanToZero?: boolean;
}

/**
 * A type representing a value or a function returning a value.
 *
 * @type {T | (() => T)} Resolvable
 * @template T - The type of the value.
 */
export type Resolvable<T> = T | (() => T);

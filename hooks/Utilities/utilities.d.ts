import * as React from 'react'

/**
 * Defines a type that excludes `null` and `undefined` values from the given type `T`.
 *
 * @typeparam T - The original type.
 * @returns A new type that excludes `null` and `undefined` values.
 */
export type Defined<T> = Exclude<T, null | undefined>

/**
 * @template T
 * @interface UseClonedOptions
 * @description Options for the `useCloned` hook.
 */
export interface UseClonedOptions<T = any> {
  /**
   * @typeparam T - The type of the value to be cloned.
   * @description Custom clone function. By default, it uses `JSON.parse(JSON.stringify(value))` to clone.
   */
  clone?: (source: T) => T

  /**
   * @typeparam T - The type of the value to be cloned.
   * @description Manually sync the ref.
   * @default false
   */
  manual?: boolean
}

/**
 * @template T
 * @interface UseClonedReturn
 * @description The return type of the `useCloned` hook.
 */
export interface UseClonedReturn<T> {
  /**
   * @typeparam T - The type of the cloned value.
   * @description Cloned ref.
   */
  cloned?: React.MutableRefObject<T>

  /**
   * @description Sync cloned data with the source manually.
   */
  sync: () => void
}

/**
 * @interface UseCounterOptions
 * @description Options for the `useCounter` hook.
 */
export interface UseCounterOptions {
  /**
   * @description Minimum value for the counter.
   */
  min?: number

  /**
   * @description Maximum value for the counter.
   */
  max?: number
}

/**
 * @interface UseCounterResult
 * @description The return type of the `useCounter` hook.
 */
export interface UseCounterResult {
  /**
   * @type {number}
   * @description The current count value.
   */
  count: number

  /**
   * @type {(delta?: number) => void}
   * @description Increments the count value by the specified delta.
   */
  inc: (delta?: number) => void

  /**
   * @type {(delta?: number) => void}
   * @description Increments the count value by the specified delta.
   */
  dec: (delta?: number) => void

  /**
   * @type {() => number}
   * @description Returns the current count value.
   */
  get: () => number

  /**
   * @type {(value: number) => void}
   * @description Sets the count to a specific value, respecting the optional min and max limits.
   */
  set: (value: number) => void

  /**
   * @type {(value?: number) => void}
   * @description Resets the count to the initial value or a specified value, respecting the optional min and max limits.
   */
  reset: (value?: number) => void
}

/**
 * @template T
 * @interface UseCycleListOptions
 * @description Options for the `useCycleList` hook.
 */
export interface UseCycleListOptions<T> {
  /**
   * @type {T}
   * @description The initial value of the state. A ref can be provided to reuse.
   */
  initialValue?: T

  /**
   * @type {number}
   * @default 0
   * @description The default index to fall back to.
   */
  fallbackIndex?: number

  /**
   * @type {(value: T, list: T[]) => number}
   * @description Custom function to get the index of the current value.
   */
  getIndexOf?: (value: T, list: T[]) => number
}

/**
 * @template T
 * @interface UseCycleListReturn
 * @description The return type of the `useCycleList` hook.
 */
export interface UseCycleListReturn<T> {
  /**
   * @type {T}
   * @description The current state value.
   */
  state: T

  /**
   * @type {number}
   * @description The current index of the state value.
   */
  index: number

  /**
   * @type {(n?: number) => T}
   * @description Move to the next item in the list.
   */
  next: (n?: number) => T

  /**
   * @type {(n?: number) => T}
   * @description Move to the previous item in the list.
   */
  prev: (n?: number) => T

  /**
   * @type {(i: number) => T}
   * @description Go to a specific index in the list.
   */
  go: (i: number) => T
}

/**
 * @template T
 * @interface UseDebounceOptions
 * @description Options for the `useDebounce` hook.
 */
export interface UseDebounceOptions<T> {
  /**
   * @type {T}
   * @description The initial value to be returned by the hook.
   */
  initialValue?: T

  /**
   * @type {(prev: T, next: T) => boolean}
   * @description A function to determine if the debounce should be triggered.
   */
  shouldDebounce?: (prev: T, next: T) => boolean
}

/**
 * @template T
 * @type {Object}
 * @description A utility type that creates a destructurable object from a given object type `T`.
 */
export type DestructurableObject<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
}

/**
 * @template A
 * @type {Object}
 * @description A utility type that creates a destructurable array from a given array type `A`.
 */
export type DestructurableArray<A extends readonly any[]> = {
  [K in keyof A]: A[K]
}

/**
 * @template T
 * @template A
 * @type {Object}
 * @description A utility type that creates a destructurable object from a given object type `T` and a given array type `A`.
 */
export type MakeDestructurableResult<
  T extends Record<string, unknown>,
  A extends readonly any[],
> = DestructurableObject<T> & DestructurableArray<A>

/**
 * @type {string}
 * @description A type representin a language code.
 */
export type LanguageCode = string

/**
 * @description Options for the `usePreferredLanguage` hook.
 */
export interface UsePreferredLanguageOptions {
  /**
   * @description A callback function that triggers when the language changes.
   * @param {LanguageCode} languageCode - The new language code.
   * @returns {void}
   */
  onLanguageChange?: (languageCode: LanguageCode) => void

  /**
   * @type {LanguageCode}
   * @description The initial language code to use.
   * @default 'en'
   */
  initialLanguage?: LanguageCode
}

/**
 * @type {T | undefined}
 * @template T - The type of the value being tracked.
 */
export type PreviousValue<T> = T | undefined

/**
 * @type {() => unknown}
 * @description A type representing a callback function that checks for feature support.
 */
export type SupportCheckCallback = () => unknown

/**
 * @type {any[]}
 * @description A type representing arguments of a function.
 */
export type FunctionArgs = any[]

/**
 *
 * @template T - The type of the function arguments.
 * @description A type representing a function that returns a Promise.
 * @type {(...args: T) => Promise<void>}
 */
export type PromiseType<T extends FunctionArgs> = (...args: T) => Promise<void>

/**
 *
 * @template T - The type of the function arguments.
 * @description A type representing a callback function.
 * @type {(...args: T) => void}
 */
export type CallbackType<T extends FunctionArgs> = (...args: T) => void

/**
 * @interface DebounceFilterOptions
 * @description Options for the `useDebounceFn` hook.
 */
export interface DebounceFilterOptions {
  /**
   * @type {number}
   * @description The maximum time in milliseconds to delay before invoking the function.
   */
  maxWait?: number

  /**
   * @description If `true`, the promise returned by `useDebounceFn` will be rejected when the debounced function is cancelled.
   * If `false`, the promise will resolve.
   * @type {boolean}
   * @default false
   */
  rejectOnCancel?: boolean
}

/**
 * @interface UseTimeoutPollOptions
 * @description Options for the `useTimeoutPoll` hook.
 */
export interface UseTimeoutPollOptions {
  /**
   * @type {boolean}
   * @description Indicates whether the polling should start immediately.
   * @default true
   */
  immediate?: boolean
}

/**
 * @interface Pausable
 * @description an object with pause and resume capabilities.
 */
export interface Pausable {
  /**
   * @type {boolean}
   * @description Indicates whether the polling is currently active.
   */
  isActive: boolean

  /**
   * @returns {void}
   * @description Pauses the polling.
   */
  pause: () => void

  /**
   * Resumes the polling.
   * @returns {void}
   */
  resume: () => void
}

/**
 * @interface UseToggleOptions
 * @description Options for the `useToggle` hook.
 * @template Truthy - The type of the "truthy" value.
 * @template Falsy - The type of the "falsy" value.
 */
export interface UseToggleOptions<Truthy, Falsy> {
  /**
   * @type {Truthy}
   * @description The value representing the "truthy" state.
   * @default true
   */
  truthyValue?: Truthy

  /**
   * @type {Falsy}
   * @description The value representing the "falsy" state.
   * @default false
   */
  falsyValue?: Falsy
}

/**
 * @interface UseToNumberOptions
 * @description Options for the `useToNumber` hook.
 * @template T - The type of the value to be converted.
 */
export interface UseToNumberOptions {
  /**
   * @type {'parseFloat' | 'parseInt'}
   * @description Specifies the method to convert the value: 'parseFloat' or 'parseInt'.
   * @default 'parseFloat'
   */
  method?: 'parseFloat' | 'parseInt'

  /**
   * @type {number}
   * @description The radix to use when `method` is 'parseInt'.
   * @default 10
   */
  radix?: number

  /**
   * @type {boolean}
   * @descriptionIf true, returns 0 instead of NaN when the conversion fails.
   * @default false
   */
  nanToZero?: boolean
}

/**
 * @type {Object}
 * @template T - The type of the value to be resolved.
 * @description Representing either a value or a function returning a value.
 */
export type Resolvable<T> = T | (() => T)

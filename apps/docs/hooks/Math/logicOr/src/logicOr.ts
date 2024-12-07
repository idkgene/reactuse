import type { RefObject } from 'react'

/**
 * Reference type that holds a mutable value
 * @template T The type of the referenced value
 */
export type Reference<T> = RefObject<T>

/**
 * Union of a value or its reference type
 * @template T The type of the value
 */
export type Referential<T> = T | Reference<T>

/**
 * Dereferences a value if it is a reference, otherwise returns the value itself
 * @internal
 */
function deref<T>(value: Referential<T>): T {
  return (value && typeof value === 'object' && 'current' in value) 
    ? value.current as T 
    : value as T
}

/**
 * Performs a logical OR operation on multiple values or references
 *
 * @example
 * ```tsx
 * const isValid = useRef(true)
 * const isEnabled = useRef(false)
 * 
 * // Check multiple conditions
 * const result = logicOr(isValid, isEnabled, false) // true
 * 
 * // Works with direct values too
 * const result2 = logicOr(false, 0, '', null) // false
 * ```
 */
export function logicOr(...args: Referential<unknown>[]): boolean {
  return args.some(i => deref(i))
}

// alias
export { logicOr as or }

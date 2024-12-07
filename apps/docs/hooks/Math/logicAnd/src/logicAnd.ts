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
 * Performs a logical AND operation on multiple values or references
 *
 * @example
 * ```tsx
 * const isValid = useRef(true)
 * const isEnabled = useRef(true)
 * 
 * // Check multiple conditions
 * const result = logicAnd(isValid, isEnabled, true) // true
 * 
 * // Works with direct values too
 * const result2 = logicAnd(true, 1, 'hello', []) // true
 * ```
 */
export function logicAnd(...args: Referential<unknown>[]): boolean {
  return args.every(i => deref(i))
}

// alias
export { logicAnd as and }

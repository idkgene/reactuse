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
 * Performs a logical NOT operation on a value or reference
 *
 * @example
 * ```tsx
 * const isValid = useRef(true)
 * 
 * // Negate a ref
 * const result = logicNot(isValid) // false
 * 
 * // Works with direct values too
 * const result2 = logicNot(0) // true
 * ```
 */
export function logicNot(value: Referential<unknown>): boolean {
  return !deref(value)
}

// alias
export { logicNot as not }

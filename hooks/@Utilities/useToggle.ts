import { useCallback, useState } from 'react'

interface UseToggleOptions<Truthy, Falsy> {
  /**
   * The value representing the "truthy" state.
   * @type {Truthy}
   * @default true
   */
  truthyValue?: Truthy

  /**
   * The value representing the "falsy" state
   * @type {Falsy}
   * @default false
   */
  falsyValue?: Falsy
}

/**
 * A custom hook to toggle between two states: a "truthy" value and a "falsy" value.
 *
 * @template Truthy - The type of the "truthy" value.
 * @template Falsy - The type of the "falsy" value.
 * @param {Truthy | Falsy} [initialValue=false as Falsy] - The initial value of the toggle.
 * @param {UseToggleOptions<Truthy, Falsy>} [options={}] - Optional configuration for the toggle.
 * @param {Truthy} [options.truthyValue=true as Truthy] - The value representing the "truthy" state.
 * @param {Falsy} [options.falsyValue=false as Falsy] - The value representing the "falsy" state.
 * @returns {[Truthy | Falsy, (value?: Truthy | Falsy) => void]} An array containing the current state and a toggling function.
 *
 * @example
 * // Usage example:
 * const [isEnabled, toggleEnabled] = useToggle(true, {
 *   truthyValue: 'ON',
 *   falsyValue: 'OFF'
 * });
 *
 * console.log(isEnabled); // 'ON'
 * toggleEnabled();        // Switches to 'OFF'
 * toggleEnabled('ON');    // Explicitly sets to 'ON'
 */
export function useToggle<Truthy = true, Falsy = false>(
  initialValue: Truthy | Falsy = false as Falsy,
  options: UseToggleOptions<Truthy, Falsy> = {}
): [Truthy | Falsy, (value?: Truthy | Falsy) => void] {
  const { truthyValue = true as Truthy, falsyValue = false as Falsy } = options
  const [state, setState] = useState<Truthy | Falsy>(initialValue)

  const toggle = useCallback(
    (value?: Truthy | Falsy) => {
      if (value !== undefined) {
        setState(value)
      } else {
        setState((prevState) =>
          prevState === truthyValue ? falsyValue : truthyValue
        )
      }
    },
    [truthyValue, falsyValue]
  )

  return [state, toggle]
}

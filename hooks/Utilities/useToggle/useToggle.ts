import { useCallback, useState } from 'react'
import { UseToggleOptions } from '../utilities'

/**
 * @name useToggle
 * @description A custom hook to toggle between two states: a "truthy" value and a "falsy" value.
 *
 * @returns {[Truthy | Falsy, (value?: Truthy | Falsy) => void]} An array containing the current state and a toggling function.
 *
 * @example
 * Usage example:
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

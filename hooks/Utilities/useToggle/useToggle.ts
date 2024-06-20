import { useCallback, useState } from 'react'

import { UseToggleOptions } from '../utilities'

/**
 * A hook to toggle between two values, typically representing "true" and "false".
 *
 * @template Truthy - The type of the "truthy" value.
 * @template Falsy - The type of the "falsy" value.
 * @param {Truthy | Falsy} [initialValue=false as Falsy] - The initial value of the toggle.
 * @param {UseToggleOptions<Truthy, Falsy>} [options={}] - Options to customize the truthy and falsy values.
 * @param {Truthy} [options.truthyValue=true as Truthy] - The value representing the "truthy" state.
 * @param {Falsy} [options.falsyValue=false as Falsy] - The value representing the "falsy" state.
 * @returns {[Truthy | Falsy, (value?: Truthy | Falsy) => void]} The current state and a function to toggle the value.
 *
 * @example
 * Basic toggle between true and false
 * const [isActive, toggleActive] = useToggle();
 * 
 * Toggle between specific strings
 * const [status, toggleStatus] = useToggle('on', { truthyValue: 'on', falsyValue: 'off' });
 * 
 * Toggle between numbers
 * const [currentNumber, toggleNumber] = useToggle(1, { truthyValue: 1, falsyValue: 0 });
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

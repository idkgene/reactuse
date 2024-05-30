import { useState, useCallback, SetStateAction, Dispatch } from 'react'

type UseBooleanReturn = [boolean, () => void, Dispatch<SetStateAction<boolean>>]

/**
 * @function useBoolean
 * @description This hook provides a boolean state with a toggle function and a setter function, making it easy
 * to control boolean states like toggles, checkboxes, visibility flags, etc. The hook initializes the
 * boolean state to the provided initial value of defaults to `false`
 *
 * @param {boolean} [initialValue=false] - The initial boolean value.
 * @returns {UseBooleanReturn} A tuple containing:
 * 1. The current boolean value.
 * 2. A function to toggle the boolean value.
 * 3. A dispatch function to manually set the boolean value.
 *
 * @example
 * import { useBoolean } from './useBoolean';
 *
 * const UseBooleanDemo = () => {
 * const [isToggled, toggleIsToggled, setIsToggled] = useBoolean(false)
 *
 * return (
 *  <div>
 *    <p>The toggle is {isToggled ? 'ON' : 'OFF'}.</p>
 *    <button onClick={toggleIsToggled}>Toggle</button>
 *    <button onClick={() => setIsToggled(true)}>Turn ON</button>
 *    <button onClick={() => setIsToggled(false)}>Turn OFF</button>
 * </div>
 *  )
 * }
 */
export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue)
  }, [])

  return [value, toggle, setValue]
}

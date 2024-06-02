import { useCallback, useEffect, useState } from 'react'

/**
 * Represents a number or a getter function that returns a number
 *
 * @typedef {number | (() => number)} NumberOrGetter
 */
type NumberOrGetter = number | (() => number)

/**
 * Calculates the average of the numbers or the values returned by the getter functions in the arguments.
 *
 * @param {...NumberOrGetter[]} args - The numbers or getter functions to calculate the average of.
 * @return {number} The average of the numbers or the values returned by the getter functions.
 *
 * @example
 * const number = [1, 2, 3, 4, 5];
 * const average = useAverage(...numbers);
 * console.log(average); // Output: 3;
 *
 * const getter1 = () => 2;
 * const getter2 = () => 4;
 * const average = useAverage(getter1, getter2);
 * console.log(average); // Output: 3
 */
export const useAverage = (...args: NumberOrGetter[]): number => {
  const [averageValue, setAverageValue] = useState(() => {
    const values = args.map((arg) => (typeof arg === 'function' ? arg() : arg))
    const sum = values.reduce((acc, value) => acc + value, 0)
    return values.length > 0 ? sum / values.length : 0
  })

  const updateValues = useCallback((newValues: number[]) => {
    const sum = newValues.reduce((acc, value) => acc + value, 0)
    setAverageValue(newValues.length > 0 ? sum / newValues.length : 0)
  }, [])

  useEffect(() => {
    const values = args.map((arg) => (typeof arg === 'function' ? arg() : arg))
    updateValues(values)
  }, [args, updateValues])

  return averageValue
}

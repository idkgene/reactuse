import { useEffect, useState } from 'react'

/**
 * Calculates the sum of the numbers in the array
 * 
 * @param {number[]} array - Array of number to summarize.
 * @returns {number} - The sum of the numbers in the array
 * 
 * @example
 * const number = [1, 2, 3, 4, 5]
 * const sum = useSum(number);
 * console.log(sum); // Output: 15
 */
export const useSum = (array: number[]): number => {
  const [sum, setSum] = useState<number>(0)

  useEffect(() => {
    if (!Array.isArray(array)) {
      console.error('useSum: Input must be an array')
      return
    }

    const isNumberArray = array.every((item) => typeof item === 'number')
    if (!isNumberArray) {
      console.error('useSum: Array must contain only numbers')
      return
    }

    const total = array.reduce((acc, curr) => acc + curr, 0)
    setSum(total)
  }, [array])

  return sum
}

import React from 'react'
import { useArrayFilter } from './useArrayFilter'

export default function UseArrayFilterDemo() {
  const numbers = [1, 2, 3, 4, 5]
  const evenNumbers = useArrayFilter(numbers, (num) => num % 2 === 0)

  return (
    <div>
      <p>Original array: {numbers.join(', ')}</p>
      <p>Even numbers: {evenNumbers.join(', ')}</p>
    </div>
  )
}

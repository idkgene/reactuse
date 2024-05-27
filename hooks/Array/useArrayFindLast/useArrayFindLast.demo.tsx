import React from 'react'
import { useArrayFindLast } from './useArrayFindLast'

const UseArrayFistLastDemo = () => {
  const list = [1, 2, 3, 4, 5, 6]
  const lastEvenNumber = useArrayFindLast(list, (num) => num % 2 === 0)

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Last even number: {lastEvenNumber}</p>
    </div>
  )
}

export default UseArrayFistLastDemo

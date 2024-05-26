import React from 'react'
import { useArraySome } from './useArraySome'

const ArraySomeDemo = () => {
  const list = [1, 2, 3, 4, 5]
  const hasEvenNumber = useArraySome(list, (item) => item % 2 === 0)

  return (
    <div>
      <p>List: {list.join(', ')}</p>
      <p>Has even number: {hasEvenNumber ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default ArraySomeDemo

import React from 'react'
import { useArrayReduce } from './useArrayReduce'

const ArrayReduceDemo = () => {
  const list = [1, 2, 3, 4, 5]
  const sum = useArrayReduce(list, (prev, curr) => prev + curr, 0)

  return (
    <div>
      <p>List: {list.join(', ')}</p>
      <p>Sum: {sum}</p>
    </div>
  )
}

export default ArrayReduceDemo

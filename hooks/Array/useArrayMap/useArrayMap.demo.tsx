import React from 'react'
import { useArrayMap } from './useArrayMap'

const ArrayMapDemo = () => {
  const list = [1, 2, 3, 4, 5]
  const mappedList = useArrayMap(list, (item) => item * 2)

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Mapped array: {mappedList.join(', ')}</p>
    </div>
  )
}

export default ArrayMapDemo

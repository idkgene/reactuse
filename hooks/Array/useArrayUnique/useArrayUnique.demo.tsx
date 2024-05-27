import React from 'react'
import { useArrayUnique } from './useArrayUnique'

const ArrayUniqueDemo = () => {
  const list = [1, 2, 3, 2, 4, 1, 3, 5]
  const uniqueList = useArrayUnique(list)

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Unique array: {uniqueList.join(', ')}</p>
    </div>
  )
}

export default ArrayUniqueDemo

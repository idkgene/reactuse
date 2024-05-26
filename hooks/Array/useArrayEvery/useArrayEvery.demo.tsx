import React, { useState } from 'react'
import { useArrayEvery } from './useArrayEvery'

export default function UseArrayEveryDemo() {
  const [list, setList] = useState([0, 2, 4])
  const everyEven = useArrayEvery(list, (item) => item % 2 === 0)

  const handleAddItem = () => {
    const newItem = list.length + 1
    setList([...list, newItem])
  }

  return (
    <div>
      <p>Original array: {list.join(', ')}</p>
      <p>Every item is even: {String(everyEven)}</p>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
}

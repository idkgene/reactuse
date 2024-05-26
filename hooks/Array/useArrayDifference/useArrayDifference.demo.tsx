'use client'
import { useArrayDifference } from './useArrayDifference'
import { useState } from 'react'

const ArrayDifferenceDemo = () => {
  const [list, setList] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' },
  ])

  const [values, setValues] = useState([
    { id: 2, name: 'Jane' },
    { id: 4, name: 'Alice' },
  ])

  const difference = useArrayDifference(
    list,
    values,
    (value, othVal) => value.id === othVal.id
  )

  return (
    <div>
      <h1>Array Difference Demo</h1>
      <h2>List:</h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h2>Values:</h2>
      <ul>
        {values.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h2>Difference:</h2>
      <ul>
        {difference.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() =>
          setList([...list, { id: list.length + 1, name: 'New User' }])
        }
      >
        Add User
      </button>
      <button
        onClick={() =>
          setValues([...values, { id: values.length + 1, name: 'New User' }])
        }
      >
        Add Value
      </button>
    </div>
  )
}

export default ArrayDifferenceDemo

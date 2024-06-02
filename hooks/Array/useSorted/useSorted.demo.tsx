import React from 'react'
import useSorted from './useSorted'

const UseSortedDemo: React.FC = () => {
  const [source, setSource] = React.useState([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])
  const sorted = useSorted(source)

  return (
    <div>
      <h1>Sorted Array:</h1>
      <ul>
        {sorted.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <button
        onClick={() =>
          setSource([...source, Math.floor(Math.random() * 10) + 1])
        }
      >
        Add Random Number
      </button>
    </div>
  )
}

export default UseSortedDemo

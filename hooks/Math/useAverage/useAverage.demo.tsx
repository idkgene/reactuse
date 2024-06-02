import { useState } from 'react'
import { useAverage } from './useAverage'

const UseAverageDemo = () => {
  const [numbers, setNumbers] = useState<number[]>([])
  const average = useAverage(...numbers)

  const handleAddNumber = () => {
    const newNumber = Math.floor(Math.random() * 100)
    setNumbers([...numbers, newNumber])
  }

  return (
    <>
      <div>
        <p>Numbers: {numbers.join(', ')}</p>
        <p>Average: {average}</p>
        <button onClick={handleAddNumber}>Add Random Number</button>
      </div>
    </>
  )
}

export default UseAverageDemo

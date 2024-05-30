import { useRef } from 'react'
import { getValue, getProperty } from './get'

const GetDemo = () => {
  const myRef = useRef<{ name: string; age: number }>({ name: 'Alex', age: 20 })

  const handleClick = () => {
    const value = getValue(myRef)
    const name = getProperty(myRef, 'name')
    console.log('Value:', value)
    console.log('Name:', name)
  }

  return (
    <div>
      <button onClick={handleClick}>Log Value and Name</button>
    </div>
  )
}

export default GetDemo

import React from 'react'
import { useDidMount } from './useDidMount'

const UseDidMountDemo = () => {
  useDidMount(() => {
    console.log('Component mounted!')
  })

  return (
    <div>
      <p>This component will log a message to the console when it mounts.</p>
    </div>
  )
}

export default UseDidMountDemo

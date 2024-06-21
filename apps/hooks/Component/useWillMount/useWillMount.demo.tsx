'use client'
import React from 'react'
import { useWillMount } from './useWillMount'

const UseWillMountDemo = () => {
  const [message, setMessage] = React.useState('')

  useWillMount(() => {
    console.log('Component mounted!')
    setMessage('This message is set when the component mounts.')
  })

  return (
    <div>
      <p>{message}</p>
      <p>
        There&aposs a messages in the console indicating the component mounted
      </p>
    </div>
  )
}

export default UseWillMountDemo

"use client"
import { useIsClient } from '../../../hooks/useIsClient'

const TestPage = () => {
  const isClient = useIsClient()

  console.log("Window object:", isClient)
  
  return (
    <div>{isClient ? 'Window object is present' : 'Window object is not present'}</div>
    )
}

export default TestPage
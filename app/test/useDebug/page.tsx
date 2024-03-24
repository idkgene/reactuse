"use client"
import { useDebug } from '../../../hooks/useDebug'

const TestPage = () => {
  const isDebug = useDebug()
  return (
    <div>
      {isDebug ? <p>Debug mode is on</p> : <p>Debug mode is off</p>}
    </div>
  )
}

export default TestPage
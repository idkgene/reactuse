"use client"
import { useEffect, useState } from "react";
import { useDocumentReadyState } from "../../../hooks/useDocumentReadyState";
useDocumentReadyState

export default function TestPage() {
  const [state, setState] = useState<string>('')
  const readyState = useDocumentReadyState()

  useEffect(() => {
    setState(readyState)
  }, [readyState])

  if (state === 'loading') {
    return <div>Loading ...</div>
  }

  return (
    <>
    <div>
      <h1>Document Ready State</h1>
      <p>ready State: {state}</p>
    </div>
    </>
  )
}
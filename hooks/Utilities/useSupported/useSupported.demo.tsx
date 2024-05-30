import React from 'react'
import { useSupported } from './useSupported'

const UseSupportedDemo: React.FC = () => {
  const isClipboardSupported = useSupported(() => !!navigator.clipboard)

  return (
    <div>
      <h1>Clipboard API Support</h1>
      {isClipboardSupported ? (
        <p>Clipboard API is supported!</p>
      ) : (
        <p>Clipboard API is not supported.</p>
      )}
    </div>
  )
}

export default UseSupportedDemo

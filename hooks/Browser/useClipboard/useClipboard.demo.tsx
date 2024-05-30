'use client'
import React, { useState } from 'react'
import { useCopyToClipboard } from './useClipboard'

const UseCopyToClipboardDemo: React.FC = () => {
  const [text, setText] = useState('')
  const { copiedValue, copy, cut, paste } = useCopyToClipboard()

  const handleCopy = async () => {
    const isCopied = await copy(text)
    console.log(isCopied ? 'Copied successfully!' : 'Copy failed')
  }

  const handleCut = async () => {
    const isCut = await cut(text)
    console.log(isCut ? 'Cut successfully!' : 'Cut failed')
  }

  const handlePaste = async () => {
    const pastedText = await paste()
    console.log(pastedText ? `Pasted: ${pastedText}` : 'Paste failed')
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Copied Value: {copiedValue}</p>
      <button onClick={handleCopy}>Copy</button>
      <button onClick={handleCut}>Cut</button>
      <button onClick={handlePaste}>Paste</button>
    </div>
  )
}

export default UseCopyToClipboardDemo

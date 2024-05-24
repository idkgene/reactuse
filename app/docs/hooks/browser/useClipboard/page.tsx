'use client'
import HookInfo from '@/components/Common/HookInfo'
import React, { useState } from 'react'
import { useCopyToClipboard } from '@/hooks/@Browser/useClipboard'
import { Code } from '@/components/Common/Markdown/Code'

const Page = () => {
  const { copiedValue, copy } = useCopyToClipboard()
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <h1>useClipboard</h1>
      <HookInfo category="Browser" exportSize={0} lastChanged="Somewhen" />
      <div>
        Reactive Clipboard API. Provides the ability to respond to clipboard
        commands (cut, copy, and paste) as well as to asynchronously read from
        and write to the system clipboard. Access to the contents of the
        clipboard is gated behind the Permissions API. Without user permission,
        reading or altering the clipboard contents is not permitted.
      </div>
      <h2>Demo</h2>
      <div>
        <span>Clipboard Permission: read prompt | write granted</span>
        <div>
          Current copied{' '}
          <code className="text-[#729772] rounded-[4px] py-[3px] px-1.5 transition-colors bg-[#f6f6f7]">
            {copiedValue}
          </code>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event?.target.value)}
        />
        <button onClick={() => copy(inputValue)}>Copy some stuff</button>
      </div>
      <h2>Usage</h2>
    </>
  )
}

export default Page

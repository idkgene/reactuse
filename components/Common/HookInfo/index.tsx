import React from 'react'

interface InfoProps {
  category: string
  exportSize: number
  lastChanged: string
}

const HookInfo = ({ category, exportSize, lastChanged }: InfoProps) => {
  return (
    <div className="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
      <div> Category </div>
      <div>
        <a href="/functions#category={category}">{category}</a>
      </div>
      <div> Export Size </div>
      <div>{exportSize} B</div>
      <div> Last Changed </div>
      <div>{lastChanged}</div>
    </div>
  )
}

export default HookInfo

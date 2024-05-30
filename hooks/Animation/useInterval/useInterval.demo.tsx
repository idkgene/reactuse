'use client'
import React from 'react'
import { useInterval } from './useInterval'

const UseIntervalDemo: React.FC = () => {
  const { counter } = useInterval(250, { immediate: true })

  return (
    <div className="mb-[10px] rounded-[8px] transition-colors bg-black p-8">
      <p className="text-[12px] font-medium leading-[28px] margin-[0.5rem]  text-[rgba(235,235,245,.6)]">
        Interal Fired: {counter}
      </p>
    </div>
  )
}

export default UseIntervalDemo

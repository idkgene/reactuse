import React from 'react'

export default function KeyboardKey({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <kbd className="items-center bg-transparent rounded-[2px] flex h-[18px] justify-center mr-[.4em] pb-px shadow-none border-none w-5 text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)]">
        {children}
      </kbd>
    </>
  )
}

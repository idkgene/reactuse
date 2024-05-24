import React from 'react'

interface MdBlockquoteProps {
  children: React.ReactNode
}

export const MdBlockquote: React.FC<MdBlockquoteProps> = ({ children }) => {
  return (
    <>
      <blockquote className="m-0 mt-4 border-l-2 border-solid border-[#e2e2e3] dark:border-[#2e2e32] pl-4 transition-colors">
        <p className="m-0 text-[16px] text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)] transition-colors leading-[28px] break-words">
          {children}
        </p>
      </blockquote>
    </>
  )
}

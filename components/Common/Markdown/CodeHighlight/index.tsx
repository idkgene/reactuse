import React from 'react'

interface MdCodeHighlightProps {
  children: React.ReactNode
}

export const MdCodeHighlight: React.FC<MdCodeHighlightProps> = ({
  children,
}) => {
  return (
    <>
      <code className="text-[.875em] text-[#729772] rounded-[4px] py-[3px] px-1.5 bg-[rgba(101,117,133,.16)] transition-colors">
        {children}
      </code>
    </>
  )
}

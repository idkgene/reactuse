import React from 'react'

interface BenefitsProps {
  children: React.ReactNode
}

const Benefits = React.forwardRef<HTMLDivElement, BenefitsProps>(
  (props, ref) => {
    return <div className="flex flex-wrap -m-2" ref={ref} {...props}></div>
  }
)

Benefits.displayName = 'Benefits'

export { Benefits }

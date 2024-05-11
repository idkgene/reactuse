import React from 'react'
import styles from './index.module.css'

interface BenefitsProps {
  icon: React.ReactNode
  heading: string
  paragraph: string
}

const BenefitsItem = React.forwardRef<HTMLDivElement, BenefitsProps>(
  ({ icon, heading, paragraph }, ref) => {
    return (
      <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]" ref={ref}>
        <div
          id="noicon feature"
          className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
        >
          <article id="box" className="flex flex-col p-6 h-full">
            <div
              id="icon"
              className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
            >
              {icon}
            </div>
            <h2 id="title" className="leading-[24px] text-[16px] font-semibold">
              {heading}
            </h2>
            <p
              id="details"
              className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
            >
              {paragraph}
            </p>
          </article>
        </div>
      </div>
    )
  }
)

BenefitsItem.displayName = 'BenefitsItem'

export { BenefitsItem }

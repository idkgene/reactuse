import React from 'react'

interface BenefitsProps {
  icon: React.ReactNode
  heading: string
  paragraph: string
}

const BenefitsItem = React.forwardRef<HTMLDivElement, BenefitsProps>(
  ({ icon, heading, paragraph }, ref) => {
    return (
      <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/3)]" ref={ref}>
        <div className="transition-colors h-full rounded-[12px] block border border-solid border-card bg-card">
          <article className="flex flex-col p-6 h-full">
            <div className="flex justify-center items-center mb-5 bg-[rgba(142,150,170,.14)] dark:bg-[rgba(101,117,133,.16)] rounded-md select-none size-12 text-2xl transition-colors">
              {icon}
            </div>
            <h2 className="text-base font-semibold select-none text-[#3c3c43] dark:text-[#ffffff]">
              {heading}
            </h2>
            <p className="grow pt-2 text-sm leading-[24px] select-none font-medium text-[#3c3c43c7] dark:text-[rgba(235,235,245,.6)]">
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

import * as React from 'react'

interface SidebarGroupProps {
  title: string
  children: React.ReactNode
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  children,
}) => {
  return (
    <div className="border-t border-solid border-[#e2e2e3] dark:border-[#2e2e32] pt-[10px] lg:pt-[10px] lg:w-[calc(272px-64px)]">
      <section className="pb-6">
        <div
          role="button"
          tabIndex={0}
          className="touch-manipulation relative flex w-full"
        >
          <div className="absolute top-1.5 bottom-1.5 -left-[17px] w-0.5 rounded-[2px] transition-colors"></div>
          <h2 className="grow py-1 leading-[24px] text-[14px] transition-colors font-bold text-[#3c3c43] dark:text-[#fffff5db]">
            {title}
          </h2>
        </div>
        <div>
          <div>{children}</div>
        </div>
      </section>
    </div>
  )
}

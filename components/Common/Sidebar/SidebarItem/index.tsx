import Link from 'next/link'
import * as React from 'react'

interface SidebarItemProps {
  href: string
  text: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ href, text }) => {
  return (
    <div>
      <div id="item" className="touch-manipulation relative flex w-full">
        <div
          id="indicator"
          className="absolute top-1.5 bottom-1.5 -left-[17px] w-0.5 rounded-[2px] transition-colors"
        ></div>
        <Link
          href={href}
          id="link"
          className="flex items-center grow py-1 px-0 leading-[24p] text-[14px] transition-colors font-medium text-[#3c3c43c7] dark:text-[#ebebf599] hover:text-[#6473ca] dark:hover:text-[#fff]"
        >
          {text}
        </Link>
      </div>
    </div>
  )
}

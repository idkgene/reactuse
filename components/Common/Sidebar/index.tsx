import { SidebarGroup } from './SidebarGroup'
import { SidebarItem } from './SidebarItem'
import * as React from 'react'

interface SidebarItemProps {
  text: string
  href: string
}

interface SidebarGroupProps {
  title: string
  items: SidebarItemProps[]
}

interface SidebarProps {
  groups: SidebarGroupProps[]
}

export const Sidebar: React.FC<SidebarProps> = ({ groups }) => {
  return (
    <aside className="fixed top-0 bottom-0 left-0 z-[25] pt-8 px-8 pb-24 w-[calc(100vw-64px)] max-w-[320px] bg-[#f6f6f7] dark:bg-[#161618] opacity-0 overflow-x-hidden overflow-y-auto translate-x-[-100%] transition-opacity overscroll-contain lg:pt-16 lg:w-[272px] lg:max-w-full lg:opacity-100 lg:shadow-none lg:translate-x-0 lg:visible 2xl:pl-[max(32px,calc((100%-(1440px-64px))/2))] 2xl:w-[calc((100%-(1440px-64px))/2+272px-32px)] shadow-[0px_1px_2px_rgba(0,0,0,.04),_0px_1px_2px_rgba(0,0,0,.06)]">
      <div
        id="curtain"
        className="lg:sticky lg:-top-16 lg:left-0 lg:z-[1] lg:mt-[calc(64px*-1)] lg:-mx-8 lg:h-16 bg-[#f6f6f7] dark:bg-[#161618]"
      ></div>
      <nav
        id="vpsiderbanav"
        aria-labelledby="sidebar-aria-label"
        className="outline-none"
        tabIndex={-1}
      >
        <span className="sr-only" id="sidebar-aria-label">
          Sidebar Navigation
        </span>

        {groups.map((group) => (
          <SidebarGroup key={group.title} title={group.title}>
            {group.items.map((item) => (
              <SidebarItem key={item.href} href={item.href} text={item.text} />
            ))}
          </SidebarGroup>
        ))}
      </nav>
    </aside>
  )
}

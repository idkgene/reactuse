'use client'
import { useEffect, useState } from 'react'
import * as React from 'react'

interface Heading {
  text: string
  level: number
  id: string
}

interface TableOfContentsProps {
  contentId: string
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentId,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const contentElement = document.getElementById(contentId)
      if (contentElement) {
        const headers = Array.from(
          contentElement.querySelectorAll<HTMLHeadingElement>(
            'h2, h3, h4, h5, h6'
          )
        )
        const headingData: Heading[] = headers
          .map((header) => ({
            text: header.textContent ?? '',
            level: parseInt(header.tagName.slice(1)),
            id: header.id,
          }))
          .filter((heading) => heading.text.trim() !== '')
        setHeadings(headingData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [contentId])

  return (
    <div className="table-of-contents relative hidden order-2 grow pl-8 w-full max-w-[256px] xl:block">
      <div id="curtain" className="fixed top-0 pt-[128px]"></div>
      <div
        id="aside-container"
        className="fixed top-0 pt-[128px] w-[224px] h-full overflow-x-hidden overflow-y-hidden"
      >
        <div
          id="aside-content"
          className="flex flex-col pb-8 min-h-[calc(100vh-(64px+var(--vp-layout-top-height,0px)+48px))]"
        >
          <div
            id="asideOutline has-outline"
            role="navigation"
            className="flex flex-col grow"
          >
            <div id="content" className="relative pl-4 text-[13px] font-medium">
              <h2 className="text-[14px] font-semibold leading-[32px]">
                On this page
              </h2>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                headings.map((heading) => (
                  <li key={heading.id} className="list-none">
                    <a
                      href={`#${heading.id}`}
                      className="leading-[32px] text-[14px] transition-colors text-ellipsis overflow-hidden whitespace-nowrap text-[rgba(60,60,67,.78)] dark:text-[rgba(235,235,245,.6)] hover:text-[rgba(60,60,67)] dark:hover:text-white"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))
              )}
            </div>
          </div>
          <div id="spacer" className="grow"></div>
        </div>
      </div>
    </div>
  )
}

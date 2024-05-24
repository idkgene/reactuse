import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  previous?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
  children?: React.ReactNode
}

export function Pagination({ previous, next, children }: PaginationProps) {
  return (
    <nav className="flex justify-between mt-16 wrap items-start w-full relative">
      {previous ? (
        <a
          href={previous.href}
          aria-label={`Go to previous page: ${previous.title}`}
          className="no-underline p-1 rounded-[6px] pr-2 pl-[28px]"
        >
          <span className="m-0 text-[hsla(0,0%,63%,1)] text-[0.8125rem] leading-[1.125rem] mb-0.5">
            Previous
          </span>
          <div className="relative flex">
            <span
              className="text-[hsla(0,0%,93%,1)] text-base font-medium max-w-[20em] inline-block text-ellipsis break-words whitespace-nowrap overflow-hidden
            "
            >
              {previous.title}
            </span>
            <span className="transitionc-olors max-w-[20em] overflow-hidden absolute -left-[26px] mt-0.5 text-[hsla(0,0%,63%,1)]">
              <ChevronLeft className="w-4 h-4 mr-1" />
            </span>
          </div>
        </a>
      ) : (
        <div />
      )}
      <div>{children}</div>
      {next ? (
        <a
          href={next.href}
          aria-label={`Go to next page: ${next.title}`}
          className="no-underline p-1 rounded-[6px] pl-2 pr-[28px] ml-auto"
        >
          <span className="m-0 text-[hsla(0,0%,63%,1)] text-[0.8125rem] leading-[1.125rem] mb-0.5">
            Next
          </span>
          <div className="relative flex">
            <span className="text-[hsla(0,0%,93%,1)] text-base font-medium max-w-[20em] inline-block text-ellipsis break-words whitespace-nowrap overflow-hidden">
              {next.title}
            </span>
            <span className="text-[hsla(0,0%,63%,1)] transition-colors max-w-[20em] -right-[26px] absolute mt-0.5">
              <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </a>
      ) : (
        <div />
      )}
    </nav>
  )
}

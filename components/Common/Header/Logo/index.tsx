'use client'
import * as React from 'react'
import Image from 'next/image'
import ReactLogo from '../../../../public/react-icon.svg'
import Link from 'next/link'

export function ReactUseLogo({
  className,
  cntClassName,
}: {
  className?: string
  cntClassName?: string
}) {
  return (
    <>
      <div
        className={`shrink-0 transition-colors h-[calc(64px-1px)] ${cntClassName}`}
      >
        <div>
          <Link
            href="/"
            className="flex items-center border-b border-solid w-full h-16 text-base border-transparent font-semibold transition-opacity text-[hsl(240,6%,25%)] dark:text-[hsla(60,100%,98%,1)]"
          >
            <Image
              src={ReactLogo}
              alt="React Logo"
              height={32}
              width={32}
              className={`mr-2 h-6 ${className}`}
            />

            <span className="text-[hsl(240,6%,25%)] dark:text-[rgba(255,255,245,0.86)]">
              ReactUse
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

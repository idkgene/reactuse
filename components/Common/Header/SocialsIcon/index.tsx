import React from 'react'
import Link from 'next/link'

interface SocialsIconProps {
  href: string
  label: string
  icon: React.ReactNode
}

export const SocialsIcon: React.FC<SocialsIconProps> = ({
  href,
  label,
  icon,
}) => {
  return (
    <>
      <Link
        href={href}
        className="flex items-center justify-center size-9 transition-colors text-[rgba(60,60,67,0.78)] dark:text-[hsla(240,33%,94%,1)]"
        aria-label={label}
      >
        <span className="size-5 fill-current hover:text-[rgba(60,60,67)] dark:hover:text-[rgba(255,255,245,.86)]">
          {icon}
        </span>
      </Link>
    </>
  )
}

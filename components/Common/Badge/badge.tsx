import React, { FC, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

interface BadgeProps extends VariantProps<typeof badgeStyles> {
  /**
   * An optional icon to display in the badge.
   */
  icon?: ReactNode
  /*
   * The content of the badge.
   */
  children: ReactNode
}

const badgeStyles = cva('inline-flex items-center rounded-full font-medium', {
  variants: {
    variant: {
      inverted:
        'bg-[hsla(0,0%,9%,1)] text-[hsla(0,0%,95%,1)] dark:bg-[hsla(0,0%,95%,1)] dark:text-[hsla(0,0%,10%,1)]',
      gray: 'bg-[hsla(0,0%,56%,1)] text-white',
      'gray-subtle':
        'bg-[hsla(0,0%,92%,1)] text-[hsla(0,0%,9%,1)] dark:bg-[#1f1f1f] dark:text-[#ededed]',
      blue: 'bg-[#0072f5] text-white',
      'blue-subtle':
        'bg-[#ebf5ff] text-[#0068d6] dark:text-[#10233D] dark:bg-[#52a8ff]',
      purple: 'bg-[#8e4ef6] text-white',
      'purple-subtle':
        'bg-[#f9f1f3] text-[#7820bc] dark:bg-[#2e1938] dark:text-[#BF7AF0]',
      amber: 'bg-[#ffb224] text-white',
      'amber-subtle':
        'bg-[#fff4d6] text-[#a35200] dark:text-[#FF990A] dark:bg-[#331B00]',
      red: 'bg-[#e5484d] text-white',
      'red-subtle':
        'bg-[#ffebeb] text-[#cb2a2f] dark:text-[#ff6166] dark:bg-[#3c1618]',
      pink: 'bg-[#ea3e83] text-white',
      'pink-subtle':
        'bg-[#fce3ec] text-[#bd2864] dark:bg-[#4f1c31] dark:text-[#f75f8f]',
      green: 'bg-[#45a557] text-white',
      'green-subtle':
        'bg-[#ebfaeb] text-[#297a3a] dark:bg-[#0f2e18] dark:text-[#62c073]',
      teal: 'bg-[#12a594] text-white',
      'teal-subtle':
        'bg-[#d4f7f0] text-[#067a6e] dark:bg-[#083a33] dark:text-[#0ac7b4]',
      trial: 'bg-red-500 text-white',
      turborepo: 'bg-black text-white',
    },
    size: {
      sm: 'text-[11px] px-2',
      md: 'text-[12px] px-2.5',
      lg: 'text-[14px] px-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const Badge: FC<BadgeProps> = ({ variant, size, icon, children }) => {
  return (
    <span className={badgeStyles({ variant, size })}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge

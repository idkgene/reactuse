import clsx from 'clsx'
import React from 'react'

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  children?: React.ReactNode
}

const Heading: React.FC<HeadingProps> = ({ level, className, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const defaultClasses: Record<number, string> = {
    1: 'text-5xl font-bold',
    2: 'text-4xl font-bold',
    3: 'text-3xl font-bold',
    4: 'text-2xl font-bold',
    5: 'text-xl font-bold',
    6: 'text-lg font-bold',
  }

  return (
    <Tag className={clsx(defaultClasses[level], className)}>{children}</Tag>
  )
}

export default Heading

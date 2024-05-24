import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface StackProps {
  children: React.ReactNode
  direction?: {
    sm?: 'row' | 'column'
    md?: 'row' | 'column'
    lg?: 'row' | 'column'
    xl?: 'row' | 'column'
  }
  gap?: {
    sm?:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 8
      | 10
      | 12
      | 16
      | 20
      | 24
      | 32
      | 40
      | 48
      | 56
      | 64
    md?:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 8
      | 10
      | 12
      | 16
      | 20
      | 24
      | 32
      | 40
      | 48
      | 56
      | 64
    lg?:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 8
      | 10
      | 12
      | 16
      | 20
      | 24
      | 32
      | 40
      | 48
      | 56
      | 64
    xl?:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 8
      | 10
      | 12
      | 16
      | 20
      | 24
      | 32
      | 40
      | 48
      | 56
      | 64
  }
  className?: string
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, direction = {}, gap = {}, className }, ref) => {
    const directionClasses = clsx({
      'flex-col sm:flex-row': direction.sm === 'row',
      'flex-col md:flex-row': direction.md === 'row',
      'flex-col lg:flex-row': direction.lg === 'row',
      'flex-col xl:flex-row': direction.xl === 'row',
      'flex-row sm:flex-col': direction.sm === 'column',
      'flex-row md:flex-col': direction.md === 'column',
      'flex-row lg:flex-col': direction.lg === 'column',
      'flex-row xl:flex-col': direction.xl === 'column',
    })

    const gapClasses = clsx({
      'gap-0': gap.sm === 0 && gap.md === 0 && gap.lg === 0 && gap.xl === 0,
      'gap-1': gap.sm === 1 && gap.md === 1 && gap.lg === 1 && gap.xl === 1,
      'gap-2': gap.sm === 2 && gap.md === 2 && gap.lg === 2 && gap.xl === 2,
      'gap-3': gap.sm === 3 && gap.md === 3 && gap.lg === 3 && gap.xl === 3,
      'gap-4': gap.sm === 4 && gap.md === 4 && gap.lg === 4 && gap.xl === 4,
      'gap-5': gap.sm === 5 && gap.md === 5 && gap.lg === 5 && gap.xl === 5,
      'gap-6': gap.sm === 6 && gap.md === 6 && gap.lg === 6 && gap.xl === 6,
      'gap-8': gap.sm === 8 && gap.md === 8 && gap.lg === 8 && gap.xl === 8,
      'gap-10':
        gap.sm === 10 && gap.md === 10 && gap.lg === 10 && gap.xl === 10,
      'gap-12':
        gap.sm === 12 && gap.md === 12 && gap.lg === 12 && gap.xl === 12,
      'gap-16':
        gap.sm === 16 && gap.md === 16 && gap.lg === 16 && gap.xl === 16,
      'gap-20':
        gap.sm === 20 && gap.md === 20 && gap.lg === 20 && gap.xl === 20,
      'gap-24':
        gap.sm === 24 && gap.md === 24 && gap.lg === 24 && gap.xl === 24,
      'gap-32':
        gap.sm === 32 && gap.md === 32 && gap.lg === 32 && gap.xl === 32,
      'gap-40':
        gap.sm === 40 && gap.md === 40 && gap.lg === 40 && gap.xl === 40,
      'gap-48':
        gap.sm === 48 && gap.md === 48 && gap.lg === 48 && gap.xl === 48,
      'gap-56':
        gap.sm === 56 && gap.md === 56 && gap.lg === 56 && gap.xl === 56,
      'gap-64':
        gap.sm === 64 && gap.md === 64 && gap.lg === 64 && gap.xl === 64,
    })

    return (
      <div
        ref={ref}
        className={clsx('flex', directionClasses, gapClasses, className)}
      >
        {children}
      </div>
    )
  }
)

Stack.displayName = 'Stack'

export default Stack

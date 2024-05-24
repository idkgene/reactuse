import React, { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

interface SkeletonProps {
  width?: number | string
  height?: number | string
  boxHeight?: number | string
  pill?: boolean
  rounded?: boolean
  squared?: boolean
  animated?: boolean
  show?: boolean
  className?: string
  children?: ReactNode
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      boxHeight,
      pill,
      rounded,
      squared,
      animated = true,
      show = true,
      className,
      children,
    },
    ref
  ) => {
    const skeletonClasses = clsx(
      'skeleton',
      {
        'skeleton-pill rounded-ful': pill,
        'skeleton-rounded rounded': rounded,
        'skeleton-squared': squared,
        'animation-pulse': animated,
        'skeleton-show': show,
      },
      className
    )

    const skeletonStyles: React.CSSProperties = {
      width: width ?? '100%',
      height: height ?? 'auto',
      minHeight: boxHeight,
    }

    return (
      <div ref={ref} className={skeletonClasses} style={skeletonStyles}>
        {show ? null : children}
      </div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

export default Skeleton

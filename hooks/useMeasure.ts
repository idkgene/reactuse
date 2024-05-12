import React, { useState, useEffect, useRef } from 'react'

interface Dimensions {
  height: number
  width: number
}

type UseMeasureReturn = Dimensions & {
  ref: React.RefObject<HTMLElement | null>
}

export const useMeasure = (): UseMeasureReturn => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  })
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        setDimensions({
          height: ref.current.offsetHeight,
          width: ref.current.offsetWidth,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return {
    ...dimensions,
    ref,
  }
}

type UseSizeReturn = {
  size: Dimensions
  ref: React.RefObject<HTMLElement | null>
}

export const useSize = (): UseSizeReturn => {
  const [size, setSize] = useState<Dimensions>({
    height: 0,
    width: 0,
  })
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setSize({
          height: ref.current.offsetHeight,
          width: ref.current.offsetWidth,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return {
    size,
    ref,
  }
}

import { useState, useEffect } from 'react'

type Domain = [number, number]

export const useProjection = (
  value: number,
  domainFrom: Domain,
  domainTo: Domain
): number | null => {
  const [projectedValue, setProjectedValue] = useState<number | null>(null)

  useEffect(() => {
    if (
      typeof value !== 'number' ||
      !Array.isArray(domainFrom) ||
      !Array.isArray(domainTo)
    ) {
      console.error(
        'useProjection: Invalid input types. Expected number and two arrays of numbers.'
      )
      return
    }

    const [fromMin, fromMax] = domainFrom
    const [toMin, toMax] = domainTo

    if (
      typeof fromMin !== 'number' ||
      typeof fromMax !== 'number' ||
      typeof toMin !== 'number' ||
      typeof toMax !== 'number'
    ) {
      console.error('useProjection: Domain values must be numbers.')
      return
    }

    const scale = (value - fromMin) / (fromMax - fromMin)
    const projected = scale * (toMax - toMin) + toMin
    setProjectedValue(projected)
  }, [value, domainFrom, domainTo])

  return projectedValue
}

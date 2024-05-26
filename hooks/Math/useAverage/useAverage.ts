import { useCallback, useEffect, useState } from 'react'

type NumberOrGetter = number | (() => number)

export const useAverage = (...args: NumberOrGetter[]): number => {
  const [averageValue, setAverageValue] = useState(() => {
    const values = args.map((arg) => (typeof arg === 'function' ? arg() : arg))
    const sum = values.reduce((acc, value) => acc + value, 0)
    return values.length > 0 ? sum / values.length : 0
  })

  const updateValues = useCallback((newValues: number[]) => {
    const sum = newValues.reduce((acc, value) => acc + value, 0)
    setAverageValue(newValues.length > 0 ? sum / newValues.length : 0)
  }, [])

  useEffect(() => {
    const values = args.map((arg) => (typeof arg === 'function' ? arg() : arg))
    updateValues(values)
  }, [args, updateValues])

  return averageValue
}

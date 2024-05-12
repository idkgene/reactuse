import { useState, useCallback } from 'react'

type TruncateNumberFn = (number: number) => void

export function useTrunc(): [number, TruncateNumberFn] {
  const [result, setResult] = useState<number>(0)

  const truncateNumber: TruncateNumberFn = useCallback((number: number) => {
    if (typeof number !== 'number') {
      console.error(
        "useTrunc: Input must be a number otherwise it'll return NaN"
      )
      return
    }
    setResult(Math.trunc(number))
  }, [])

  return [result, truncateNumber]
}

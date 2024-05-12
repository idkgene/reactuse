import { useState, useCallback } from 'react'

type RoundNumberFn = (number: number) => void

export function useRound(): [number, RoundNumberFn] {
  const [result, setResult] = useState<number>(0)

  const roundNumber: RoundNumberFn = useCallback((number: number) => {
    if (typeof number !== 'number') {
      console.error(
        "useRound: Input must be a number otherwise it'll return NaN"
      )
      return
    }
    setResult(Math.round(number))
  }, [])

  return [result, roundNumber]
}

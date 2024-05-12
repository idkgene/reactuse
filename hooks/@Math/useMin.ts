import { useCallback, useEffect, useState } from 'react'

type UpdateMinFn = (newNumbers: number[]) => void

export const useMin = (numbers: number[]): [number, UpdateMinFn] => {
  const [min, setMin] = useState<number>(() => Math.min(...numbers))

  const updateMin: UpdateMinFn = useCallback((newNumbers: number[]) => {
    setMin(Math.min(...newNumbers))
  }, [])

  useEffect(() => {
    updateMin(numbers)
  }, [numbers, updateMin])

  return [min, updateMin]
}

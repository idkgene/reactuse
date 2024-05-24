import { useEffect, useRef, useState } from 'react'

type UpdateMinFn = (newNumbers: number[]) => void

export const useMin = (numbers: number[]): [number, UpdateMinFn] => {
  const [min, setMin] = useState<number>(() => Math.min(...numbers))
  const updateMinRef = useRef<UpdateMinFn>(() => {})

  useEffect(() => {
    const updateMin: UpdateMinFn = (newNumbers: number[]) => {
      setMin(Math.min(...newNumbers))
    }

    updateMin(numbers)
    updateMinRef.current = updateMin
  }, [numbers])

  return [min, updateMinRef.current]
}

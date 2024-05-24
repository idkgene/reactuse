import { useMemo } from 'react'

interface UseToNumberOptions {
  method?: 'parseFloat' | 'parseInt'
  radix?: number
  nanToZero?: boolean
}

export function useToNumber(
  value: string | number,
  options: UseToNumberOptions = {}
): number {
  const { method = 'parseFloat', radix = 10, nanToZero = false } = options

  const number = useMemo(() => {
    let parsed: number

    if (typeof value === 'number') {
      parsed = value
    } else if (typeof value === 'string') {
      parsed =
        method === 'parseFloat' ? parseFloat(value) : parseInt(value, radix)
    } else {
      parsed = NaN
    }

    return nanToZero && isNaN(parsed) ? 0 : parsed
  }, [value, method, radix, nanToZero])

  return number
}

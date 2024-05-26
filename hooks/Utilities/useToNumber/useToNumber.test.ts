import { renderHook } from '@testing-library/react'
import { useToNumber } from './useToNumber'

interface HookProps {
  value: string | number
  method?: 'parseFloat' | 'parseInt'
  radix?: number
  nanToZero?: boolean
}

describe('useToNumber', () => {
  it('should return the correct number using parseFloat by default', () => {
    const { result } = renderHook(() => useToNumber('3.14159'))
    expect(result.current).toBe(3.14159)
  })

  it('should return the correct integer using parseInt with default radix', () => {
    const { result } = renderHook(() =>
      useToNumber('42', { method: 'parseInt' })
    )
    expect(result.current).toBe(42)
  })

  it('should return the correct integer using parseInt with specific radix', () => {
    const { result } = renderHook(() =>
      useToNumber('1010', { method: 'parseInt', radix: 2 })
    )
    expect(result.current).toBe(10)
  })

  it('should return 0 if conversion fails and nanToZero is true', () => {
    const { result } = renderHook(() =>
      useToNumber('invalid', { nanToZero: true })
    )
    expect(result.current).toBe(0)
  })

  it('should return NaN if conversion fails and nanToZero is false', () => {
    const { result } = renderHook(() => useToNumber('invalid'))
    expect(isNaN(result.current)).toBe(true)
  })

  it('should return the input number if the value is already a number', () => {
    const { result } = renderHook(() => useToNumber(123.456))
    expect(result.current).toBe(123.456)
  })

  it('should return NaN if value is not a string or number', () => {
    const { result } = renderHook(() => useToNumber({} as any))
    expect(isNaN(result.current)).toBe(true)
  })

  it('should re-calculate the number when the value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }: HookProps) => useToNumber(value),
      {
        initialProps: { value: '42' },
      }
    )

    expect(result.current).toBe(42)

    rerender({ value: '84' })
    expect(result.current).toBe(84)
  })

  it('should re-calculate the number when the radix changes', () => {
    const { result, rerender } = renderHook(
      ({ value, radix }: HookProps) =>
        useToNumber(value, { method: 'parseInt', radix }),
      {
        initialProps: { value: '1010', radix: 2 },
      }
    )

    expect(result.current).toBe(10)

    rerender({ value: '1010', radix: 10 })
    expect(result.current).toBe(1010)
  })

  it('should re-calculate the number when the method changes', () => {
    const { result, rerender } = renderHook(
      ({ value, method }: HookProps) => useToNumber(value, { method }),
      {
        initialProps: { value: '42', method: 'parseInt' },
      }
    )

    expect(result.current).toBe(42)

    rerender({ value: '42.42', method: 'parseFloat' })
    expect(result.current).toBe(42.42)
  })

  it('should re-calculate the number when nanToZero changes', () => {
    const { result, rerender } = renderHook(
      ({ value, nanToZero }: HookProps) => useToNumber(value, { nanToZero }),
      {
        initialProps: { value: 'invalid', nanToZero: false },
      }
    )

    expect(isNaN(result.current)).toBe(true)

    rerender({ value: 'invalid', nanToZero: true })
    expect(result.current).toBe(0)
  })
})
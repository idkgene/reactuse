// src/__tests__/usePrevious.test.ts
import { renderHook, act } from '@testing-library/react'
import { usePrevious } from '@hooks/@Utilities/usePrevious'

describe('usePrevious', () => {
  it('should return undefined initially', () => {
    const { result } = renderHook(() => usePrevious('Hello'))
    expect(result.current).toBeUndefined()
  })

  it('should return initial value if provided', () => {
    const { result } = renderHook(() => usePrevious('Hello', 'Initial'))
    expect(result.current).toBe('Initial')
  })

  it('should return the previous value after update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'Hello' },
    })

    expect(result.current).toBeUndefined()

    rerender({ value: 'World' })
    expect(result.current).toBe('Hello')

    rerender({ value: 'Universe' })
    expect(result.current).toBe('World')
  })

  it('should return previous value with initial value provided', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value, 'Initial'),
      {
        initialProps: { value: 'Hello' },
      }
    )

    expect(result.current).toBe('Initial')

    rerender({ value: 'World' })
    expect(result.current).toBe('Hello')

    rerender({ value: 'Universe' })
    expect(result.current).toBe('World')
  })
})

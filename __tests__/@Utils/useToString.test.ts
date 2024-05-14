import { renderHook } from '@testing-library/react'
import { useToString } from '@hooks/@Utilities/useToString'

describe('useToString', () => {
  it('should convert a value to a string', () => {
    const { result } = renderHook(() => useToString(42))
    expect(result.current).toBe('42')
  })

  it('should convert a getter function to a string', () => {
    const { result } = renderHook(() => useToString(() => 3.14))
    expect(result.current).toBe('3.14')
  })

  it('should memoize the string conversion', () => {
    const { result, rerender } = renderHook(({ value }) => useToString(value), {
      initialProps: { value: 'hello' },
    })

    expect(result.current).toBe('hello')

    rerender({ value: 'hello' })
    expect(result.current).toBe('hello')

    rerender({ value: 'world' })
    expect(result.current).toBe('world')
  })
})

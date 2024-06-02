import { renderHook, act } from '@testing-library/react'
import { useAbs } from '../useAbs'

describe('useAbs', () => {
  it('should return the absolute value of a positive num', () => {
    const { result } = renderHook(() => useAbs(5))
    expect(result.current).toBe(5)
  })

  it('should return the absolute value of a negative number', () => {
    const { result } = renderHook(() => useAbs(-7))
    expect(result.current).toBe(7)
  })

  it('should return the absolute value of zero', () => {
    const { result } = renderHook(() => useAbs(0))
    expect(result.current).toBe(0)
  })

  it('should return the absolute value when the input is a function returning a positive number', () => {
    const { result } = renderHook(() => useAbs(() => 10))
    expect(result.current).toBe(10)
  })

  it('should return the absolute value when the input is a function returning a negative number', () => {
    const { result } = renderHook(() => useAbs(() => -20))
    expect(result.current).toBe(20)
  })

  it('should update the absolute value when the input value changes', () => {
    let value = -15
    const { result, rerender } = renderHook(() => useAbs(value))

    expect(result.current).toBe(15)

    value = 30
    rerender()
    expect(result.current).toBe(30)
  })

  it('should update the absolute value when the function input changes', () => {
    let value = -8
    const getter = () => value
    const { result, rerender } = renderHook(() => useAbs(getter))

    expect(result.current).toBe(8)

    value = -50
    rerender()
    expect(result.current).toBe(50)
  })

  it('should log an error if the value is not a number or function', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const invalidValue: any = 'invalid'
    expect(() => renderHook(() => useAbs(invalidValue))).toThrow(
      'useAbs: value must be a number or a function that returns a number.'
    )

    consoleError.mockRestore()
  })

  it('should handle exceptions from functions', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const errorThrowingGetter = () => {
      throw new Error('Test error')
    }

    const { result } = renderHook(() => useAbs(errorThrowingGetter))
    expect(result.current).toBe(0)

    expect(consoleError).toHaveBeenCalledWith(
      'useAbs error:',
      new Error('Test error')
    )

    consoleError.mockRestore()
  })
})

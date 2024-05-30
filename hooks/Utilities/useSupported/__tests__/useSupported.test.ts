import { renderHook } from '@testing-library/react'
import { useSupported } from '../useSupported'

describe('useSupported', () => {
  test('should return true if the feature is supported', () => {
    const { result } = renderHook(() =>
      useSupported(() => 'getBattery' in navigator)
    )

    expect(result.current).toBe('getBattery' in navigator)
  })

  test('should return false if the feature is not supported', () => {
    const { result } = renderHook(() =>
      useSupported(() => 'someUnsupportedFeature' in navigator)
    )

    expect(result.current).toBe(false)
  })

  test('should handle errors gracefully and return false', () => {
    const { result } = renderHook(() =>
      useSupported(() => {
        throw new Error('Test error')
      })
    )

    expect(result.current).toBe(false)
  })
})

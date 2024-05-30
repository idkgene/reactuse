import { renderHook, act } from '@testing-library/react'
import { useEyeDropper } from '../useEyeDropper'

describe('useEyeDropper', () => {
  beforeEach(() => {
    ;(window as any).EyeDropper = jest.fn(() => ({
      open: jest.fn().mockResolvedValue({ sRGBHex: '#ffffff' }),
    }))
  })

  afterEach(() => {
    delete (window as any).EyeDropper
  })

  it('should return the initial state', () => {
    const { result } = renderHook(() => useEyeDropper())
    expect(result.current.isSupported).toBe(true)
    expect(result.current.sRGBHex).toBe('')
  })

  it('should set the initial value correctly', () => {
    const { result } = renderHook(() =>
      useEyeDropper({ initialValue: '#000000' })
    )
    expect(result.current.sRGBHex).toBe('#000000')
  })

  it('should open the eye dropper and update the sRGBHex value', async () => {
    const { result } = renderHook(() => useEyeDropper())
    await act(async () => {
      await result.current.open()
    })
    expect(result.current.sRGBHex).toBe('#ffffff')
  })

  it('should handle errors when opening the eye dropper', async () => {
    const errorMessage = 'EyeDropper open error'
    ;(window as any).EyeDropper.mockImplementationOnce(() => ({
      open: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }))
    const { result } = renderHook(() => useEyeDropper())
    await act(async () => {
      await result.current.open()
    })
    expect(result.current.sRGBHex).toBe('')
  })

  it('should return undefined when EyeDropper is not supported', () => {
    delete (window as any).EyeDropper
    const { result } = renderHook(() => useEyeDropper())
    expect(result.current.isSupported).toBe(false)
    expect(result.current.open()).resolves.toBeUndefined()
  })
})

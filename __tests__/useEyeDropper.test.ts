import { useEyeDropper } from '@/hooks/@Browser/useEyeDropper'
import { renderHook, act } from '@testing-library/react'

describe('useEyeDropper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return initial values', () => {
    const { result } = renderHook(() => useEyeDropper())

    expect(result.current.isSupported).toBe(false)
    expect(result.current.sRGBHex).toBe('')
    expect(typeof result.current.open).toBe('function')
  })

  it('should set isSupported to true if EyeDropper is available', () => {
    ;(window as any).EyeDropper = function () {}

    const { result } = renderHook(() => useEyeDropper())

    expect(result.current.isSupported).toBe(true)
  })

  it('should set initial sRGBHex value', () => {
    const initialValue = '#ffffff'
    const { result } = renderHook(() => useEyeDropper({ initialValue }))

    expect(result.current.sRGBHex).toBe(initialValue)
  })

  it('should update sRGBHex when open is called successfully', async () => {
    const mockSRGBHex = '#000000'
    const mockEyeDropper = {
      open: jest.fn().mockResolvedValue({ sRGBHex: mockSRGBHex }),
    }
    ;(window as any).EyeDropper = jest.fn(() => mockEyeDropper)

    const { result } = renderHook(() => useEyeDropper())

    await act(async () => {
      await result.current.open()
    })

    expect(result.current.sRGBHex).toBe(mockSRGBHex)
    expect(mockEyeDropper.open).toHaveBeenCalledTimes(1)
  })

  it('should handle open error and return undefined', async () => {
    const mockError = new Error('EyeDropper open error')
    const mockEyeDropper = {
      open: jest.fn().mockRejectedValue(mockError),
    }
    ;(window as any).EyeDropper = jest.fn(() => mockEyeDropper)
    console.error = jest.fn()

    const { result } = renderHook(() => useEyeDropper())

    await act(async () => {
      const res = await result.current.open()
      expect(res).toBeUndefined()
    })

    expect(mockEyeDropper.open).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(
      'EyeDropper open error:',
      mockError
    )
  })

  it('should return undefined when open is called and EyeDropper is not supported', async () => {
    const { result } = renderHook(() => useEyeDropper())

    await act(async () => {
      const res = await result.current.open()
      expect(res).toBeUndefined()
    })
  })
})

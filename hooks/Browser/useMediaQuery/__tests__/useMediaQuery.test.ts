import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '../useMediaQuery'

describe('useMediaQuery', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn()
  })

  it('should return undefined when running on the server', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBeUndefined()
  })

  it('should return the initial match state when running on the client', () => {
    const matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))
    window.matchMedia = matchMedia

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('should update the match state when the media query matches', () => {
    const addEventListener = jest.fn()
    const removeEventListener = jest.fn()
    const matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener,
      removeEventListener,
    }))
    window.matchMedia = matchMedia

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('should add and remove event listeners correctly', () => {
    const addEventListener = jest.fn()
    const removeEventListener = jest.fn()
    const matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener,
      removeEventListener,
    }))
    window.matchMedia = matchMedia

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(addEventListener).toHaveBeenCalledTimes(1)
    expect(removeEventListener).not.toHaveBeenCalled()

    unmount()
    expect(removeEventListener).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when creating MediaQueryList', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const matchMedia = jest.fn().mockImplementation(() => {
      throw new Error('Error creating MediaQueryList')
    })
    window.matchMedia = matchMedia

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBeUndefined()
    expect(consoleError).toHaveBeenCalledWith(
      'Error creating `MediaQueryList`:',
      expect.any(Error)
    )

    consoleError.mockRestore()
  })

  it('should update the match state when the media query changes', () => {
    const addEventListener = jest.fn()
    const removeEventListener = jest.fn()
    const matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener,
      removeEventListener,
    }))
    window.matchMedia = matchMedia

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    act(() => {
      const mediaQueryList = window.matchMedia('(min-width: 768px)')
      mediaQueryList.matches = true
      addEventListener.mock.calls[0][1]({
        matches: true,
        media: '(min-width: 768px)',
      })
    })

    expect(result.current).toBe(true)
  })
})

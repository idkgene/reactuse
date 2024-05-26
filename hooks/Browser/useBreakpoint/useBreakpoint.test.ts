import { renderHook, act } from '@testing-library/react'
import { useBreakpoint } from './useBreakpoint'

describe('useBreakpoint', () => {
  const originalInnerWidth = global.innerWidth
  const setInnerWidth = (width: number) => {
    global.innerWidth = width
    global.dispatchEvent(new Event('resize'))
  }

  afterAll(() => {
    global.innerWidth = originalInnerWidth
  })

  let addEventListenerMock: jest.Mock
  let removeEventListenerMock: jest.Mock

  beforeEach(() => {
    addEventListenerMock = jest.fn()
    removeEventListenerMock = jest.fn()

    window.addEventListener = addEventListenerMock
    window.removeEventListener = removeEventListenerMock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return initial window width and isBreakpointCrossed correctly', () => {
    setInnerWidth(1024)
    const { result } = renderHook(() => useBreakpoint(768))
    expect(result.current.windowWidth).toBe(1024)
    expect(result.current.isBreakpointCrossed).toBe(true)
  })

  it('should add and remove resize event listener', () => {
    const { unmount } = renderHook(() => useBreakpoint(768))

    expect(addEventListenerMock).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
    unmount()
    expect(removeEventListenerMock).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
  })
})

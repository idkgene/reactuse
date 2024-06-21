import { renderHook } from '@testing-library/react'
import { useInitialUnmount } from '../useInitialUnmount'

describe('useInitialUnmount', () => {
  it('should call the callback when the component unmounts', () => {
    const callback = jest.fn()
    const { unmount } = renderHook(() => useInitialUnmount(callback))

    expect(callback).not.toHaveBeenCalled()

    unmount()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

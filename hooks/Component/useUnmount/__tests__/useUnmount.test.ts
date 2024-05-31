import { renderHook } from '@testing-library/react'
import { useUnmount } from '../useUnmout'

it('should call the provided callback when the component is unmounted', () => {
  const callback = jest.fn()
  const { unmount } = renderHook(() => useUnmount(callback))

  unmount()

  expect(callback).toHaveBeenCalled()
})

it('should not call the provided callback on initial render', () => {
  const callback = jest.fn()
  renderHook(() => useUnmount(callback))

  expect(callback).not.toHaveBeenCalled()
})

it('should not call the provided callback on re-render with the same callback', () => {
  const callback = jest.fn()
  const { rerender } = renderHook(() => useUnmount(callback))

  rerender()

  expect(callback).not.toHaveBeenCalled()
})

it('should call the new callback when the callback is changed', () => {
  const firstCallback = jest.fn()
  const secondCallback = jest.fn()
  const { unmount, rerender } = renderHook((callback) => useUnmount(callback), {
    initialProps: firstCallback,
  })

  rerender(secondCallback)
  unmount()

  expect(firstCallback).not.toHaveBeenCalled()
  expect(secondCallback).toHaveBeenCalled()
})

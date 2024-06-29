import { renderHook } from '@testing-library/react';
import { useEffectOnce } from './useEffectOnce';

describe('useEffectOnce', () => {
  it('should call the effect function once during the initial render', () => {
    const effectMock = jest.fn();
    renderHook(() => { useEffectOnce({ effect: effectMock }); });
    expect(effectMock).toHaveBeenCalledTimes(1);
  });

  it('should not call the effect function again on subsequent renders', () => {
    const effectMock = jest.fn();
    const { rerender } = renderHook(() =>
      { useEffectOnce({ effect: effectMock }); },
    );
    rerender();
    expect(effectMock).toHaveBeenCalledTimes(1);
  });

  it('should call the cleanup function when the component is unmounted', () => {
    const cleanupMock = jest.fn();
    const effectMock = jest.fn(() => cleanupMock);
    const { unmount } = renderHook(() => { useEffectOnce({ effect: effectMock }); });
    unmount();
    expect(cleanupMock).toHaveBeenCalledTimes(1);
  });

  it('should not call the cleanup function if the effect function returns undefined', () => {
    const cleanupMock = jest.fn();
    const effectMock = jest.fn(() => undefined);
    const { unmount } = renderHook(() => { useEffectOnce({ effect: effectMock }); });
    unmount();
    expect(cleanupMock).not.toHaveBeenCalled();
  });
});

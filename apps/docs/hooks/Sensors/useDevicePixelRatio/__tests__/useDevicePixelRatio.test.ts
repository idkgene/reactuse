import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useDevicePixelRatio } from '../useDevicePixelRatio';

describe('useDevicePixelRatio', () => {
  beforeEach(() => {
    window.devicePixelRatio = 1;
  });

  it('should return the current device pixel ratio', () => {
    const { result } = renderHook(() => useDevicePixelRatio());
    expect(result.current.pixelRatio).toBe(1);
  });

  it('should update the pixel ratio when the device pixel ratio changes', () => {
    const { result } = renderHook(() => useDevicePixelRatio());

    act(() => {
      window.devicePixelRatio = 2;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.pixelRatio).toBe(2);
  });

  it('should use the provided window object instead of the default window', () => {
    const customWindow = {
      devicePixelRatio: 3,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Window;

    const { result } = renderHook(() =>
      useDevicePixelRatio({ window: customWindow }),
    );
    expect(result.current.pixelRatio).toBe(3);
  });

  it('should add and remove event listeners correctly', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useDevicePixelRatio());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should handle multiple instances of the hook independently', () => {
    const { result: result1 } = renderHook(() => useDevicePixelRatio());
    const { result: result2 } = renderHook(() => useDevicePixelRatio());

    act(() => {
      window.devicePixelRatio = 2;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result1.current.pixelRatio).toBe(2);
    expect(result2.current.pixelRatio).toBe(2);
  });
});

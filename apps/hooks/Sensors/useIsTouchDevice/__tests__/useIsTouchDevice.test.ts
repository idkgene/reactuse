import { renderHook, act } from '@testing-library/react';
import { useIsTouchDevice } from '../useIsTouchDevice';
import { expect, it, describe, vi } from 'vitest';

describe('useIsTouchDevice', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  });

  it('should return false if the device is not a touch device', () => {
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(false);
  });

  it('should return true if the device is a touch device (maxTouchPoints)', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 1,
      writable: true,
    });
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });

  it('should return true if the device is a touch device (matchMedia)', () => {
    window.matchMedia.mockImplementation((query: any) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });

  it('should return true if the device is a touch device (user agent)', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Android',
      writable: true,
    });
    const { result } = renderHook(() => useIsTouchDevice());
    expect(result.current).toBe(true);
  });

  it('should call onTouchDeviceChange when the touch device state changes', () => {
    const onTouchDeviceChange = jest.fn();
    const { rerender } = renderHook(() =>
      useIsTouchDevice({ onTouchDeviceChange }),
    );
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 1,
      writable: true,
    });
    rerender();
    expect(onTouchDeviceChange).toHaveBeenCalledWith(true);
  });

  it('should add and remove event listeners', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useIsTouchDevice());
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      { passive: true },
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should support custom event listeners', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    renderHook(() =>
      useIsTouchDevice({ eventListeners: ['resize', 'orientationchange'] }),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'orientationchange',
      expect.any(Function),
      { passive: true },
    );
  });
});

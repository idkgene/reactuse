import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, beforeEach, vi } from 'vitest';
import { useWindowResize } from '../useWindowResize';

describe('useWindowResize', () => {
  beforeEach(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 768,
      writable: true,
    });
    Object.defineProperty(window, 'outerWidth', {
      value: 1280,
      writable: true,
    });
    Object.defineProperty(window, 'outerHeight', {
      value: 800,
      writable: true,
    });
  });

  it('should return initial window size', () => {
    const { result } = renderHook(() => useWindowResize());

    expect(result.current).toEqual({
      innerWidth: 1024,
      innerHeight: 768,
      outerWidth: 1280,
      outerHeight: 800,
    });
  });

  it('should update window size on resize', () => {
    const { result } = renderHook(() => useWindowResize());

    act(() => {
      window.innerWidth = 1280;
      window.innerHeight = 720;
      window.outerWidth = 1440;
      window.outerHeight = 900;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      innerWidth: 1280,
      innerHeight: 720,
      outerWidth: 1440,
      outerHeight: 900,
    });
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useWindowResize());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });
});

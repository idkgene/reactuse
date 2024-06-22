import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '../useWindowScroll';
import { expect, it, describe, beforeEach, vi } from 'vitest';

describe('useWindowScroll', () => {
  beforeEach(() => {
    window.scrollX = 0;
    window.scrollY = 0;
  });

  it('should return initial scroll position', () => {
    const { result } = renderHook(() => useScrollPosition());

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should update scroll position when window is scrolled', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      window.scrollX = 100;
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 100, y: 200 });
  });

  it('should remove scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  it('should update scroll position correctly when window is scrolled multiple times', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      window.scrollX = 100;
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 100, y: 200 });

    act(() => {
      window.scrollX = 300;
      window.scrollY = 400;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 300, y: 400 });
  });
});

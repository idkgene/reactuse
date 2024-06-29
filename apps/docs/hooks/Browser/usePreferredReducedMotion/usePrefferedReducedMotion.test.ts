import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, beforeEach, vi } from 'vitest';
import { usePreferredReducedMotion } from './usePreferredReducedMotion';

describe('usePreferredReducedMotion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return "no-preference" when preference reduced-motion is not set', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePreferredReducedMotion());

    expect(result.current).toBe('no-preference');
  });

  it('should return "reduce" when prefers-reduced-motion is set to reduce', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePreferredReducedMotion());

    expect(result.current).toBe('reduce');
  });

  it('should update the preferred motion when the media query changes', () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener,
      removeListener,
      addEventListener: addListener,
      removeEventListener: removeListener,
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePreferredReducedMotion());

    expect(result.current).toBe('no-preference');

    act(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updatePreferredMotion = addListener.mock.calls[0][0];
      updatePreferredMotion({ matches: true, media: mediaQuery.media });
    });

    expect(result.current).toBe('reduce');
  });

  it('should remove the event listener when the component unmounts', () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener,
      removeListener,
      addEventListener: addListener,
      removeEventListener: removeListener,
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = renderHook(() => usePreferredReducedMotion());

    expect(addListener).toHaveBeenCalledTimes(1);

    unmount();

    expect(removeListener).toHaveBeenCalledTimes(1);
  });
});

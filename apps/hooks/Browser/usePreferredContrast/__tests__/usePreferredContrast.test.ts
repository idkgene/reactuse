import { renderHook, act } from '@testing-library/react';
import { usePreferredContrast } from '../usePreferredContast';
import { expect, it, describe, beforeEach, vi } from 'vitest';

describe('usePreferredContrast', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it('should return "no-preference" by default', () => {
    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('no-preference');
  });

  it('should return "more" when prefers-contrast is more', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-contrast: more)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('more');
  });

  it('should return "less" when prefers-contrast is less', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-contrast: less)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('less');
  });

  it('should return "custom" when prefers-contrast is custom', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-contrast: custom)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('custom');
  });

  it('should remove event listeners on unmount', () => {
    const addEventListenerMock = vi.fn();
    const removeEventListenerMock = vi.fn();

    window.matchMedia = vi.fn().mockImplementation(() => {
      return {
        matches: false,
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      };
    });

    const { unmount } = renderHook(() => usePreferredContrast());

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledTimes(3);
  });
});

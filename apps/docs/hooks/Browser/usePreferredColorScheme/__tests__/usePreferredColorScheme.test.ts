import { renderHook } from '@testing-library/react';
import { expect, it, describe, beforeEach, vi } from 'vitest';
import { usePreferredColorScheme } from '../usePreferredColorScheme';

describe('usePreferredColorScheme', () => {
  beforeEach(() => {
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
  });

  it('should return "no-preference" by default', () => {
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('no-preference');
  });

  it('should return "dark" when prefers-color-scheme is dark', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('dark');
  });

  it('should return "light" when prefers-color-scheme is light', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('light');
  });

  it('should update the preferred color scheme when the media query changes', async () => {
    const darkMediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_, callback) => {
        darkMediaQuery.onchange = callback;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };

    window.matchMedia = vi.fn().mockImplementation((query) => {
      if (query === '(prefers-color-scheme: dark)') {
        return darkMediaQuery;
      }
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('no-preference');
  });
});

import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { usePreferredDark } from './usePreferredDark';

describe('usePreferredDark', () => {
  it('should return true if prefers-color-scheme is dark', () => {
    const matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    });

    const { result } = renderHook(() => usePreferredDark());

    expect(result.current).toBe(true);
  });

  it('should return false if prefers-color-scheme is not dark', () => {
    const matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    });

    const { result } = renderHook(() => usePreferredDark());

    expect(result.current).toBe(false);
  });

  it('should update prefersDark when media query changes', () => {
    const listeners: Record<string, Function> = {};
    const matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: vi.fn((_, listener) => {
        listeners.change = listener;
      }),
      removeEventListener: vi.fn((_, listener) => {
        delete listeners.change;
      }),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMedia,
    });

    const { result } = renderHook(() => usePreferredDark());

    expect(result.current).toBe(true);

    act(() => {
      listeners.change({ matches: false });
    });

    expect(result.current).toBe(false);
  });

  it('should use the provided window object', () => {
    const customWindow = {
      matchMedia: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    };

    const { result } = renderHook(() =>
      usePreferredDark({ window: customWindow as unknown as Window }),
    );

    expect(result.current).toBe(true);
    expect(customWindow.matchMedia).toHaveBeenCalledWith(
      '(prefers-color-scheme: dark)',
    );
  });
});

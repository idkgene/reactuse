import { renderHook } from '@testing-library/react';
import { usePreferredColorScheme } from '../usePreferredColorScheme';

describe('usePreferredColorScheme', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('should return "no-preference" by default', () => {
    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('no-preference');
  });

  it('should return "dark" when prefers-color-scheme is dark', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('dark');
  });

  it('should return "light" when prefers-color-scheme is light', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('light');
  });

  it('should update the preferred color scheme when the media query changes', async () => {
    const darkMediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((_, callback) => {
        darkMediaQuery.onchange = callback;
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    window.matchMedia = jest.fn().mockImplementation(query => {
      if (query === '(prefers-color-scheme: dark)') {
        return darkMediaQuery;
      }
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('no-preference');
  });
});

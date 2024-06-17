import { renderHook, act } from '@testing-library/react';
import { usePreferredContrast } from '../usePreferredContast';

describe('usePreferredContrast', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it('should return "no-preference" by default', () => {
    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('no-preference');
  });

  it('should return "more" when prefers-contrast is more', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(prefers-contrast: more)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('more');
  });

  it('should return "less" when prefers-contrast is less', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(prefers-contrast: less)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('less');
  });

  it('should return "custom" when prefers-contrast is custom', () => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === '(prefers-contrast: custom)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => usePreferredContrast());
    expect(result.current).toBe('custom');
  });

  it('should remove event listeners on unmount', () => {
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    window.matchMedia = jest.fn().mockImplementation(() => {
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

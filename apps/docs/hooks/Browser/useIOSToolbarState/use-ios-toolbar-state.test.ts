import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useIOSToolbarState } from './use-ios-toolbar-state';

describe('useIOSToolbarState', () => {
  let originalUserAgent: string;
  let originalInnerHeight: number;
  let originalNavigator: any;

  beforeEach(() => {
    originalUserAgent = window.navigator.userAgent;
    originalInnerHeight = window.innerHeight;
    originalNavigator = window.navigator;
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true,
    });
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('should return undefined for non-iOS devices', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      configurable: true,
    });

    const { result } = renderHook(() => useIOSToolbarState());
    expect(result.current.isVisible).toBeUndefined();
  });

  it('should return undefined for iOS Chrome', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1',
      configurable: true,
    });

    const { result } = renderHook(() => useIOSToolbarState());
    expect(result.current.isVisible).toBeUndefined();
  });

  it('should return false for iOS Safari in standalone mode', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      configurable: true,
    });
    Object.defineProperty(window.navigator, 'standalone', {
      value: true,
      configurable: true,
    });

    const { result } = renderHook(() => useIOSToolbarState());
    expect(result.current.isVisible).toBe(false);
  });

  it('should detect toolbar visibility changes', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      configurable: true,
    });
    Object.defineProperty(window.navigator, 'standalone', {
      value: true,
      configurable: true,
    });

    const mockOnVisibilityChange = vi.fn();
    const { result } = renderHook(() =>
      useIOSToolbarState({ onVisibilityChange: mockOnVisibilityChange }),
    );

    expect(result.current.isVisible).toBe(false);

    // Simulate toolbar appearing
    act(() => {
      Object.defineProperty(window, 'innerHeight', {
        value: 500,
        configurable: true,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isVisible).toBe(true);
    expect(mockOnVisibilityChange).toHaveBeenCalledWith(true);

    // Simulate toolbar disappearing
    act(() => {
      Object.defineProperty(window, 'innerHeight', {
        value: 600,
        configurable: true,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isVisible).toBe(false);
    expect(mockOnVisibilityChange).toHaveBeenCalledWith(false);
  });

  it('should clean up event listener on unmount', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      configurable: true,
    });
    Object.defineProperty(window.navigator, 'standalone', {
      value: true,
      configurable: true,
    });

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useIOSToolbarState());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should not add event listener for non-standalone mode', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      configurable: true,
    });
    Object.defineProperty(window.navigator, 'standalone', {
      value: false,
      configurable: true,
    });

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useIOSToolbarState());

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('should handle missing standalone property', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      configurable: true,
    });

    // Save the original navigator
    const originalNavigator = window.navigator;

    // Create a new object without the standalone property
    const modifiedNavigator = Object.create(
      Object.getPrototypeOf(window.navigator),
    );
    Object.getOwnPropertyNames(window.navigator).forEach((prop) => {
      if (prop !== 'standalone') {
        Object.defineProperty(
          modifiedNavigator,
          prop,
          Object.getOwnPropertyDescriptor(window.navigator, prop)!,
        );
      }
    });

    // Replace the navigator object
    Object.defineProperty(window, 'navigator', {
      value: modifiedNavigator,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useIOSToolbarState());
    expect(result.current.isVisible).toBeUndefined();

    // Restore the original navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true,
    });
  });
});

import { renderHook } from '@testing-library/react';
import { usePreferredLanguage } from './usePrefferedLanguage';
import { LanguageCode } from '../utilities';
import { expect, it, describe, afterEach, vi } from 'vitest';

describe('usePreferredLanguage', () => {
  const mockNavigatorLanguageGetter = vi.spyOn(
    window.navigator,
    'language',
    'get',
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the initialLanguage if specified', () => {
    const { result } = renderHook(() =>
      usePreferredLanguage({ initialLanguage: 'en' as LanguageCode }),
    );
    expect(result.current).toBe('en');
  });

  it('should return the browser language if initialLanguage is not specified', () => {
    mockNavigatorLanguageGetter.mockReturnValue('es-ES');
    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('es');
  });

  it('should trigger onLanguageChange when the language changes', () => {
    mockNavigatorLanguageGetter.mockReturnValue('es-ES');
    const onLanguageChange = vi.fn();
    const { result } = renderHook(() =>
      usePreferredLanguage({
        onLanguageChange,
        initialLanguage: 'en' as LanguageCode,
      }),
    );
    expect(result.current).toBe('es');
    expect(onLanguageChange).toHaveBeenCalledWith('es');
  });

  it('should handle window languagechange event', () => {
    mockNavigatorLanguageGetter.mockReturnValue('es-ES');
    const onLanguageChange = vi.fn();
    const { result, rerender } = renderHook(() =>
      usePreferredLanguage({
        onLanguageChange,
        initialLanguage: 'en' as LanguageCode,
      }),
    );
    expect(result.current).toBe('es');
    expect(onLanguageChange).toHaveBeenCalledWith('es');

    mockNavigatorLanguageGetter.mockReturnValue('de-DE');
    window.dispatchEvent(new Event('languagechange'));
    rerender();
    expect(result.current).toBe('de');
    expect(onLanguageChange).toHaveBeenCalledWith('de');
  });

  it('should clean up the event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => usePreferredLanguage());
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'languagechange',
      expect.any(Function),
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'languagechange',
      expect.any(Function),
    );
  });

  it('should return the initialLanguage if window or window.navigator is not available', () => {
    const originalWindow = global.window;

    Object.defineProperty(global, 'window', {
      value: undefined,
    });

    const { result } = renderHook(() =>
      usePreferredLanguage({ initialLanguage: 'en' as LanguageCode }),
    );
    expect(result.current).toBe('en');

    global.window = originalWindow;
  });
});

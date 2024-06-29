import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { usePreferredLanguage } from './use-preffered-language';

describe('usePreferredLanguage', () => {
  const originalNavigator = global.navigator;
  const originalWindow = global.window;

  beforeEach(() => {
    vi.resetAllMocks();
    global.navigator = { ...originalNavigator, language: 'en-US' };
    global.window = {
      ...originalWindow,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });

  afterEach(() => {
    global.navigator = originalNavigator;
    global.window = originalWindow;
  });

  it('should return the default language when no options are provided', () => {
    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('en');
  });

  it('should return the initial language when provided', () => {
    const { result } = renderHook(() =>
      usePreferredLanguage({ initialLanguage: 'fr' }),
    );
    expect(result.current).toBe('fr');
  });

  it('should detect the browser language', () => {
    global.navigator.language = 'es-ES';
    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('es');
  });

  it('should call onLanguageChange when language changes', () => {
    const onLanguageChange = vi.fn();
    renderHook(() => usePreferredLanguage({ onLanguageChange }));
    expect(onLanguageChange).toHaveBeenCalledWith('en');
  });

  it('should update language when languagechange event is triggered', () => {
    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe('en');

    act(() => {
      global.navigator.language = 'fr-FR';
      global.window.dispatchEvent(new Event('languagechange'));
    });

    expect(result.current).toBe('fr');
  });
});

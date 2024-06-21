import { renderHook } from '@testing-library/react';
import { useOperatingSystem } from '../useOperatingSystem';
import { expect, it, describe, beforeEach } from 'vitest';

describe('useOperatingSystem', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: '',
      configurable: true,
    });
  });

  it('should return "undetermined" when user agent is not set', () => {
    const { result } = renderHook(() => useOperatingSystem());
    expect(result.current).toBe('undetermined');
  });

  it('should return "macos" when user agent contains Mac-related keywords', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const { result } = renderHook(() => useOperatingSystem());
    expect(result.current).toBe('macos');
  });

  it('should return "ios" when user agent contains iOS-related keywords', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
    });
    const { result } = renderHook(() => useOperatingSystem());
    expect(result.current).toBe('ios');
  });

  it('should return "windows" when user agent contains Windows-related keywords', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const { result } = renderHook(() => useOperatingSystem());
    expect(result.current).toBe('windows');
  });

  it('should return "android" when user agent contains Android-related keywords', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 11; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36',
    });
    const { result } = renderHook(() => useOperatingSystem());
    expect(result.current).toBe('android');
  });

  it('should return "linux" when user agent contains Linux-related keywords', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const { result } = renderHook(() => useOperatingSystem());
    expect(result.current).toBe('linux');
  });
});

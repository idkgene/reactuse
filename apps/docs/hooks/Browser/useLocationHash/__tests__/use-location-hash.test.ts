import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useLocationHash } from '../use-location-hash';

describe('useLocationHash', () => {
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, hash: '' };
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.restoreAllMocks();
  });

  it('should return an empty string when there is no hash', () => {
    const { result } = renderHook(() => useLocationHash());
    expect(result.current).toBe('');
  });

  it('should return the current hash without the # symbol', () => {
    window.location.hash = '#test-hash';
    const { result } = renderHook(() => useLocationHash());
    expect(result.current).toBe('test-hash');
  });

  it('should update when the hash changes', () => {
    const { result } = renderHook(() => useLocationHash());

    act(() => {
      window.location.hash = '#new-hash';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current).toBe('new-hash');
  });

  it('should handle multiple hash changes', () => {
    const { result } = renderHook(() => useLocationHash());

    act(() => {
      window.location.hash = '#first-hash';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current).toBe('first-hash');

    act(() => {
      window.location.hash = '#second-hash';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current).toBe('second-hash');
  });

  it('should clean up the event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useLocationHash());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'hashchange',
      expect.any(Function),
    );
  });

  it('should handle server-side rendering', () => {
    const originalWindow = global.window;
    const originalLocation = global.location;

    // Delete window and location
    delete (global as any).window;
    delete (global as any).location;

    const { result } = renderHook(() => useLocationHash());

    expect(result.current).toBe('');

    // Restore window and location
    (global as any).window = originalWindow;
    (global as any).location = originalLocation;
  });
});

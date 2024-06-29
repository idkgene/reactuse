import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSupported } from '../use-supported';

describe('useSupported', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // Empty fn
    });
  });

  it('should return true when callback resolves to a truthy value', async () => {
    const callback = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useSupported(callback));

    expect(result.current).toBe(false);

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return false when callback resolves to a falsy value', async () => {
    const callback = vi.fn().mockResolvedValue(false);
    const { result } = renderHook(() => useSupported(callback));

    expect(result.current).toBe(false);

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return false when callback rejects', async () => {
    const error = new Error('Test error');
    const callback = vi.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useSupported(callback));

    expect(result.current).toBe(false);

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Error in support check:',
      error,
    );
  });
  it('should not update state if component is unmounted before callback resolves', () => {
    vi.useFakeTimers();
    const callback = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 100);
        }),
    );
    const { result, unmount } = renderHook(() => useSupported(callback));

    expect(result.current).toBe(false);

    act(() => {
      unmount();
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(false);
    expect(callback).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('should log an error and throw when callback rejects', async () => {
    vi.useFakeTimers();
    const error = new Error('Test error');
    const callback = vi.fn().mockRejectedValue(error);

    const consoleErrorSpy = vi.spyOn(console, 'error');

    const { result } = renderHook(() => useSupported(callback));

    await expect(async () => {
      await act(async () => {
        await vi.runAllTimersAsync();
      });
    }).rejects.toThrow('Failed to check support: Test error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in support check:',
      error,
    );

    expect(result.current).toBe(false);

    vi.useRealTimers();
  });

  it('should log an error and throw with stringified message when callback rejects with non-Error', async () => {
    vi.useFakeTimers();
    const error = { custom: 'error' };
    const callback = vi.fn().mockRejectedValue(error);

    const consoleErrorSpy = vi.spyOn(console, 'error');

    const { result } = renderHook(() => useSupported(callback));

    await expect(async () => {
      await act(async () => {
        await vi.runAllTimersAsync();
      });
    }).rejects.toThrow('Failed to check support: [object Object]');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in support check:',
      error,
    );

    expect(result.current).toBe(false);

    vi.useRealTimers();
  });
});

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useInterval } from '../use-interval';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error if interval is not a positive number', () => {
    expect(() => useInterval(0)).toThrowError(
      'useInterval: interval must be a positive number',
    );
    expect(() => useInterval(-1)).toThrowError(
      'useInterval: interval must be a positive number',
    );
  });

  it('should start the interval immediately by default', () => {
    const { result } = renderHook(() => useInterval(1000));
    expect(result.current.counter).toBe(0);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(1);
  });

  it('should not start the interval immediately if immediate is false', () => {
    const { result } = renderHook(() =>
      useInterval(1000, { immediate: false }),
    );
    expect(result.current.counter).toBe(0);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(0);
  });

  it('should call the callback with the correct count on each interval', () => {
    const callback = vi.fn();
    renderHook(() => useInterval(1000, { callback }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(1);
    expect(callback).toHaveBeenCalledWith(2);
    expect(callback).toHaveBeenCalledWith(3);
  });

  it('should reset the counter when reset is called', () => {
    const { result } = renderHook(() => useInterval(1000));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.counter).toBe(2);
    act(() => {
      result.current.reset();
    });
    expect(result.current.counter).toBe(0);
  });

  it('should pause the interval when pause is called', () => {
    const { result } = renderHook(() => useInterval(1000));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.counter).toBe(2);
    act(() => {
      result.current.pause();
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.counter).toBe(2);
  });

  it('should resume the interval when resume is called', () => {
    const { result } = renderHook(() => useInterval(1000));
    act(() => {
      vi.advanceTimersByTime(2000);
      result.current.pause();
      vi.advanceTimersByTime(2000);
      result.current.resume();
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(2);
  });

  it('should handle errors in the callback function', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    const callback = (): never => {
      throw new Error('Test error');
    };
    renderHook(() => useInterval(1000, { callback }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'useInterval: Error in callback:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });

  it('should clear the interval when the component unmounts', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useInterval(1000));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });
});

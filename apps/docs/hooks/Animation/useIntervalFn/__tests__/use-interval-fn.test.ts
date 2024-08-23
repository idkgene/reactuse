import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIntervalFn } from '../use-interval-fn';

describe('useIntervalFn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start the interval immediately by default', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    expect(result.current.isActive).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not start the interval immediately when immediate is false', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useIntervalFn(callback, 1000, { immediate: false }),
    );

    expect(result.current.isActive).toBe(false);
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should execute callback immediately when immediateCallback is true', () => {
    const callback = vi.fn();
    renderHook(() =>
      useIntervalFn(callback, 1000, { immediateCallback: true }),
    );

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pause and resume the interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    vi.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      result.current.pause();
    });

    vi.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      result.current.resume();
    });

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should reset the interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    vi.advanceTimersByTime(500);
    act(() => {
      result.current.reset();
    });
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should set a new interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.setInterval(500);
    });

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should set a new callback', () => {
    const initialCallback = vi.fn();
    const newCallback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(initialCallback, 1000));

    vi.advanceTimersByTime(1000);
    expect(initialCallback).toHaveBeenCalledTimes(1);
    expect(newCallback).not.toHaveBeenCalled();

    act(() => {
      result.current.setCallback(newCallback);
    });

    vi.advanceTimersByTime(1000);
    expect(initialCallback).toHaveBeenCalledTimes(1);
    expect(newCallback).toHaveBeenCalledTimes(1);
  });

  it('should get the current interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    expect(result.current.getCurrentInterval()).toBe(1000);

    act(() => {
      result.current.setInterval(2000);
    });

    expect(result.current.getCurrentInterval()).toBe(2000);
  });

  it('should handle dynamic interval functions', () => {
    const callback = vi.fn();
    const dynamicInterval = vi.fn().mockReturnValue(1000);
    const { result } = renderHook(() =>
      useIntervalFn(callback, dynamicInterval),
    );

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(dynamicInterval).toHaveBeenCalled();

    dynamicInterval.mockReturnValue(500);
    act(() => {
      result.current.reset();
    });

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should throw an error for non-positive intervals', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    expect(() => {
      act(() => {
        result.current.setInterval(0);
      });
    }).toThrow('Interval must be a positive number');

    expect(() => {
      act(() => {
        result.current.setInterval(-1000);
      });
    }).toThrow('Interval must be a positive number');
  });

  it('should handle errors in the callback', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const callback = vi.fn().mockImplementation(() => {
      throw new Error('Test error');
    });

    renderHook(() => useIntervalFn(callback, 1000));

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'An error occurred in the interval callback',
      expect.any(Error),
    );
  });

  it('should clean up the interval on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useIntervalFn(callback, 1000));

    unmount();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle multiple instances of the hook', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { result: result1 } = renderHook(() =>
      useIntervalFn(callback1, 1000),
    );
    renderHook(() => useIntervalFn(callback2, 500));

    vi.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(2);

    act(() => {
      result1.current.pause();
    });

    vi.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(4);
  });

  describe('edge cases', () => {
    it('should handle rapid pause and resume calls', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        result.current.pause();
        result.current.resume();
        result.current.pause();
        result.current.resume();
      });

      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle setting interval to the same value', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        result.current.setInterval(1000);
      });

      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle setting callback to the same function', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        result.current.setCallback(callback);
      });

      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

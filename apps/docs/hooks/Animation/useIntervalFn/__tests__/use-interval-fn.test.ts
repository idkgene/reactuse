import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIntervalFn, type Fn } from '../use-interval-fn';

describe('useIntervalFn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error if callback is not a function', () => {
    expect(() => useIntervalFn(null as unknown as Fn)).toThrowError(
      'useIntervalFn: callback must be a function',
    );
  });

  it('should start the interval immediately by default', () => {
    const callback = vi.fn();
    renderHook(() => useIntervalFn(callback));
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not start the interval immediately if immediate is false', () => {
    const callback = vi.fn();
    renderHook(() => useIntervalFn(callback, 1000, { immediate: false }));
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call the callback immediately if immediateCallback is true', () => {
    const callback = vi.fn();
    renderHook(() =>
      useIntervalFn(callback, 1000, {
        immediate: true,
        immediateCallback: true,
      }),
    );
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if interval does not resolve to a positive number', () => {
    const callback = vi.fn();
    expect(() => {
      renderHook(() => useIntervalFn(callback, () => -1));
    }).toThrowError(
      'useIntervalFn: interval must resolve to a positive number',
    );
  });

  it('should pause and resume the interval correctly', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntervalFn(callback));
    expect(result.current.isActive).toBe(true);
    act(() => {
      result.current.pause();
    });
    expect(result.current.isActive).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      result.current.resume();
    });
    expect(result.current.isActive).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle errors in the callback', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    const callback = vi.fn(() => {
      throw new Error('Test error');
    });
    renderHook(() => useIntervalFn(callback));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'useIntervalFn: Error in callback:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });

  it('should handle errors in the immediate callback', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    const callback = vi.fn(() => {
      throw new Error('Test error');
    });
    renderHook(() =>
      useIntervalFn(callback, 1000, {
        immediate: true,
        immediateCallback: true,
      }),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'useIntervalFn: Error in immediate callback:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });

  it('should clear the interval when unmounted', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useIntervalFn(callback));
    unmount();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should update the callback when it changes', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { rerender } = renderHook(({ callback }) => useIntervalFn(callback), {
      initialProps: { callback: callback1 },
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();
    rerender({ callback: callback2 });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update the interval when it changes', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ interval }) => useIntervalFn(callback, interval),
      {
        initialProps: { interval: 1000 },
      },
    );
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    rerender({ interval: 500 });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle errors in the immediate callback on resume', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    const callback = vi.fn(() => {
      throw new Error('Test error');
    });
    const { result } = renderHook(() =>
      useIntervalFn(callback, 1000, {
        immediate: false,
        immediateCallback: true,
      }),
    );

    expect(callback).not.toHaveBeenCalled();
    act(() => {
      result.current.resume();
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'useIntervalFn: Error in immediate callback:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });
});

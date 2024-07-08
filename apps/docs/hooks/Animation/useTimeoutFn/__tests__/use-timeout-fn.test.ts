import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTimeoutFn } from '../use-timeout-fn';

describe('useTimeoutFn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should start the timeout immediately by default', () => {
    const callback = vi.fn();
    renderHook(() => useTimeoutFn(callback, 1000));
    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });

  it('should not start the timeout immediately when immediate is false', () => {
    const callback = vi.fn();
    renderHook(() => useTimeoutFn(callback, 1000, { immediate: false }));
    vi.advanceTimersByTime(1000);
    expect(callback).not.toBeCalled();
  });

  it('should allow manual start of the timeout', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useTimeoutFn(callback, 1000, { immediate: false }),
    );
    act(() => {
      result.current.start();
    });
    vi.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });

  it('should allow stopping of the timeout', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeoutFn(callback, 1000));
    act(() => {
      result.current.stop();
    });
    vi.advanceTimersByTime(1000);
    expect(callback).not.toBeCalled();
  });

  it('should update isPending state correctly', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useTimeoutFn(callback, 1000, { immediate: false }),
    );
    expect(result.current.isPending).toBe(false);
    act(() => {
      result.current.start();
    });
    expect(result.current.isPending).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.isPending).toBe(false);
  });

  it('should work with a function returning the interval', () => {
    const callback = vi.fn();
    const intervalFn = vi.fn(() => 1000);
    renderHook(() => useTimeoutFn(callback, intervalFn));
    expect(intervalFn).toBeCalled();
    vi.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });

  it('should throw an error for invalid interval types', () => {
    const callback = vi.fn();
    expect(() => {
      renderHook(() => useTimeoutFn(callback, 'invalid' as unknown as number));
    }).toThrow('Interval must be a number or a function returning a number');
  });

  it('should throw an error for negative intervals', () => {
    const callback = vi.fn();
    expect(() => {
      renderHook(() => useTimeoutFn(callback, -1000));
    }).toThrow('Interval must be a non-negative number');
  });

  it('should pass arguments to the callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useTimeoutFn(callback, 1000, { immediate: false }),
    );
    act(() => {
      result.current.start('arg1', 'arg2');
    });
    vi.advanceTimersByTime(1000);
    expect(callback).toBeCalledWith('arg1', 'arg2');
  });

  it('should update the callback reference', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useTimeoutFn(cb, 1000, { immediate: false }),
      {
        initialProps: { cb: callback1 },
      },
    );

    rerender({ cb: callback2 });

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback1).not.toBeCalled();
    expect(callback2).toBeCalled();
  });

  it('should restart the timeout when start is called multiple times', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useTimeoutFn(callback, 1000, { immediate: false }),
    );
    act(() => {
      result.current.start();
    });
    vi.advanceTimersByTime(500);
    act(() => {
      result.current.start();
    });
    vi.advanceTimersByTime(500);
    expect(callback).not.toBeCalled();
    vi.advanceTimersByTime(500);
    expect(callback).toBeCalled();
  });

  it('should clean up the timeout on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeoutFn(callback, 1000));
    unmount();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toBeCalled();
  });

  it('should handle zero delay correctly', () => {
    const callback = vi.fn();
    renderHook(() => useTimeoutFn(callback, 0));
    vi.advanceTimersByTime(0);
    expect(callback).toBeCalled();
  });

  it('should work with a dynamic interval', () => {
    let dynamicInterval = 1000;
    const callback = vi.fn();
    const { result, rerender } = renderHook(() =>
      useTimeoutFn(callback, () => dynamicInterval, { immediate: false })
    );

    act(() => {
      result.current.start();
    });

    dynamicInterval = 2000;
    rerender();

    act(() => {
      result.current.stop();
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).not.toBeCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toBeCalled();
  });

  it('should not throw when stopping a non-existent timeout', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useTimeoutFn(callback, 1000, { immediate: false }),
    );
    expect(() => {
      act(() => {
        result.current.stop();
      });
    }).not.toThrow();
  });
});

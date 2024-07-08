import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, afterEach, vi, beforeEach } from 'vitest';
import { useTimeout } from '../use-timeout';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with ready state false when controls are not set', () => {
    const { result } = renderHook(() => useTimeout(1000));
    expect(result.current.ready).toBe(false);
  });

  it('should initialize with ready state true when controls are set', () => {
    const { result } = renderHook(() => useTimeout(1000, { controls: true }));
    expect(result.current.ready).toBe(true);
  });

  it('should set ready to true after timeout', () => {
    const { result } = renderHook(() => useTimeout(1000));
    expect(result.current.ready).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.ready).toBe(true);
  });

  it('should call callback after timeout', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(1000, { callback }));
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should stop timeout when stop is called', () => {
    const { result } = renderHook(() => useTimeout(1000, { controls: true }));
    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.stop();
    });
    expect(result.current.ready).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(result.current.ready).toBe(true);
  });

  it('should throw error for invalid interval', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    expect(() => {
      renderHook(() => useTimeout(-1000));
    }).toThrow('Invalid interval value');
    consoleErrorMock.mockRestore();
  });

  it('should update callback ref when callback changes', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { rerender } = renderHook(
      ({ callback }) => useTimeout(1000, { callback }),
      { initialProps: { callback: callback1 } },
    );
    rerender({ callback: callback2 });
    vi.advanceTimersByTime(1000);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should not start timeout when controls are true', () => {
    const { result } = renderHook(() => useTimeout(1000, { controls: true }));
    expect(result.current.ready).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(result.current.ready).toBe(true);
  });

  it('should handle NaN interval', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    expect(() => {
      renderHook(() => useTimeout(NaN));
    }).toThrow('Invalid interval value');
    consoleErrorMock.mockRestore();
  });

  it('should handle non-number interval', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {
        // noop
      });
    expect(() => {
      renderHook(() => useTimeout('not a number' as unknown as number));
    }).toThrow('Invalid interval value');
    consoleErrorMock.mockRestore();
  });

  it('should clear existing timeout when start is called multiple times', () => {
    const { result } = renderHook(() => useTimeout(1000, { controls: true }));

    act(() => {
      result.current.start();
    });

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    act(() => {
      result.current.start();
    });

    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });

  it('should handle interval as a function', () => {
    const intervalFn = vi.fn(() => 2000);
    const { result } = renderHook(() => useTimeout(intervalFn));

    expect(intervalFn).toHaveBeenCalledTimes(1);
    expect(result.current.ready).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.ready).toBe(true);
  });

  it('should handle interval as a number', () => {
    const { result } = renderHook(() => useTimeout(1500));

    expect(result.current.ready).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.ready).toBe(true);
  });
});

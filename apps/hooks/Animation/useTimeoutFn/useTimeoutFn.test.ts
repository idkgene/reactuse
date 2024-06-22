import { renderHook, act, waitFor } from '@testing-library/react';
import useTimeoutFn from './useTimeoutFn';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('useTimeoutFn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute the callback immediately when immediate is true', () => {
    const callback = vi.fn();
    renderHook(() => useTimeoutFn(callback, 1000, { immediate: true }));
    vi.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback immediately when immediate is false', () => {
    const callback = vi.fn();
    renderHook(() => useTimeoutFn(callback, 1000, { immediate: false }));
    expect(callback).not.toHaveBeenCalled();
  });

  it('should execute the callback after the specified interval', () => {
    const callback = vi.fn();
    renderHook(() => useTimeoutFn(callback, 1000));
    vi.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute the callback with the provided arguments', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeoutFn(callback, 1000));
    act(() => {
      result.current.start('arg1', 'arg2');
    });
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should stop the timeout when stop is called', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeoutFn(callback, 1000));
    act(() => {
      result.current.start();
      result.current.stop();
    });
    vi.runAllTimers();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should update the callback when it changes', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { rerender } = renderHook(
      ({ callback }) => useTimeoutFn(callback, 1000),
      {
        initialProps: { callback: callback1 },
      },
    );
    rerender({ callback: callback2 });
    vi.advanceTimersByTime(1000);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update the interval when it changes', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ interval }) => useTimeoutFn(callback, interval),
      {
        initialProps: { interval: 1000 },
      },
    );
    rerender({ interval: 2000 });
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle interval as a function', () => {
    const callback = vi.fn();
    const intervalFn = vi.fn(() => 1000);
    renderHook(() => useTimeoutFn(callback, intervalFn));
    expect(intervalFn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should set isPending to true when start is called and false when the timeout is executed', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeoutFn(callback, 1000));
    expect(result.current.isPending).toBe(false);
    act(() => {
      result.current.start();
    });
    await waitFor(() => expect(result.current.isPending).toBe(true));
    vi.runAllTimers();
    await waitFor(() => expect(result.current.isPending).toBe(false));
  });

  it('should set isPending to false when stop is called', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeoutFn(callback, 1000));
    act(() => {
      result.current.start();
      result.current.stop();
    });
    expect(result.current.isPending).toBe(false);
  });

  it('should cleanup the timeout when the component unmounts', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeoutFn(callback, 1000));
    unmount();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });
});

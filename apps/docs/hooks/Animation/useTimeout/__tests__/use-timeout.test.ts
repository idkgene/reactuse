import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, afterEach, vi } from 'vitest';
import { useTimeout } from '../use-timeout';

vi.useFakeTimers();

describe('useTimeout', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should return ready state as true after the specified interval', () => {
    const { result } = renderHook(() => useTimeout(1000));

    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });

  it('should return ready state as false initially when immediate is set to false', () => {
    const { result } = renderHook(() => useTimeout(1000, { immediate: false }));

    expect(result.current).toBe(false);
  });

  it('should return ready state as true after the specified interval when immediate is false and start is called', () => {
    const { result } = renderHook(() =>
      useTimeout(1000, { immediate: false, controls: true }),
    );

    act(() => {
      result.current.start();
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.ready).toBe(true);
  });

  it('should stop the timeout when stop is called', () => {
    const { result } = renderHook(() => useTimeout(1000, { controls: true }));

    act(() => {
      result.current.stop();
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.ready).toBe(false);
  });

  it('should restart the timeout when start is called', () => {
    const { result } = renderHook(() => useTimeout(1000, { controls: true }));

    act(() => {
      vi.advanceTimersByTime(500);
      result.current.start();
      vi.advanceTimersByTime(500);
    });

    expect(result.current.ready).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.ready).toBe(true);
  });

  it('should call the callback function after the specified interval', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(1000, { callback }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should accept a function as interval and use its return value', () => {
    const intervalFn = vi.fn(() => 2000);
    const { result } = renderHook(() => useTimeout(intervalFn));

    expect(intervalFn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(true);
  });

  it('should clear the timeout when the component unmounts', () => {
    const { unmount } = renderHook(() => useTimeout(1000));

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(vi.getTimerCount()).toBe(0);
  });
});

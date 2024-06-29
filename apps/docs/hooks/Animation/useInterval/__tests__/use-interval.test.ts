import { renderHook, act } from '@testing-library/react';
import {
  expect,
  it,
  describe,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from 'vitest';
import { useInterval } from '../use-interval';

describe('useInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should increment counter on each interval', () => {
    const { result } = renderHook(() => useInterval(1000));

    expect(result.current.counter).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(2);
  });

  it('should not start interval if immediate is false', () => {
    const { result } = renderHook(() =>
      useInterval(1000, { immediate: false }),
    );

    expect(result.current.counter).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(0);
  });

  it('should call callback on each interval', () => {
    const callback = vi.fn();
    renderHook(() => useInterval(1000, { callback }));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(2);
  });

  it('should reset counter', () => {
    const { result } = renderHook(() => useInterval(1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(1);

    act(() => {
      result.current.reset();
    });
    expect(result.current.counter).toBe(0);
  });

  it('should pause and resume interval', () => {
    const { result } = renderHook(() => useInterval(1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(1);

    act(() => {
      result.current.pause();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(1);

    act(() => {
      result.current.resume();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(2);
  });

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useInterval(1000));
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });
});

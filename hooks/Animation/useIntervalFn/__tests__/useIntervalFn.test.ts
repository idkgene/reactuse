import { renderHook, act } from '@testing-library/react';
import { useIntervalFn } from '../useIntervalFn';

describe('useIntervalFn', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call callback on each interval', () => {
    const callback = jest.fn();
    renderHook(() => useIntervalFn(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not start interval if immediate is false', () => {
    const callback = jest.fn();
    renderHook(() => useIntervalFn(callback, 1000, { immediate: false }));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should execute callback immediately after calling resume if immediateCallback is true', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useIntervalFn(callback, 1000, {
        immediate: false,
        immediateCallback: true,
      })
    );

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      result.current.resume();
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pause and resume interval', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIntervalFn(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.pause();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.resume();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should update isActive state correctly', () => {
    const { result } = renderHook(() => useIntervalFn(() => {}, 1000));

    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.pause();
    });
    expect(result.current.isActive).toBe(false);

    act(() => {
      result.current.resume();
    });
    expect(result.current.isActive).toBe(true);
  });

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useIntervalFn(() => {}, 1000));
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });

  it('should update callback when it changes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const { rerender } = renderHook(({ cb }) => useIntervalFn(cb, 1000), {
      initialProps: { cb: callback1 },
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    rerender({ cb: callback2 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should handle dynamic interval value', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ interval }) => useIntervalFn(callback, interval),
      {
        initialProps: { interval: 1000 },
      }
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ interval: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle interval value as a function', () => {
    const callback = jest.fn();
    renderHook(() => useIntervalFn(callback, () => 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

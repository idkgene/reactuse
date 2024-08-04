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

  describe('basic functionality', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useInterval(1000));

      expect(result.current.counter).toBe(0);
      expect(result.current.isRunning).toBe(true);
    });

    it('should increment counter at specified interval', () => {
      const { result } = renderHook(() => useInterval(1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.counter).toBe(1);

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.counter).toBe(3);
    });

    it('should respect the immediate option', () => {
      const { result } = renderHook(() =>
        useInterval(1000, { immediate: false }),
      );

      expect(result.current.isRunning).toBe(false);
      expect(result.current.counter).toBe(0);

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.counter).toBe(0);
    });
  });

  describe('control functions', () => {
    it('should pause the interval', () => {
      const { result } = renderHook(() => useInterval(1000));

      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(result.current.counter).toBe(1);

      act(() => {
        result.current.pause();
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.counter).toBe(3);
      expect(result.current.isRunning).toBe(false);
    });

    it('should resume the interval', () => {
      const { result } = renderHook(() =>
        useInterval(1000, { immediate: false }),
      );

      expect(result.current.isRunning).toBe(false);

      act(() => {
        result.current.resume();
        vi.advanceTimersByTime(2500);
      });

      expect(result.current.counter).toBe(0);
      expect(result.current.isRunning).toBe(true);
    });

    it('should reset the counter', () => {
      const { result } = renderHook(() => useInterval(1000));

      act(() => {
        vi.advanceTimersByTime(2500);
        result.current.reset();
      });

      expect(result.current.counter).toBe(0);
    });

    it('should set the counter', () => {
      const { result } = renderHook(() => useInterval(1000));

      act(() => {
        result.current.setCounter(5);
      });

      expect(result.current.counter).toBe(5);

      expect(() => {
        act(() => {
          result.current.setCounter(-1);
        });
      }).toThrow('useInterval: counter value must be a non-negative number');
    });
  });

  describe('options', () => {
    it('should call the callback function on each interval', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(1000, { callback }));

      act(() => {
        vi.advanceTimersByTime(3500);
      });

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith(1);
      expect(callback).toHaveBeenCalledWith(2);
      expect(callback).toHaveBeenCalledWith(3);
    });

    it('should respect the maxCount option', () => {
      const { result } = renderHook(() => useInterval(1000, { maxCount: 3 }));

      act(() => {
        vi.advanceTimersByTime(4000);
      });

      expect(result.current.counter).toBe(3);
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should throw an error for invalid interval values', () => {
      expect(() => renderHook(() => useInterval(0))).toThrow(
        'useInterval: interval must be a positive number',
      );
      expect(() => renderHook(() => useInterval(-1000))).toThrow(
        'useInterval: interval must be a positive number',
      );
      expect(() =>
        renderHook(() => useInterval('1000' as unknown as never)),
      ).toThrow('useInterval: interval must be a positive number');
    });

    it('should handle errors in the callback function', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const callback = vi.fn().mockImplementation(() => {
        throw new Error('Callback error');
      });

      const { result } = renderHook(() => useInterval(1000, { callback }));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.counter).toBe(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'useInterval: Error in callback:',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('cleanup and side effects', () => {
    it('should clear the interval when component unmounts', () => {
      const { unmount } = renderHook(() => useInterval(1000));

      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('should update the interval when the interval prop changes', () => {
      const { rerender, result } = renderHook(
        ({ interval }) => useInterval(interval),
        {
          initialProps: { interval: 1000 },
        },
      );

      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(result.current.counter).toBe(1);

      rerender({ interval: 500 });

      act(() => {
        vi.advanceTimersByTime(750);
      });
      expect(result.current.counter).toBe(2);
    });
  });

  describe('performance and edge cases', () => {
    it('should handle very short intervals', () => {
      const { result } = renderHook(() => useInterval(1));

      act(() => {
        vi.advanceTimersByTime(10);
      });

      expect(result.current.counter).toBeGreaterThan(0);
    });

    it('should handle very long intervals', () => {
      const { result } = renderHook(() => useInterval(1000 * 60 * 60)); // 1 hour

      act(() => {
        vi.advanceTimersByTime(1000 * 60 * 60 * 2.5); // 2.5 hours
      });

      expect(result.current.counter).toBe(2);
    });
  });
});

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

  describe('basic functionality', () => {
    it('should call the callback at the specified interval', () => {
      const callback = vi.fn();
      renderHook(() => useIntervalFn(callback, 1000));

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should pause and resume the interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.pause();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.resume();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      console.log('Callback called times:', callback.mock.calls.length);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('options', () => {
    it('should handle immediate start option', () => {
      const callback = vi.fn();
      renderHook(() => useIntervalFn(callback, 1000, { immediate: false }));

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle immediate callback execution', () => {
      const callback = vi.fn();
      renderHook(() =>
        useIntervalFn(callback, 1000, { immediateCallback: true }),
      );

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('error handling', () => {
    it('should throw an error for invalid callback', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      expect(() =>
        renderHook(() =>
          useIntervalFn('not a function' as unknown as never, 1000),
        ),
      ).toThrow(TypeError);
      consoleErrorSpy.mockRestore();
    });

    it('should throw an error for invalid interval', () => {
      const callback = vi.fn();
      expect(() => renderHook(() => useIntervalFn(callback, -1000))).toThrow(
        RangeError,
      );
      expect(() =>
        renderHook(() => useIntervalFn(callback, () => -1000)),
      ).toThrow(RangeError);
    });
  });

  describe('dynamic interval', () => {
    it('should work with a function returning the interval', () => {
      const callback = vi.fn();
      const intervalFn = vi.fn(() => 2000);
      renderHook(() => useIntervalFn(callback, intervalFn));

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(intervalFn).toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('should clear the interval on unmount', () => {
      const callback = vi.fn();
      const { unmount } = renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      unmount();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle very short intervals', () => {
      const callback = vi.fn();
      renderHook(() => useIntervalFn(callback, 1));

      act(() => {
        vi.advanceTimersByTime(5);
      });

      expect(callback.mock.calls.length).toBeGreaterThan(1);
    });

    it('should handle very long intervals', () => {
      const callback = vi.fn();
      renderHook(() => useIntervalFn(callback, 1000000));

      act(() => {
        vi.advanceTimersByTime(999999);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid pause/resume calls', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        result.current.pause();
        result.current.resume();
        result.current.pause();
        result.current.resume();
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('callback error handling', () => {
    it('should catch and log errors in the callback', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const callback = vi.fn(() => {
        throw new Error('Test error');
      });

      renderHook(() => useIntervalFn(callback, 1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'useIntervalFn: Error in callback:',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });
});

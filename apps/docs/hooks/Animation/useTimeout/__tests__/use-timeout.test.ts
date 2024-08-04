import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, afterEach, vi, beforeEach } from 'vitest';
import { useTimeout } from '../use-timeout';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('basic functionality', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useTimeout(1000));

      expect(result.current.isReady).toBe(false);
      expect(result.current.isRunning).toBe(true);
    });

    it('should work with static interval', () => {
      const { result } = renderHook(() => useTimeout(1000));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(true);
    });

    it('should work with function interval', () => {
      const intervalFn = vi.fn().mockReturnValue(2000);
      const { result } = renderHook(() => useTimeout(intervalFn));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(true);
      expect(intervalFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('control functions', () => {
    it('should start the timer when start is called', () => {
      const { result } = renderHook(() =>
        useTimeout(1000, { autoStart: false }),
      );

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(true);
    });

    it('should stop the timer when stop is called', () => {
      const { result } = renderHook(() => useTimeout(1000));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        result.current.stop();
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);
    });

    it('should reset the timer when reset is called', () => {
      const { result } = renderHook(() => useTimeout(1000));

      act(() => {
        vi.advanceTimersByTime(500);
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.isRunning).toBe(true);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe('options', () => {
    it('should not auto-start when autoStart is false', () => {
      const { result } = renderHook(() =>
        useTimeout(1000, { autoStart: false }),
      );

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);
    });

    it('should call the callback when timeout is reached', () => {
      const callback = vi.fn();
      renderHook(() => useTimeout(1000, { callback }));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not auto-start when controls is true', () => {
      const { result } = renderHook(() => useTimeout(1000, { controls: true }));

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isReady).toBe(false);
    });
  });

  describe('error handling', () => {
    it.each([
      ['negative number', -1000],
      ['NaN', NaN],
      ['string', 'invalid' as unknown as number],
    ])(
      'should throw an error for invalid interval: %s',
      (_, invalidInterval) => {
        expect(() => {
          renderHook(() => useTimeout(invalidInterval));
        }).toThrow('Invalid interval value');
      },
    );

    it('should throw an error when function interval returns invalid value', () => {
      const invalidIntervalFn = vi.fn().mockReturnValue('invalid');
      expect(() => {
        renderHook(() => useTimeout(invalidIntervalFn));
      }).toThrow('Invalid interval value');
    });
  });

  describe('cleanup and side effects', () => {
    it('should clean up timeout on unmount', () => {
      const { unmount } = renderHook(() => useTimeout(1000));
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('should use the initial interval even when it changes', () => {
      const { rerender, result } = renderHook(
        ({ interval }) => useTimeout(interval),
        { initialProps: { interval: 1000 } },
      );

      act(() => {
        vi.advanceTimersByTime(500);
      });

      rerender({ interval: 2000 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.isReady).toBe(true);
      expect(result.current.isRunning).toBe(false);
    });

    it('should update callback when it changes', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const { rerender } = renderHook(
        ({ callback }) => useTimeout(1000, { callback }),
        { initialProps: { callback: callback1 } },
      );

      rerender({ callback: callback2 });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid start/stop calls', () => {
      const { result } = renderHook(() =>
        useTimeout(1000, { autoStart: false }),
      );

      act(() => {
        result.current.start();
        result.current.stop();
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.isReady).toBe(true);
    });

    it('should work with zero interval', () => {
      const { result } = renderHook(() => useTimeout(0));

      expect(result.current.isRunning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current.isReady).toBe(true);
      expect(result.current.isRunning).toBe(false);
    });
  });
});

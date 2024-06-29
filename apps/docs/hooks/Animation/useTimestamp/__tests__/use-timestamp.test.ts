import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, afterEach, vi } from 'vitest';
import { useTimestamp } from '../use-timestamp';

vi.useFakeTimers();

describe('useTimestamp', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should return the current timestamp by default', () => {
    const { result } = renderHook(() => useTimestamp());
    expect(typeof result.current).toBe('number');
  });

  it('should update the timestamp immediately by default', () => {
    const { result } = renderHook(() => useTimestamp());
    const initialTimestamp = result.current;
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBeGreaterThan(initialTimestamp);
  });

  it('should update the timestamp with the specified offset', () => {
    const offset = 1000;
    const { result } = renderHook(() => useTimestamp({ offset }));
    expect(result.current).toBeGreaterThanOrEqual(Date.now() + offset);
  });

  it('should not update the timestamp immediately when immediate is false', () => {
    const { result } = renderHook(() => useTimestamp({ immediate: false }));
    const initialTimestamp = result.current;
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(initialTimestamp);
  });

  it('should update the timestamp using the specified interval', () => {
    const interval = 1000;
    const { result } = renderHook(() => useTimestamp({ interval }));
    const initialTimestamp = result.current;
    act(() => {
      vi.advanceTimersByTime(interval);
    });
    expect(result.current).toBeGreaterThan(initialTimestamp);
  });

  it('should call the callback function on each update', () => {
    const callback = vi.fn();
    renderHook(() => useTimestamp({ callback }));
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalled();
  });

  it('should return timestamp and controls when controls option is true', () => {
    const { result } = renderHook(() => useTimestamp({ controls: true }));
    expect(result.current).toHaveProperty('timestamp');
    expect(result.current).toHaveProperty('pause');
    expect(result.current).toHaveProperty('resume');
  });

  it('should pause and resume the timestamp updates', () => {
    const { result } = renderHook(() => useTimestamp({ controls: true }));
    const initialTimestamp = result.current.timestamp;
    act(() => {
      result.current.pause();
      vi.advanceTimersByTime(100);
    });
    expect(result.current.timestamp).toBe(initialTimestamp);
    act(() => {
      result.current.resume();
      setTimeout(() => {
        expect(result.current.timestamp).toBeGreaterThan(initialTimestamp);
      }, 100);
    });
  });
});

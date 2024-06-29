import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';
import useMemory from './useMemory';

describe('useMemory', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(global, 'clearInterval');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return isSupported as true if performance.memory is available', () => {
    const originalPerformance = window.performance;
    window.performance = {
      memory: {
        jsHeapSizeLimit: 1000,
        totalJSHeapSize: 500,
        usedJSHeapSize: 200,
      },
    } as any;

    const { result } = renderHook(() => useMemory());

    expect(result.current.isSupported).toBe(true);

    window.performance = originalPerformance;
  });

  it('should return isSupported as false if performance.memory is not available', () => {
    const { result } = renderHook(() => useMemory());

    expect(result.current.isSupported).toBe(false);
  });

  it('should return memory data if supported and immediate is true', () => {
    const originalPerformance = window.performance;
    window.performance = {
      memory: {
        jsHeapSizeLimit: 1000,
        totalJSHeapSize: 500,
        usedJSHeapSize: 200,
      },
    } as any;

    const { result } = renderHook(() => useMemory({ immediate: true }));

    expect(result.current.memory).toEqual({
      jsHeapSizeLimit: 1000,
      totalJSHeapSize: 500,
      usedJSHeapSize: 200,
    });

    window.performance = originalPerformance;
  });

  it('should update memory data at the specified interval if supported', () => {
    const originalPerformance = window.performance;
    window.performance = {
      memory: {
        jsHeapSizeLimit: 1000,
        totalJSHeapSize: 500,
        usedJSHeapSize: 200,
      },
    } as any;

    const { result } = renderHook(() =>
      useMemory({ interval: 1000, immediate: false }),
    );

    expect(result.current.memory).toBeUndefined();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.memory).toEqual({
      jsHeapSizeLimit: 1000,
      totalJSHeapSize: 500,
      usedJSHeapSize: 200,
    });

    window.performance = originalPerformance;
  });

  it('should clear the interval when the component unmounts', () => {
    const originalPerformance = window.performance;
    window.performance = {
      memory: {
        jsHeapSizeLimit: 1000,
        totalJSHeapSize: 500,
        usedJSHeapSize: 200,
      },
    } as any;

    const { unmount } = renderHook(() => useMemory({ interval: 1000 }));

    unmount();

    expect(clearInterval).toHaveBeenCalled();

    window.performance = originalPerformance;
  });
});

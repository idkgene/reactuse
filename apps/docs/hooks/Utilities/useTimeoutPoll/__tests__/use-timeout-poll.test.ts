import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useTimeoutPoll } from '../use-timeout-poll';

vi.useFakeTimers();

describe('useTimeoutPoll', () => {
  it('should call the function at specified intervals', async () => {
    const mockFn = vi.fn().mockResolvedValue(undefined);
    renderHook(() => useTimeoutPoll(mockFn, 1000));

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should pause and resume polling', async () => {
    const mockFn = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useTimeoutPoll(mockFn, 1000));

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.pause();
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.resume();
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should not start immediately if immediate is false', () => {
    const mockFn = vi.fn().mockResolvedValue(undefined);
    renderHook(() => useTimeoutPoll(mockFn, 1000, { immediate: false }));

    expect(mockFn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockFn).not.toHaveBeenCalled();
  });
});

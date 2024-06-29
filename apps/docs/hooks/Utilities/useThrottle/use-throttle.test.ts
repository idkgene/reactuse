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
import { useThrottle } from './use-throttle';

describe('useThrottle', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return the initial value', () => {
    const { result } = renderHook(() => useThrottle(1));
    expect(result.current).toBe(1);
  });

  it('should throttle the value', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value), {
      initialProps: {
        value: 1,
      },
    });

    expect(result.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(2);
  });

  it('should throttle the value with custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 1, delay: 500 },
      },
    );

    expect(result.current).toBe(1);

    rerender({ value: 2, delay: 500 });
    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(2);
  });

  it('should update the value immediately if delay has passed', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBe(1);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 2 });
    expect(result.current).toBe(2);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 3 });
    expect(result.current).toBe(3);
  });

  it('should clear the timeout on unmount', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useThrottle(value),
      {
        initialProps: { value: 1 },
      },
    );

    expect(result.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    unmount();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(1);
  });
});

import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTimeAgo } from './use-time-ago';

describe('useTimeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "just now" for the recent dates', () => {
    const { result } = renderHook(() => useTimeAgo(new Date()));
    expect(result.current).toBe('just now');
  });

  it('should handle past dates', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000); // 5 min ago;
    const { result } = renderHook(() => useTimeAgo(date));
    expect(result.current).toBe('5 minutes ago');
  });

  it('should handle future dates', () => {
    const date = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour in the future
    const { result } = renderHook(() => useTimeAgo(date));
    expect(result.current).toBe('in 1 hour');
  });

  it('should update over time', () => {
    const date = new Date();
    const { result, rerender } = renderHook(() => useTimeAgo(date));

    expect(result.current).toBe('just now');

    act(() => {
      vi.advanceTimersByTime(2 * 60 * 1000); // Advance 2 minutes
    });

    rerender();
    expect(result.current).toBe('2 minutes ago');
  });

  it('should handle custom messages', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const customMessages = {
      past: (value: string | number) => `${value} in the past`,
    };
    const { result } = renderHook(() =>
      useTimeAgo(date, { messages: customMessages }),
    );
    expect(result.current).toBe('5 minutes in the past');
  });

  it('should use fullDateFormatter when diff exceeds max', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const fullDateFormatter = (date: Date) => date.toISOString();
    const { result } = renderHook(() =>
      useTimeAgo(date, { max: 'hour', fullDateFormatter }),
    );
    expect(result.current).toBe(date.toISOString());
  });

  it('should handle invalid dates', () => {
    const { result } = renderHook(() => useTimeAgo('invalid date'));
    expect(result.current).toBe('invalid date');
  });

  it('should handle different rounding options', () => {
    const date = new Date(Date.now() - 1.6 * 60 * 1000); // 1.6 minutes ago
    const { result: resultRound } = renderHook(() =>
      useTimeAgo(date, { rounding: 'round' }),
    );
    expect(resultRound.current).toBe('2 minutes ago');

    const { result: resultFloor } = renderHook(() =>
      useTimeAgo(date, { rounding: 'floor' }),
    );
    expect(resultFloor.current).toBe('1 minute ago');

    const { result: resultCeil } = renderHook(() =>
      useTimeAgo(date, { rounding: 'ceil' }),
    );
    expect(resultCeil.current).toBe('2 minutes ago');

    const { result: resultCustom } = renderHook(() =>
      useTimeAgo(date, { rounding: 10 }),
    );
    expect(resultCustom.current).toBe('1.6 minutes ago');
  });

  it('should handle showSecond option', () => {
    const date = new Date(Date.now() - 30 * 1000); // 30 seconds ago
    const { result } = renderHook(() => useTimeAgo(date, { showSecond: true }));
    expect(result.current).toBe('30 seconds ago');
  });

  it('should handle updateInterval option', () => {
    const date = new Date();
    const { result, rerender } = renderHook(() =>
      useTimeAgo(date, { updateInterval: 1000, showSecond: true }),
    );

    expect(result.current).toBe('just now');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    rerender(); // Force a re-render
    expect(result.current).toBe('1 second ago');
  });

  it('should handle max as a number', () => {
    const date = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    const fullDateFormatter = (date: Date) => date.toISOString();
    const { result } = renderHook(() =>
      useTimeAgo(date, { max: 60 * 60 * 1000, fullDateFormatter }),
    );
    expect(result.current).toBe(date.toISOString());
  });

  it('should handle all time units', () => {
    const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
    const multipliers = [
      1000,
      60 * 1000,
      60 * 60 * 1000,
      24 * 60 * 60 * 1000,
      7 * 24 * 60 * 60 * 1000,
      30 * 24 * 60 * 60 * 1000,
      365 * 24 * 60 * 60 * 1000,
    ];

    units.forEach((unit, index) => {
      const date = new Date(Date.now() - multipliers[index]);
      const { result } = renderHook(() =>
        useTimeAgo(date, { showSecond: true }),
      );
      expect(result.current).toBe(`1 ${unit} ago`);
    });
  });

  it('should handle custom messages for all units', () => {
    const customMessages = {
      second: (n: number) => `${n}s`,
      minute: (n: number) => `${n}m`,
      hour: (n: number) => `${n}h`,
      day: (n: number) => `${n}d`,
      week: (n: number) => `${n}w`,
      month: (n: number) => `${n}mo`,
      year: (n: number) => `${n}y`,
    };

    const date = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    const { result } = renderHook(() =>
      useTimeAgo(date, { messages: customMessages }),
    );
    expect(result.current).toBe('2h ago');
  });

  it('should handle string-based custom messages', () => {
    const customMessages = {
      past: '{0} in the past',
      future: '{0} in the future',
      justNow: 'right now',
    };

    const pastDate = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const futureDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in the future

    const { result: pastResult } = renderHook(() =>
      useTimeAgo(pastDate, { messages: customMessages }),
    );
    expect(pastResult.current).toBe('5 minutes in the past');

    const { result: futureResult } = renderHook(() =>
      useTimeAgo(futureDate, { messages: customMessages }),
    );
    expect(futureResult.current).toBe('5 minutes in the future');

    const { result: nowResult } = renderHook(() =>
      useTimeAgo(new Date(), { messages: customMessages }),
    );
    expect(nowResult.current).toBe('right now');
  });
});

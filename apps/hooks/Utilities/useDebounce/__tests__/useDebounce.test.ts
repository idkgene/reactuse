import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';
import {
  expect,
  it,
  describe,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from 'vitest';

describe('useDebounce', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return the initial value without debounce', () => {
    const { result } = renderHook(() => useDebounce('initial'));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value with default options', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).not.toBe('initial');
    expect(result.current).toBe('updated');
  });

  it('should debounce the value with custom wait time', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { wait: 500 }),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated');
  });

  it('should update the value immediately on leading edge', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { wait: 500, leading: true }),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('updated');

    act(() => {
      vi.runAllTimers();
    });
    expect(result.current).toBe('updated');
  });

  it('should not update the value on trailing edge when trailing is false', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { wait: 500, trailing: false }),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.runAllTimers();
    });
    expect(result.current).toBe('initial');
  });

  it('should update the value immediately when wait is 0', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { wait: 0 }),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('updated');
  });
});

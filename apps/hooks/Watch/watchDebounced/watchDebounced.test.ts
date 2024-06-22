import { renderHook, act } from '@testing-library/react';
import {
  useDebouncedWatch,
  isObject,
  deepEqual,
  usePrevious,
} from './watchDebounced';
import {
  expect,
  it,
  describe,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from 'vitest';

describe('useDebouncedWatch', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should trigger the callback immediately when immediate is true', () => {
    const callback = vi.fn();
    const value = { foo: 'bar' };
    renderHook(() => useDebouncedWatch(value, callback, { immediate: true }));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(value, undefined);
  });

  it('should trigger the callback when the value changes', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useDebouncedWatch(value, callback),
      {
        initialProps: { value: 'initial' },
      },
    );
    expect(callback).not.toHaveBeenCalled();

    rerender({ value: 'updated' });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('updated', 'initial');
  });

  it('should debounce the callback when debounce option is provided', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useDebouncedWatch(value, callback, { debounce: 100 }),
      {
        initialProps: { value: 'initial' },
      },
    );
    expect(callback).not.toHaveBeenCalled();

    rerender({ value: 'updated' });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('updated', 'initial');
  });

  it('should trigger the callback with the latest value when maxWait is reached', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ value }) =>
        useDebouncedWatch(value, callback, { debounce: 100, maxWait: 200 }),
      {
        initialProps: { value: 'initial' },
      },
    );
    expect(callback).not.toHaveBeenCalled();

    rerender({ value: 'updated1' });
    rerender({ value: 'updated2' });
    rerender({ value: 'updated3' });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('updated3', 'initial');
  });

  it('should perform deep equality check when deep option is true', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useDebouncedWatch(value, callback, { deep: true }),
      {
        initialProps: { value: { foo: 'bar' } },
      },
    );
    expect(callback).not.toHaveBeenCalled();

    rerender({ value: { foo: 'bar' } });
    expect(callback).not.toHaveBeenCalled();

    rerender({ value: { foo: 'baz' } });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ foo: 'baz' }, { foo: 'bar' });
  });

  it('should handle source as a function', () => {
    const callback = vi.fn();
    let value = 'initial';
    const { rerender } = renderHook(() =>
      useDebouncedWatch(() => value, callback),
    );
    expect(callback).not.toHaveBeenCalled();

    value = 'updated';
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('updated', 'initial');
  });

  it('should return a cleanup function', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedWatch('value', callback));
    const cleanup = result.current;
    expect(typeof cleanup).toBe('function');
  });
});

describe('usePrevious', () => {
  it('should return the previous value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'initial' },
    });
    expect(result.current).toBeUndefined();

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');
  });
});

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject({ foo: 'bar' })).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(true)).toBe(false);
  });
});

describe('deepEqual', () => {
  it('should return true for deeply equal objects', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual({ foo: 'bar' }, { foo: 'bar' })).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual({ foo: { bar: 'baz' } }, { foo: { bar: 'baz' } })).toBe(
      true,
    );
  });

  it('should return false for non-deeply equal objects', () => {
    expect(deepEqual({}, { foo: 'bar' })).toBe(false);
    expect(deepEqual({ foo: 'bar' }, { foo: 'baz' })).toBe(false);
    expect(deepEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
    expect(deepEqual({ foo: { bar: 'baz' } }, { foo: { bar: 'qux' } })).toBe(
      false,
    );
  });

  it('should return true for equal primitive values', () => {
    expect(deepEqual(42, 42)).toBe(true);
    expect(deepEqual('string', 'string')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  it('should return false for non-equal primitive values', () => {
    expect(deepEqual(42, 43)).toBe(false);
    expect(deepEqual('string', 'other')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
  });
});

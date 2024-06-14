import { renderHook } from '@testing-library/react';
import {
  watch,
  Source,
  WatchCallback,
  usePrevious,
  isObject,
  deepEqual,
  getSourceValue,
} from './watch';

describe('usePrevious', () => {
  it('should return undefined on the first render', () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });

  it('should return the previous  value on subsequent renders', () => {
    const { result, rerender } = renderHook(
      (value: number) => usePrevious(value),
      {
        initialProps: 1,
      }
    );

    rerender(2);
    expect(result.current).toBe(1);

    rerender(3);
    expect(result.current).toBe(2);
  });
});

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject({ key: 'value' })).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(true)).toBe(false);
  });
});

describe('deepEqual', () => {
  it('should return true for equal primitive values', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('string', 'string')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('string1', 'string2')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
  });

  it('should return true for equal objects', () => {
    expect(deepEqual({ a: 1, b: 'string' }, { a: 1, b: 'string' })).toBe(true);
    expect(deepEqual([1, 'string'], [1, 'string'])).toBe(true);
  });

  it('should return false for different objects', () => {
    expect(deepEqual({ a: 1, b: 'string' }, { a: 2, b: 'string' })).toBe(false);
    expect(deepEqual([1, 'string'], [2, 'string'])).toBe(false);
  });

  it('should return false for objects with different keys', () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it('should return true for deeply equal objects', () => {
    expect(
      deepEqual({ a: 1, b: { c: 'string' } }, { a: 1, b: { c: 'string' } })
    ).toBe(true);
  });

  it('should return false for deeply different objects', () => {
    expect(
      deepEqual({ a: 1, b: { c: 'string' } }, { a: 1, b: { c: 'different' } })
    ).toBe(false);
  });

  describe('getSourceValue', () => {
    it('should return the value if source is not a function', () => {
      expect(getSourceValue(1, false)).toBe(1);
      expect(getSourceValue('string', false)).toBe('string');
      expect(getSourceValue({ a: 1 }, false)).toEqual({ a: 1 });
    });

    it('should call the function and return the result if source is a function', () => {
      const func = () => 1;
      expect(getSourceValue(func, false)).toBe(1);
    });

    it('should return a deep copy of the value if deep is true', () => {
      const obj = { a: 1 };
      const result = getSourceValue(obj, true);
      expect(result).toEqual(obj);
      expect(result).not.toBe(obj);
    });
  });

  describe('watch', () => {
    it('should call the callback with the initial value if immediate is true', () => {
      const callback: WatchCallback<number> = jest.fn();
      renderHook(() =>
        watch(1, callback, {
          immediate: true,
        })
      );
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(1, undefined);
    }); 

    it('should not call the callback with the initial value if immediate is false', () => {
      const callback: WatchCallback<number> = jest.fn();
      renderHook(() => watch(1, callback));
      expect(callback).not.toHaveBeenCalled();
    });

    it('should call the callback when the source value changes', () => {
      const callback: WatchCallback<number> = jest.fn();
      const { rerender } = renderHook(
        (source: Source<number>) => watch(source, callback),
        { initialProps: 1 }
      );

      rerender(2);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(2, 1);
    });

    it('should not call the callback when the source value does not change', () => {
      const callback: WatchCallback<number> = jest.fn();
      const { rerender } = renderHook(
        (source: Source<number>) => watch(source, callback),
        { initialProps: 1 }
      );

      rerender(1);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should call the callback when the source function returns a new value', () => {
      const callback: WatchCallback<number> = jest.fn();
      const source = jest.fn().mockReturnValue(1);
      const { rerender } = renderHook(() => watch(source, callback));

      source.mockReturnValue(2);
      rerender();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(2, 1);
    });

    it('should not call the callback when the source function returns the same value', () => {
      const callback: WatchCallback<number> = jest.fn();
      const source = jest.fn().mockReturnValue(1);
      const { rerender } = renderHook(() => watch(source, callback));

      rerender();
      expect(callback).not.toHaveBeenCalled();
    });

    it('should perform a deep comparison if deep is true', () => {
      const callback: WatchCallback<{ a: number }> = jest.fn();
      const { rerender } = renderHook(
        (source: Source<{ a: number }>) =>
          watch(source, callback, { deep: true }),
        { initialProps: { a: 1 } }
      );

      rerender({ a: 2 });
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({ a: 2 }, { a: 1 });
    });

    it('should not call the callback if both deep and shallow comparison return false (objects with same values)', () => {
      const callback: WatchCallback<{ a: number }> = jest.fn();
      const { rerender } = renderHook(
        (source: Source<{ a: number }>) =>
          watch(source, callback, { deep: true }),
        { initialProps: { a: 1 } }
      );

      rerender({ a: 1 });
      expect(callback).not.toHaveBeenCalled();
    });

    it('should not call the callback when the source value does not change', () => {
      const source: Source<number> = 1;
      const callback: jest.Mock<WatchCallback<number>> = jest.fn();

      const { rerender } = renderHook(() => watch(source, callback));

      expect(callback).not.toHaveBeenCalled();

      rerender();

      expect(callback).not.toHaveBeenCalled();
    });
  });
});

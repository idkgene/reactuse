import { renderHook } from '@testing-library/react';
import { useArrayReduce } from '../useArrayReduce';
import { expect, it, describe } from 'vitest';

describe('useArrayReduce', () => {
  it('should return the initial value when list is not an array', () => {
    const { result } = renderHook(() =>
      useArrayReduce('not an array' as any, (a: any, b: any) => a + b, 0),
    );
    expect(result.current).toBe(0);
  });

  it('should return the initial value when list is empty', () => {
    const { result } = renderHook(() =>
      useArrayReduce([], (a: number, b: number) => a + b, 10),
    );
    expect(result.current).toBe(10);
  });

  it('should return the initial value when reducer is not a function', () => {
    const { result } = renderHook(() =>
      useArrayReduce([1, 2, 3], 'not a function' as any, 5),
    );
    expect(result.current).toBe(5);
  });

  it('should reduce the array using the provided reducer function', () => {
    const numbers = [1, 2, 3, 4];
    const { result } = renderHook(() =>
      useArrayReduce(
        numbers,
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      ),
    );
    expect(result.current).toBe(10);
  });

  it('should handle different data types in the array', () => {
    const mixedArray = [1, 'hello', true];
    const { result } = renderHook(() =>
      useArrayReduce(
        mixedArray,
        (accumulator: string, currentValue: any) =>
          accumulator + String(currentValue),
        '',
      ),
    );
    expect(result.current).toBe('1hellotrue');
  });

  it('should memoize the result when dependencies are the same', () => {
    const numbers = [1, 2, 3, 4];
    const { result, rerender } = renderHook(() =>
      useArrayReduce(
        numbers,
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      ),
    );

    const firstResult = result.current;
    rerender();
    expect(result.current).toBe(firstResult);
  });
});

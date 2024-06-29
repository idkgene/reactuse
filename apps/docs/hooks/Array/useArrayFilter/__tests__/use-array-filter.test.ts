import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useArrayFilter } from '../use-array-filter';

describe('useArrayFilter', () => {
  it('should return an empty array when list is empty', () => {
    const { result } = renderHook(() => useArrayFilter([], () => true));
    expect(result.current).toEqual([]);
  });

  it('should return an empty array when predicate is not a function', () => {
    const { result } = renderHook(() => useArrayFilter([1, 2, 3], null as any));
    expect(result.current).toEqual([]);
  });

  it('should filter an array based on the provided predicate function', () => {
    const numbers = [1, 2, 3, 4, 5];
    const isEven = (number: number) => number % 2 === 0;
    const { result } = renderHook(() => useArrayFilter(numbers, isEven));
    expect(result.current).toEqual([2, 4]);
  });

  it('should return a new array instance when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ numbers, predicate }) => useArrayFilter(numbers, predicate),
      {
        initialProps: {
          numbers: [1, 2, 3, 4, 5],
          predicate: (number: number) => number % 2 === 0,
        },
      },
    );

    const firstResult = result.current;

    rerender({
      numbers: [1, 2, 3, 4, 5],
      predicate: (number: number) => number > 2,
    });

    expect(result.current).not.toBe(firstResult);
    expect(result.current).toEqual([3, 4, 5]);
  });

  it('should handle complex objects', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 15 },
    ];

    const isAdult = (user: { name: string; age: number }) => user.age >= 18;

    const { result } = renderHook(() => useArrayFilter(users, isAdult));

    expect(result.current).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ]);
  });

  it('should memoize the result when dependencies are the same', () => {
    const numbers = [1, 2, 3, 4, 5];
    const isEven = (number: number) => number % 2 === 0;

    const { result, rerender } = renderHook(() =>
      useArrayFilter(numbers, isEven),
    );

    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});

import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useArrayFindIndex } from '../useArrayFindIndex';

describe('useArrayFindIndex', () => {
  it('should return -1 when list is empty', () => {
    const { result } = renderHook(() => useArrayFindIndex([], () => true));
    expect(result.current).toBe(-1);
  });

  it('should return -1 when predicate is not a function', () => {
    const { result } = renderHook(() =>
      useArrayFindIndex([1, 2, 3], null as any),
    );
    expect(result.current).toBe(-1);
  });

  it('should return -1 when no element satisfies the predicate', () => {
    const numbers = [1, 2, 3, 4, 5];
    const isEven = (number: number) => number > 5;
    const { result } = renderHook(() => useArrayFindIndex(numbers, isEven));
    expect(result.current).toBe(-1);
  });

  it('should find the index of the first element that satisfies the predicate', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const findUserIndexById = (user: { id: number; name: string }) =>
      user.id === 2;
    const { result } = renderHook(() =>
      useArrayFindIndex(users, findUserIndexById),
    );
    expect(result.current).toBe(1);
  });

  it('should return a new index when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ users, predicate }) => useArrayFindIndex(users, predicate),
      {
        initialProps: {
          users: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
          ],
          predicate: (user: { id: number; name: string }) => user.id === 2,
        },
      },
    );

    const firstResult = result.current;

    rerender({
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
      predicate: (user: { id: number; name: string }) => user.id === 1,
    });

    expect(result.current).not.toBe(firstResult);
    expect(result.current).toBe(0);
  });

  it('should memoize the result when dependencies are the same', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const findUserIndexById = (user: { id: number; name: string }) =>
      user.id === 2;

    const { result, rerender } = renderHook(() =>
      useArrayFindIndex(users, findUserIndexById),
    );

    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});

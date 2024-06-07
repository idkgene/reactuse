import { renderHook } from '@testing-library/react';
import { useArrayFindLast } from '../useArrayFindLast';

describe('useArrayFindLast', () => {
  it('should return undefined when list is empty', () => {
    const { result } = renderHook(() => useArrayFindLast([], () => true));
    expect(result.current).toBeUndefined();
  });

  it('should return undefined when predicate is not a function', () => {
    const { result } = renderHook(() =>
      useArrayFindLast([1, 2, 3], null as any)
    );
    expect(result.current).toBeUndefined();
  });

  it('should return undefined when no element satisfies the predicate', () => {
    const numbers = [1, 2, 3, 4, 5];
    const isGreaterThanFive = (number: number) => number > 5;
    const { result } = renderHook(() =>
      useArrayFindLast(numbers, isGreaterThanFive)
    );
    expect(result.current).toBeUndefined();
  });

  it('should find the last element that satisfies the predicate', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const findLastUserByName = (user: { id: number; name: string }) =>
      user.name.startsWith('B');
    const { result } = renderHook(() =>
      useArrayFindLast(users, findLastUserByName)
    );
    expect(result.current).toEqual({ id: 2, name: 'Bob' });
  });

  it('should return a new reference when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ users, predicate }) => useArrayFindLast(users, predicate),
      {
        initialProps: {
          users: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
          ],
          predicate: (user: { id: number; name: string }) =>
            user.name.startsWith('B'),
        },
      }
    );

    const firstResult = result.current;

    rerender({
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ],
      predicate: (user: { id: number; name: string }) =>
        user.name.startsWith('C'),
    });

    expect(result.current).not.toBe(firstResult);
    expect(result.current).toEqual({ id: 3, name: 'Charlie' });
  });

  it('should memoize the result when dependencies are the same', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const findLastUserByName = (user: { id: number; name: string }) =>
      user.name.startsWith('B');
    const { result, rerender } = renderHook(() =>
      useArrayFindLast(users, findLastUserByName)
    );

    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});

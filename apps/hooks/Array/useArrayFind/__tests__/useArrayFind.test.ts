import { renderHook } from '@testing-library/react';
import { useArrayFind } from '../useArrayFind';
import { expect, it, describe } from 'vitest';

describe('useArrayFind', () => {
  it('should return undefined when list is empty', () => {
    const { result } = renderHook(() => useArrayFind([], () => true));
    expect(result.current).toBeUndefined();
  });

  it('should return undefined when predicate is not a function', () => {
    const { result } = renderHook(() => useArrayFind([1, 2, 3], null as any));
    expect(result.current).toBeUndefined();
  });

  it('should find the first element that satisfies the predicate', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const findUserById = (user: { id: number; name: string }) => user.id === 2;
    const { result } = renderHook(() => useArrayFind(users, findUserById));
    expect(result.current).toEqual({ id: 2, name: 'Bob' });
  });

  it('should return a new reference when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ users, predicate }) => useArrayFind(users, predicate),
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
    expect(result.current).toEqual({ id: 1, name: 'Alice' });
  });

  it('should memoize the result when dependencies are the same', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const findUserById = (user: { id: number; name: string }) => user.id === 2;

    const { result, rerender } = renderHook(() =>
      useArrayFind(users, findUserById),
    );

    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});

import { renderHook, act } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { useCycleList } from '../use-cycle-list';

describe('useCycleList', () => {
  it('should cycle through a list of items', () => {
    const { result } = renderHook(() =>
      useCycleList(['apple', 'banana', 'orange']),
    );

    expect(result.current.state).toBe('apple');
    expect(result.current.index).toBe(0);

    act(() => {
      result.current.next();
    });

    expect(result.current.state).toBe('banana');
    expect(result.current.index).toBe(1);

    act(() => {
      result.current.next();
    });

    expect(result.current.state).toBe('orange');
    expect(result.current.index).toBe(2);

    act(() => {
      result.current.next();
    });

    expect(result.current.state).toBe('apple');
    expect(result.current.index).toBe(0);
  });

  it('should cycle through a list of items in reverse', () => {
    const { result } = renderHook(() =>
      useCycleList(['apple', 'banana', 'orange']),
    );

    expect(result.current.state).toBe('apple');
    expect(result.current.index).toBe(0);

    act(() => {
      result.current.prev();
    });

    expect(result.current.state).toBe('orange');
    expect(result.current.index).toBe(2);

    act(() => {
      result.current.prev();
    });

    expect(result.current.state).toBe('banana');
    expect(result.current.index).toBe(1);

    act(() => {
      result.current.prev();
    });

    expect(result.current.state).toBe('apple');
    expect(result.current.index).toBe(0);
  });

  it('should go to a specific index', () => {
    const { result } = renderHook(() =>
      useCycleList(['apple', 'banana', 'orange']),
    );

    expect(result.current.state).toBe('apple');
    expect(result.current.index).toBe(0);

    act(() => {
      result.current.go(2);
    });

    expect(result.current.state).toBe('orange');
    expect(result.current.index).toBe(2);
  });

  it('should handle initial value', () => {
    const { result } = renderHook(() =>
      useCycleList(['apple', 'banana', 'orange'], { initialValue: 'banana' }),
    );

    expect(result.current.state).toBe('banana');
    expect(result.current.index).toBe(1);
  });

  it('should handle fallback index', () => {
    const { result } = renderHook(() =>
      useCycleList(['apple', 'banana', 'orange'], { fallbackIndex: 2 }),
    );

    expect(result.current.state).toBe('orange');
    expect(result.current.index).toBe(2);
  });

  it('should handle custom getIndexOf', () => {
    const { result } = renderHook(() =>
      useCycleList(
        [
          { id: 1, value: 'apple' },
          { id: 2, value: 'banana' },
        ],
        {
          initialValue: { id: 2, value: 'banana' },
          getIndexOf: (value, list) =>
            list.findIndex((item) => item.id === value.id),
        },
      ),
    );

    expect(result.current.state).toEqual({ id: 2, value: 'banana' });
    expect(result.current.index).toBe(1);
  });

  it('should handle empty list', () => {
    const { result } = renderHook(() => useCycleList([]));

    expect(result.current.state).toBe(undefined);
    expect(result.current.index).toBe(-1);
  });
});

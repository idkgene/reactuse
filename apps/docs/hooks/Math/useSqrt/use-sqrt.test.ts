import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSqrt } from './use-sqrt';

describe('useSqrt', () => {
  it('should initialize with the default value', () => {
    const { result } = renderHook(() => useSqrt());
    expect(result.current.value).toBe(0);
    expect(result.current.sqrt()).toBe(0);
  });

  it('should initialize with a custom value', () => {
    const { result } = renderHook(() => useSqrt({ initialValue: 16 }));
    expect(result.current.value).toBe(16);
    expect(result.current.sqrt()).toBe(4);
  });

  it('should update value and sqrt when setValue is called', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(25);
    });
    expect(result.current.value).toBe(25);
    expect(result.current.sqrt()).toBe(5);
  });

  it('should throw an error for negative numbers', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(-4);
    });
    expect(result.current.value).toBe(-4);
    expect(() => result.current.sqrt()).toThrow(
      'Cannot calculate square root of a negative number: -4',
    );
  });

  it('should ignore non-finite numbers', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(16);
    });
    act(() => {
      result.current.setValue(NaN);
    });
    expect(result.current.value).toBe(16);
    expect(result.current.sqrt()).toBe(4);

    act(() => {
      result.current.setValue(Infinity);
    });
    expect(result.current.value).toBe(16);
    expect(result.current.sqrt()).toBe(4);
  });

  it('should handle setValue with function', () => {
    const { result } = renderHook(() => useSqrt({ initialValue: 9 }));
    act(() => {
      result.current.setValue((prev) => prev * 2);
    });
    expect(result.current.value).toBe(18);
    expect(result.current.sqrt()).toBeCloseTo(4.24264, 5);
  });

  it('should handle very small positive numbers', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(1e-10);
    });
    expect(result.current.value).toBe(1e-10);
    expect(result.current.sqrt()).toBeCloseTo(1e-5, 10);
  });

  it('should handle very large positive numbers', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(1e20);
    });
    expect(result.current.value).toBe(1e20);
    expect(result.current.sqrt()).toBe(1e10);
  });

  it('should handle zero', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(0);
    });
    expect(result.current.value).toBe(0);
    expect(result.current.sqrt()).toBe(0);
  });

  it('should handle multiple setValue calls', () => {
    const { result } = renderHook(() => useSqrt());
    act(() => {
      result.current.setValue(4);
    });
    expect(result.current.value).toBe(4);
    expect(result.current.sqrt()).toBe(2);

    act(() => {
      result.current.setValue(9);
    });
    expect(result.current.value).toBe(9);
    expect(result.current.sqrt()).toBe(3);

    act(() => {
      result.current.setValue(-1);
    });
    expect(result.current.value).toBe(-1);
    expect(() => result.current.sqrt()).toThrow(
      'Cannot calculate square root of a negative number: -1',
    );
  });

  it('should memoize the sqrt function', () => {
    const { result, rerender } = renderHook(() =>
      useSqrt({ initialValue: 16 }),
    );
    const initialSqrtFunction = result.current.sqrt;

    rerender();
    expect(result.current.sqrt).toBe(initialSqrtFunction);

    act(() => {
      result.current.setValue(25);
    });
    expect(result.current.sqrt).not.toBe(initialSqrtFunction);
  });

  it('should memoize the result object', () => {
    const { result, rerender } = renderHook(() => useSqrt());
    const initialResult = result.current;

    rerender();
    expect(result.current).toBe(initialResult);

    act(() => {
      result.current.setValue(4);
    });
    expect(result.current).not.toBe(initialResult);
  });
});

import { renderHook, act } from '@testing-library/react';
import { useCeil } from '../useCeil';
import { expect, it, describe, vi } from 'vitest';

describe('useCeil', () => {
  it('should round up a positive number', () => {
    const { result } = renderHook(() => useCeil(4.2));
    expect(result.current).toBe(5);
  });

  it('should round up a negative number', () => {
    const { result } = renderHook(() => useCeil(-4.2));
    expect(result.current).toBe(-4);
  });

  it('should return the same value for an integer', () => {
    const { result } = renderHook(() => useCeil(7));
    expect(result.current).toBe(7);
  });

  it('should handle a value of 0', () => {
    const { result } = renderHook(() => useCeil(0));
    expect(result.current).toBe(0);
  });

  it('should handle a value of Infinity', () => {
    const { result } = renderHook(() => useCeil(Infinity));
    expect(result.current).toBe(Infinity);
  });

  it('should handle a value of -Infinity', () => {
    const { result } = renderHook(() => useCeil(-Infinity));
    expect(result.current).toBe(-Infinity);
  });

  it('should handle a value of NaN', () => {
    const { result } = renderHook(() => useCeil(NaN));
    expect(result.current).toBe(NaN);
  });

  it('should update the rounded value when the input value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useCeil(value), {
      initialProps: { value: 3.7 },
    });

    expect(result.current).toBe(4);

    act(() => {
      rerender({ value: 6.1 });
    });

    expect(result.current).toBe(7);
  });

  it('should handle a getter function as input', () => {
    const { result } = renderHook(() => useCeil(() => 5.8));
    expect(result.current).toBe(6);
  });

  it('should memoize the rounded value', () => {
    const getter = vi.fn(() => 2.3);
    const { result, rerender } = renderHook(() => useCeil(getter));

    expect(result.current).toBe(3);
    expect(getter).toHaveBeenCalledTimes(1);

    rerender();

    expect(result.current).toBe(3);
    expect(getter).toHaveBeenCalledTimes(1);
  });
});

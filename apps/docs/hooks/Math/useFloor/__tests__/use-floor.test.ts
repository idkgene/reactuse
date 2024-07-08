import { renderHook } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { type Resolvable, useFloor } from '../use-floor';

describe('useFloor', () => {
  it('should floor a positive number', () => {
    const { result } = renderHook(() => useFloor(4.7));
    expect(result.current).toBe(4);
  });

  it('should floor a negative number', () => {
    const { result } = renderHook(() => useFloor(-4.2));
    expect(result.current).toBe(-5);
  });

  it('should return the same value for an integer', () => {
    const { result } = renderHook(() => useFloor(7));
    expect(result.current).toBe(7);
  });

  it('should handle a value of 0', () => {
    const { result } = renderHook(() => useFloor(0));
    expect(result.current).toBe(0);
  });

  it('should handle a value of Infinity', () => {
    const { result } = renderHook(() => useFloor(Infinity));
    expect(result.current).toBe(Infinity);
  });

  it('should handle a value of -Infinity', () => {
    const { result } = renderHook(() => useFloor(-Infinity));
    expect(result.current).toBe(-Infinity);
  });

  it('should throw an error for NaN input', () => {
    expect(() => {
      renderHook(() => useFloor(NaN));
    }).toThrow('Invalid input: expected a number');
  });

  it('should update the floored value when the input value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useFloor(value), {
      initialProps: { value: 3.7 },
    });

    expect(result.current).toBe(3);

    rerender({ value: 6.8 });
    expect(result.current).toBe(6);
  });

  it('should handle a getter function as input', () => {
    const { result } = renderHook(() => useFloor(() => 5.8));
    expect(result.current).toBe(5);
  });

  it('should memoize the floored value', () => {
    const getter = vi.fn(() => 2.3);
    const { result, rerender } = renderHook(() => useFloor(getter));

    expect(result.current).toBe(2);
    expect(getter).toHaveBeenCalledTimes(1);

    rerender();

    expect(result.current).toBe(2);
    expect(getter).toHaveBeenCalledTimes(1);
  });

  it('should handle a direct number value', () => {
    const { result } = renderHook(() => useFloor(4.7));
    expect(result.current).toBe(4);
  });

  it('should handle a function returning a number', () => {
    const numberFunc: Resolvable<number> = () => 5.8;
    const { result } = renderHook(() => useFloor(numberFunc));
    expect(result.current).toBe(5);
  });
});

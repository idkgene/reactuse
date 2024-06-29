import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFibonacci } from './use-fibonacci';

describe('useFibonacci', () => {
  it('should generate the correct Fibonacci sequence', () => {
    const { result } = renderHook(() => useFibonacci());

    act(() => {
      result.current.generate(5);
    });

    expect(result.current.sequence).toEqual([0, 1, 1, 2, 3]);
  });

  it('should update the sequence state correctly', () => {
    const { result } = renderHook(() => useFibonacci());

    act(() => {
      result.current.generate(7);
    });

    expect(result.current.sequence).toEqual([0, 1, 1, 2, 3, 5, 8]);

    act(() => {
      result.current.generate(3);
    });

    expect(result.current.sequence).toEqual([0, 1, 1]);
  });

  it('should return null and set sequence to empty array for negative numbers', () => {
    const { result } = renderHook(() => useFibonacci());

    act(() => {
      const sequence = result.current.generate(-5);
      expect(sequence).toBeNull();
    });

    expect(result.current.sequence).toEqual([]);
  });

  it('should return null and set sequence to empty array for non-integer numbers', () => {
    const { result } = renderHook(() => useFibonacci());

    act(() => {
      const sequence = result.current.generate(3.14);
      expect(sequence).toBeNull();
    });

    expect(result.current.sequence).toEqual([]);
  });

  it('should handle large numbers correctly', () => {
    const { result } = renderHook(() => useFibonacci());

    act(() => {
      result.current.generate(20);
    });

    expect(result.current.sequence).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
      2584, 4181,
    ]);
  });

  it('should return the same generate function on multiple renders', () => {
    const { result, rerender } = renderHook(() => useFibonacci());
    const generateFn = result.current.generate;

    rerender();

    expect(result.current.generate).toBe(generateFn);
  });
});

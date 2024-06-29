import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useExponential } from './useExponential';

describe('useExponential', () => {
  it('should return the correct initial base', () => {
    const { result } = renderHook(() => useExponential());
    expect(result.current.base).toBe(Math.E);
  });

  it('should return the specified initial base', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 2 }));
    expect(result.current.base).toBe(2);
  });

  it('should update the base correctly', () => {
    const { result } = renderHook(() => useExponential());

    act(() => {
      result.current.setBase(5);
    });

    expect(result.current.base).toBe(5);
  });

  it('should calculate the exponential correctly', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 2 }));

    let exponential = result.current.calculate(3);
    expect(exponential).toBe(8);

    act(() => {
      result.current.setBase(3);
    });

    exponential = result.current.calculate(2);
    expect(exponential).toBe(9);
  });

  it('should handle non-finite results', () => {
    const { result } = renderHook(() => useExponential());

    const exponential = result.current.calculate(Infinity);
    expect(exponential).toBeNull();
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => useExponential());

    const exponential = result.current.calculate(1e10);
    expect(exponential).toBeNull();
  });

  it('should return the same calculate function on re-renders', () => {
    const { result, rerender } = renderHook(() => useExponential());

    const calculateFn = result.current.calculate;

    rerender();

    expect(result.current.calculate).toBe(calculateFn);
  });
});

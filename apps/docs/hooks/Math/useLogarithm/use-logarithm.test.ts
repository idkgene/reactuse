import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogarithm } from './use-logarithm';

describe('useLogarithm', () => {
  it('should return the correct initial base', () => {
    const { result } = renderHook(() => useLogarithm());
    expect(result.current.base).toBe(Math.E);
  });

  it('should return the specified initial base', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 10 }));
    expect(result.current.base).toBe(10);
  });

  it('should update the base correctly', () => {
    const { result } = renderHook(() => useLogarithm());

    act(() => {
      result.current.setBase(5);
    });

    expect(result.current.base).toBe(5);
  });

  it('should calculate the logarithm correctly', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 10 }));

    let logarithm = result.current.calculate(100);
    expect(logarithm).toBeCloseTo(2);

    act(() => {
      result.current.setBase(Math.E);
    });

    logarithm = result.current.calculate(Math.E);
    expect(logarithm).toBeCloseTo(1);
  });

  it('should return null for invalid input values', () => {
    const { result } = renderHook(() => useLogarithm());

    let logarithm = result.current.calculate(0);
    expect(logarithm).toBeNull();

    logarithm = result.current.calculate(-10);
    expect(logarithm).toBeNull();

    act(() => {
      result.current.setBase(0);
    });

    logarithm = result.current.calculate(10);
    expect(logarithm).toBeNull();

    act(() => {
      result.current.setBase(1);
    });

    logarithm = result.current.calculate(10);
    expect(logarithm).toBeNull();
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => useLogarithm());

    const logarithm = result.current.calculate(-10);
    expect(logarithm).toBeNull();
  });

  it('should return the same calculate function on re-renders', () => {
    const { result, rerender } = renderHook(() => useLogarithm());

    const calculateFn = result.current.calculate;

    rerender();

    expect(result.current.calculate).toBe(calculateFn);
  });
});

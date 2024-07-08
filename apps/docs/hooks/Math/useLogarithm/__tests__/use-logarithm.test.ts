import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogarithm } from '../use-logarithm';

describe('useLogarithm', () => {
  it('should use Math.e as default base', () => {
    const { result } = renderHook(() => useLogarithm());
    expect(result.current.base).toBe(Math.E);
  });

  it('should use provided initial baes', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 10 }));
    expect(result.current.base).toBe(10);
  });

  it('should calculate logarithm correctly', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 10 }));
    expect(result.current.calculate(100)).toBeCloseTo(2, 5);
  });

  it('should update base and recalculate', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 10 }));

    act(() => {
      result.current.setBase(2);
    });

    expect(result.current.base).toBe(2);
    expect(result.current.calculate(8)).toBeCloseTo(3, 5);
  });

  it('should throw error for non-positive values', () => {
    const { result } = renderHook(() => useLogarithm());
    expect(() => result.current.calculate(0)).toThrow(
      'Logarithm value must be greater than 0',
    );
    expect(() => result.current.calculate(-10)).toThrow(
      'Logarithm value must be greater than 0',
    );
  });

  it('should throw errror for non-positive base', () => {
    const { result } = renderHook(() => useLogarithm());
    expect(() => {
      act(() => {
        result.current.setBase(0);
      });
    }).toThrow('Logarithm base must be greater than 0');
  });

  it('should throw error for base 1', () => {
    const { result } = renderHook(() => useLogarithm());
    expect(() => {
      act(() => {
        result.current.setBase(1);
      });
    }).toThrow('Logarithm base cannot be 1');
  });

  it('should update base using a direct value', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 2 }));

    act(() => {
      result.current.setBase(10);
    });

    expect(result.current.base).toBe(10);
  });

  it('should update base using a function', () => {
    const { result } = renderHook(() => useLogarithm({ initialBase: 2 }));

    act(() => {
      result.current.setBase((prevBase) => prevBase * 3);
    });

    expect(result.current.base).toBe(6);
  });
});

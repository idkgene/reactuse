import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useExponential } from '../use-exponential';

describe('useExponential', () => {
  it('should initialize with default base (e)', () => {
    const { result } = renderHook(() => useExponential());
    expect(result.current.base).toBe(Math.E);
  });

  it('should initialize with custom base', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 2 }));
    expect(result.current.base).toBe(2);
  });

  it('should throw error for invalid initial base', () => {
    expect(() =>
      renderHook(() => useExponential({ initialBase: NaN })),
    ).toThrow('Invalid initial base provided');
  });

  it('should update base', () => {
    const { result } = renderHook(() => useExponential());
    act(() => {
      result.current.setBase(3);
    });
    expect(result.current.base).toBe(3);
  });

  it('should throw error for invalid new base', () => {
    const { result } = renderHook(() => useExponential());
    expect(() => {
      act(() => {
        result.current.setBase(NaN);
      });
    }).toThrow('Invalid base value');
  });

  it('should calculate correctly for positive exponents', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 2 }));
    expect(result.current.calculate(3)).toBe(8);
  });

  it('should calculate correctly for negative exponents', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 2 }));
    expect(result.current.calculate(-2)).toBeCloseTo(0.25, 5);
  });

  it('should calculate correctly for fractional exponents', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 4 }));
    expect(result.current.calculate(0.5)).toBe(2);
  });

  it('should throw error for invalid exponent', () => {
    const { result } = renderHook(() => useExponential());
    expect(() => result.current.calculate(NaN)).toThrow(
      'Invalid exponent value',
    );
  });

  it('should throw error for calculation resulting in non-finite number', () => {
    const { result } = renderHook(() =>
      useExponential({ initialBase: Number.MAX_VALUE }),
    );
    expect(() => result.current.calculate(2)).toThrow(
      'Calculation resulted in a non-finite number',
    );
  });

  it('should handle zero exponent', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 5 }));
    expect(result.current.calculate(0)).toBe(1);
  });

  it('should handle base change and recalculate correctly', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 2 }));
    expect(result.current.calculate(3)).toBe(8);
    act(() => {
      result.current.setBase(3);
    });
    expect(result.current.calculate(3)).toBe(27);
  });

  it('should handle very large numbers without throwing', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 10 }));
    expect(() => result.current.calculate(308)).not.toThrow();
  });

  it('should handle very small numbers without throwing', () => {
    const { result } = renderHook(() => useExponential({ initialBase: 10 }));
    expect(() => result.current.calculate(-308)).not.toThrow();
  });
});

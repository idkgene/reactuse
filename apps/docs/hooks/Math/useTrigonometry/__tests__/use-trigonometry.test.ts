import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTrigonometry } from '../use-trigonometry';

describe('useTrigonometry', () => {
  it('should calculate sin correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.sin(0)).toBe(0);
    expect(result.current.sin(Math.PI / 2)).toBe(1);
    expect(result.current.sin(Math.PI)).toBe(Math.sin(Math.PI));
  });

  it('should calculate cos correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.cos(0)).toBe(1);
    expect(result.current.cos(Math.PI / 2)).toBe(6.123233995736766e-17);
    expect(result.current.cos(Math.PI)).toBe(-1);
  });

  it('should calculate tan correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.tan(0)).toBe(0);
    expect(result.current.tan(Math.PI / 4)).toBeCloseTo(1);
    expect(result.current.tan(Math.PI)).toBe(Math.tan(Math.PI));
  });

  it('should calculate asin correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.asin(0)).toBe(0);
    expect(result.current.asin(1)).toBe(Math.PI / 2);
    expect(result.current.asin(-1)).toBe(-Math.PI / 2);
  });

  it('should calculate acos correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.acos(1)).toBe(0);
    expect(result.current.acos(0)).toBe(Math.PI / 2);
    expect(result.current.acos(-1)).toBe(Math.PI);
  });

  it('should calculate atan correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.atan(0)).toBe(0);
    expect(result.current.atan(1)).toBe(Math.PI / 4);
    expect(() => result.current.atan(Infinity)).toThrowError(
      'Invalid input for atan: argument 1 must be a finite number',
    );
  });

  it('should calculate atan2 correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.atan2(0, 1)).toBe(0);
    expect(result.current.atan2(1, 1)).toBe(Math.PI / 4);
    expect(result.current.atan2(1, 0)).toBe(Math.PI / 2);
  });

  it('should calculate sinh correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.sinh(0)).toBe(0);
    expect(result.current.sinh(1)).toBe(Math.sinh(1));
    expect(result.current.sinh(-1)).toBe(Math.sinh(-1));
  });

  it('should calculate cosh correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.cosh(0)).toBe(1);
    expect(result.current.cosh(1)).toBe(Math.cosh(1));
    expect(result.current.cosh(-1)).toBe(Math.cosh(-1));
  });

  it('should calculate tanh correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.tanh(0)).toBe(0);
    expect(result.current.tanh(1)).toBe(Math.tanh(1));
    expect(result.current.tanh(-1)).toBe(Math.tanh(-1));
  });

  it('should calculate asinh correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.asinh(0)).toBe(0);
    expect(result.current.asinh(1)).toBe(Math.asinh(1));
    expect(result.current.asinh(-1)).toBe(Math.asinh(-1));
  });

  it('should calculate acosh correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.acosh(1)).toBe(0);
    expect(result.current.acosh(2)).toBe(Math.acosh(2));
    expect(result.current.acosh(10)).toBe(Math.acosh(10));
  });

  it('should calculate atanh correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.atanh(0)).toBe(0);
    expect(result.current.atanh(0.5)).toBe(Math.atanh(0.5));
    expect(result.current.atanh(-0.5)).toBe(Math.atanh(-0.5));
  });

  it('should throw an error for invalid input', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(() => result.current.sin(NaN)).toThrowError();
    expect(() => result.current.cos(Infinity)).toThrowError();
    expect(() => result.current.tan(-Infinity)).toThrowError();
    expect(() => result.current.asin(NaN)).toThrowError();
    expect(() => result.current.acos(Infinity)).toThrowError();
    expect(() => result.current.atan(-Infinity)).toThrowError();
    expect(() => result.current.atan2(NaN, 1)).toThrowError();
    expect(() => result.current.atan2(1, NaN)).toThrowError();
    expect(() => result.current.sinh(NaN)).toThrowError();
    expect(() => result.current.cosh(Infinity)).toThrowError();
    expect(() => result.current.tanh(-Infinity)).toThrowError();
    expect(() => result.current.asinh(NaN)).toThrowError();
    expect(() => result.current.acosh(NaN)).toThrowError();
    expect(() => result.current.atanh(Infinity)).toThrowError();
  });

  it('should throw an error for non-finite results', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(() => result.current.asin(2)).toThrowError();
    expect(() => result.current.acos(2)).toThrowError();
    expect(() => result.current.atanh(2)).toThrowError();
    expect(() => result.current.acosh(0.5)).toThrowError();
  });
});

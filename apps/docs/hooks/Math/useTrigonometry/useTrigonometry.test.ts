import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTrigonometry } from './useTrigonometry';

describe('useTrigonometry', () => {
  it('should return sin, cos, and tan functions', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current).toHaveProperty('sin');
    expect(result.current).toHaveProperty('cos');
    expect(result.current).toHaveProperty('tan');
    expect(typeof result.current.sin).toBe('function');
    expect(typeof result.current.cos).toBe('function');
    expect(typeof result.current.tan).toBe('function');
  });

  it('should calculate sin correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.sin(Math.PI / 2)).toBeCloseTo(1);
    expect(result.current.sin(0)).toBeCloseTo(0);
  });

  it('should calculate cos correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.cos(0)).toBeCloseTo(1);
    expect(result.current.cos(Math.PI)).toBeCloseTo(-1);
  });

  it('should calculate tan correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    expect(result.current.tan(0)).toBeCloseTo(0);
    expect(result.current.tan(Math.PI / 4)).toBeCloseTo(1);
  });

  it('should handle errors in sin calculation', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useTrigonometry());

    const originalMathSin = Math.sin;
    Math.sin = vi.fn(() => {
      throw new Error('Sin error');
    });

    expect(result.current.sin(1)).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in sin calculation:',
      expect.any(Error),
    );

    Math.sin = originalMathSin;
    consoleSpy.mockRestore();
  });

  it('should handle errors in cos calculation', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useTrigonometry());

    const originalMathCos = Math.cos;
    Math.cos = vi.fn(() => {
      throw new Error('Cos error');
    });

    expect(result.current.cos(1)).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in cos calculation:',
      expect.any(Error),
    );

    Math.cos = originalMathCos;
    consoleSpy.mockRestore();
  });

  it('should handle errors in tan calculation', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useTrigonometry());

    const originalMathTan = Math.tan;
    Math.tan = vi.fn(() => {
      throw new Error('Tan error');
    });

    expect(result.current.tan(1)).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in tan calculation:',
      expect.any(Error),
    );

    Math.tan = originalMathTan;
    consoleSpy.mockRestore();
  });

  it('should memoize the trigonometric functions', () => {
    const { result, rerender } = renderHook(() => useTrigonometry());
    const initialSin = result.current.sin;
    const initialCos = result.current.cos;
    const initialTan = result.current.tan;

    rerender();

    expect(result.current.sin).toBe(initialSin);
    expect(result.current.cos).toBe(initialCos);
    expect(result.current.tan).toBe(initialTan);
  });

  it('should handle extreme values correctly', () => {
    const { result } = renderHook(() => useTrigonometry());

    expect(result.current.sin(Infinity)).toBeNaN();
    expect(result.current.cos(-Infinity)).toBeNaN();
    expect(result.current.tan(Number.MAX_VALUE)).not.toBeNaN(); // This will be a very small number, close to zero
  });

  it('should handle very small angles correctly', () => {
    const { result } = renderHook(() => useTrigonometry());
    const smallAngle = 1e-10;

    expect(result.current.sin(smallAngle)).toBeCloseTo(smallAngle, 10);
    expect(result.current.cos(smallAngle)).toBeCloseTo(1, 10);
    expect(result.current.tan(smallAngle)).toBeCloseTo(smallAngle, 10);
  });

  it('should maintain precision for multiple decimal places', () => {
    const { result } = renderHook(() => useTrigonometry());
    const angle = Math.PI / 6; // 30 degrees

    expect(result.current.sin(angle)).toBeCloseTo(0.5, 15);
    expect(result.current.cos(angle)).toBeCloseTo(Math.sqrt(3) / 2, 15);
    expect(result.current.tan(angle)).toBeCloseTo(1 / Math.sqrt(3), 15);
  });
});

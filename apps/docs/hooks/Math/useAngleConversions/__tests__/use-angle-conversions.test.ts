import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  useAngleConversions,
  radiansToDegrees,
  degreesToRadians,
  type Radians,
  type Degrees,
} from '../use-angle-conversions';

describe('useAngleConversions', () => {
  it('should convert radians to degrees', () => {
    const { result } = renderHook(() => useAngleConversions());
    const radians = Math.PI as Radians;
    expect(result.current.radiansToDegrees(radians)).toBe(180);
  });

  it('should convert degrees to radians', () => {
    const { result } = renderHook(() => useAngleConversions());
    const degrees = 180 as Degrees;
    expect(result.current.degreesToRadians(degrees)).toBe(Math.PI);
  });

  it('should throw error for invalid radians', () => {
    const { result } = renderHook(() => useAngleConversions());
    const invalidRadians = NaN as Radians;
    expect(() => result.current.radiansToDegrees(invalidRadians)).toThrow(
      'Invalid radians value',
    );
  });

  it('should throw error for invalid degrees', () => {
    const { result } = renderHook(() => useAngleConversions());
    const invalidDegrees = Infinity as Degrees;
    expect(() => result.current.degreesToRadians(invalidDegrees)).toThrow(
      'Invalid degrees value',
    );
  });

  it('should memoize conversion functions', () => {
    const { result, rerender } = renderHook(() => useAngleConversions());
    const initialRadiansToDegrees = result.current.radiansToDegrees;
    const initialDegreesToRadians = result.current.degreesToRadians;

    rerender();

    expect(result.current.radiansToDegrees).toBe(initialRadiansToDegrees);
    expect(result.current.degreesToRadians).toBe(initialDegreesToRadians);
  });

  it('should handle small angle conversions', () => {
    const { result } = renderHook(() => useAngleConversions());
    const smallRadians = 0.001 as Radians;
    const smallDegrees = 0.001 as Degrees;

    expect(result.current.radiansToDegrees(smallRadians)).toBeCloseTo(
      0.0573,
      4,
    );
    expect(result.current.degreesToRadians(smallDegrees)).toBeCloseTo(
      0.0000175,
      7,
    );
  });

  it('should handle large angle conversions', () => {
    const { result } = renderHook(() => useAngleConversions());
    const largeRadians = 1000 as Radians;
    const largeDegrees = 1000 as Degrees;

    expect(result.current.radiansToDegrees(largeRadians)).toBeCloseTo(
      57295.7795,
      4,
    );
    expect(result.current.degreesToRadians(largeDegrees)).toBeCloseTo(
      17.4533,
      4,
    );
  });

  it('should handle negative angle conversions', () => {
    const { result } = renderHook(() => useAngleConversions());
    const negativeRadians = -Math.PI as Radians;
    const negativeDegrees = -180 as Degrees;

    expect(result.current.radiansToDegrees(negativeRadians)).toBe(-180);
    expect(result.current.degreesToRadians(negativeDegrees)).toBe(-Math.PI);
  });

  it('should log errors to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // noop
    });
    const { result } = renderHook(() => useAngleConversions());

    expect(() => result.current.radiansToDegrees(NaN as Radians)).toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Radians to degrees conversion error:',
      expect.any(Error),
    );

    expect(() => result.current.degreesToRadians(NaN as Degrees)).toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Degrees to radians conversion error:',
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});

describe('standalone conversion functions', () => {
  it('should convert radians to degrees', () => {
    expect(radiansToDegrees(Math.PI as Radians)).toBe(180);
  });

  it('should convert degrees to radians', () => {
    expect(degreesToRadians(180 as Degrees)).toBe(Math.PI);
  });

  it('should throw error for invalid radians', () => {
    expect(() => radiansToDegrees(NaN as Radians)).toThrow(
      'Invalid radians value',
    );
  });

  it('should throw error for invalid degrees', () => {
    expect(() => degreesToRadians(Infinity as Degrees)).toThrow(
      'Invalid degrees value',
    );
  });
});

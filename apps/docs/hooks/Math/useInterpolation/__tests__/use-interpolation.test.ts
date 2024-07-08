import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { createPercentage, useInterpolation } from '../use-interpolation';

describe('useInterpolation', () => {
  const setup = () => renderHook(() => useInterpolation());

  it('should interpolate correctly', () => {
    const { result } = setup();
    const interpolate = result.current;

    expect(interpolate(0, 10, createPercentage(0.5))).toBe(5);
    expect(interpolate(0, 10, createPercentage(0))).toBe(0);
    expect(interpolate(0, 10, createPercentage(1))).toBe(10);
  });

  it('should return a function when amount is not provided', () => {
    const { result } = setup();
    const interpolate = result.current;

    const interpolator = interpolate(0, 10);
    expect(typeof interpolator).toBe('function');
    expect(interpolator(createPercentage(0.5))).toBe(5);
  });

  it('should throw an error for invalid start value', () => {
    const { result } = setup();
    const interpolate = result.current;

    expect(() => interpolate(NaN, 10, createPercentage(0.5))).toThrow(
      'Invalid start value',
    );
    expect(() => interpolate(Infinity, 10, createPercentage(0.5))).toThrow(
      'Invalid start value',
    );
  });

  it('should throw an error for invalid end value', () => {
    const { result } = setup();
    const interpolate = result.current;

    expect(() => interpolate(0, NaN, createPercentage(0.5))).toThrow(
      'Invalid end value',
    );
    expect(() => interpolate(0, Infinity, createPercentage(0.5))).toThrow(
      'Invalid end value',
    );
  });

  it('should create valid percentages', () => {
    expect(createPercentage(0)).toBe(0);
    expect(createPercentage(0.5)).toBe(0.5);
    expect(createPercentage(1)).toBe(1);
  });

  it('should throw an error for invalid percentages', () => {
    expect(() => createPercentage(-0.1)).toThrow('Invalid percentage value');
    expect(() => createPercentage(1.1)).toThrow('Invalid percentage value');
  });

  it('should handle very small numbers', () => {
    const { result } = setup();
    const interpolate = result.current;

    const start = 1e-10;
    const end = 2e-10;
    expect(interpolate(start, end, createPercentage(0.5))).toBeCloseTo(1.5e-10);
  });

  it('should handle very large numbers', () => {
    const { result } = setup();
    const interpolate = result.current;

    const start = 1e10;
    const end = 2e10;
    expect(interpolate(start, end, createPercentage(0.5))).toBe(1.5e10);
  });

  it('should handle negative numbers', () => {
    const { result } = setup();
    const interpolate = result.current;

    expect(interpolate(-10, 10, createPercentage(0.5))).toBe(0);
    expect(interpolate(-20, -10, createPercentage(0.5))).toBe(-15);
  });
});

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCovariance } from '../use-covarience';

describe('useCovariance', () => {
  it('should calculate covariance correctly', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [2, 4, 5, 4, 5];

    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      dataX,
      dataY,
    );

    expect(covariance).toBeCloseTo(1.5, 5);
    expect(meanX).toBe(3);
    expect(meanY).toBe(4);
  });

  it('should handle negative values', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [-1, -2, -3, -4, -5];
    const dataY = [-2, -4, -5, -4, -5];

    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      dataX,
      dataY,
    );

    expect(covariance).toBeCloseTo(1.5, 5);
    expect(meanX).toBe(-3);
    expect(meanY).toBe(-4);
  });

  it('should throw error for empty data sets', () => {
    const { result } = renderHook(() => useCovariance());
    expect(() => result.current.calculateCovariance([], [])).toThrow(
      'Invalid data sets',
    );
  });

  it('should throw error for data sets with different lengths', () => {
    const { result } = renderHook(() => useCovariance());
    expect(() => result.current.calculateCovariance([1, 2], [1])).toThrow(
      'Invalid data sets',
    );
  });

  it('should handle data sets with length 1', () => {
    const { result } = renderHook(() => useCovariance());
    expect(() => result.current.calculateCovariance([1], [2])).toThrow(
      'Invalid data sets',
    );
  });

  it('should handle data sets with length 2', () => {
    const { result } = renderHook(() => useCovariance());
    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      [1, 2],
      [2, 4],
    );

    expect(covariance).toBe(1);
    expect(meanX).toBe(1.5);
    expect(meanY).toBe(3);
  });

  it('should return the same result for multiple calls', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [1, 2, 3];
    const dataY = [2, 4, 6];

    const result1 = result.current.calculateCovariance(dataX, dataY);
    const result2 = result.current.calculateCovariance(dataX, dataY);

    expect(result1).toEqual(result2);
  });

  it('should handle data sets with zero covariance', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [5, 5, 5, 5, 5];

    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      dataX,
      dataY,
    );

    expect(covariance).toBe(0);
    expect(meanX).toBe(3);
    expect(meanY).toBe(5);
  });

  it('should handle data sets with perfect positive correlation', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [2, 4, 6, 8, 10];

    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      dataX,
      dataY,
    );

    expect(covariance).toBe(5);
    expect(meanX).toBe(3);
    expect(meanY).toBe(6);
  });

  it('should handle data sets with perfect negative correlation', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [10, 8, 6, 4, 2];

    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      dataX,
      dataY,
    );

    expect(covariance).toBe(-5);
    expect(meanX).toBe(3);
    expect(meanY).toBe(6);
  });

  it('should handle data sets with floating point numbers', () => {
    const { result } = renderHook(() => useCovariance());
    const dataX = [1.1, 2.2, 3.3, 4.4, 5.5];
    const dataY = [2.2, 4.4, 6.6, 8.8, 11];

    const { covariance, meanX, meanY } = result.current.calculateCovariance(
      dataX,
      dataY,
    );

    expect(covariance).toBeCloseTo(6.05, 5);
    expect(meanX).toBeCloseTo(3.3, 5);
    expect(meanY).toBeCloseTo(6.6, 5);
  });

  
});

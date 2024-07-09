import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCorrelation } from '../use-correlation';

describe('useCorrelation', () => {
  it('should calculate correlation correctly for positive correlation', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [2, 4, 5, 4, 5];
    const { correlation, meanX, meanY, stdDevX, stdDevY } =
      result.current.calculateCorrelation(dataX, dataY);

    expect(correlation).toBeCloseTo(0.7746, 4);
    expect(meanX).toBe(3);
    expect(meanY).toBe(4);
    expect(stdDevX).toBeCloseTo(1.5811, 4);
    expect(stdDevY).toBeCloseTo(1.2247, 4);
  });

  it('should calculate correlation correctly for negative correlation', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [5, 4, 3, 2, 1];
    const { correlation } = result.current.calculateCorrelation(dataX, dataY);

    expect(correlation).toBeCloseTo(-1, 15);
  });

  it('should throw an error when standard deviation is zero', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [1, 1, 1, 1, 1];

    expect(() => result.current.calculateCorrelation(dataX, dataY)).toThrow(
      'Standard deviation cannot be zero',
    );
  });

  it('should calculate correlation correctly for weakly correlated data', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [2, 3, 1, 5, 4];
    const { correlation } = result.current.calculateCorrelation(dataX, dataY);

    expect(correlation).toBeCloseTo(0.6, 4);
  });

  it('should calculate correlation for data with low correlation', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3, 4, 5];
    const dataY = [5, 2, 1, 4, 3];
    const { correlation } = result.current.calculateCorrelation(dataX, dataY);
  
    expect(correlation).toBeCloseTo(-0.2, 4);
  });

  it('should throw an error when data sets have different lengths', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3];
    const dataY = [1, 2, 3, 4];

    expect(() => result.current.calculateCorrelation(dataX, dataY)).toThrow(
      'Data sets must have the same length',
    );
  });

  it('should throw an error when data sets have less than two points', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1];
    const dataY = [1];

    expect(() => result.current.calculateCorrelation(dataX, dataY)).toThrow(
      'Data sets must contain at least two points',
    );
  });

  it('should throw an error when data sets contain non-number values', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1, 2, 3] as unknown as never[];
    const dataY = [1, 2, '3'] as unknown as never[];

    expect(() => result.current.calculateCorrelation(dataX, dataY)).toThrow(
      'Data sets must contain only numbers',
    );
  });

  it('should handle floating point numbers correctly', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1.1, 2.2, 3.3, 4.4, 5.5];
    const dataY = [2.1, 3.2, 4.3, 5.4, 6.5];
    const { correlation } = result.current.calculateCorrelation(dataX, dataY);

    expect(correlation).toBeCloseTo(1, 4);
  });

  it('should handle large numbers correctly', () => {
    const { result } = renderHook(() => useCorrelation());
    const dataX = [1e6, 2e6, 3e6, 4e6, 5e6];
    const dataY = [2e6, 4e6, 6e6, 8e6, 10e6];
    const { correlation } = result.current.calculateCorrelation(dataX, dataY);

    expect(correlation).toBeCloseTo(1, 4);
  });
});

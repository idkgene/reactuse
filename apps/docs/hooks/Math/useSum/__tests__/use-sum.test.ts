import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { type NumericArray, useSum } from '../use-sum';

describe('useSum', () => {
  it('should calculate the sum of an array of numbers', () => {
    const { result } = renderHook(() => useSum([1, 2, 3, 4, 5]));
    expect(result.current).toBe(15);
  });

  it('should return 0 for an empty array', () => {
    const { result } = renderHook(() => useSum([]));
    expect(result.current).toBe(0);
  });

  it('should throw an error for non-array input', () => {
    expect(() =>
      renderHook(() => useSum(null as unknown as NumericArray)),
    ).toThrowError('Input must be an array');
    
    expect(() =>
      renderHook(() => useSum(undefined as unknown as NumericArray)),
    ).toThrowError('Input must be an array');
    
    expect(() => renderHook(() => useSum({} as NumericArray))).toThrowError(
      'Input must be an array',
    );
  });

  it('should throw an error for an array containing non-finite numbers', () => {
    expect(() => renderHook(() => useSum([1, 2, NaN, 4, 5]))).toThrowError(
      'Array must contain only finite numbers',
    );
    
    expect(() => renderHook(() => useSum([1, 2, Infinity, 4, 5]))).toThrowError(
      'Array must contain only finite numbers',
    );
    
    expect(() =>
      renderHook(() => useSum([1, 2, -Infinity, 4, 5])),
    ).toThrowError('Array must contain only finite numbers');
  });
});

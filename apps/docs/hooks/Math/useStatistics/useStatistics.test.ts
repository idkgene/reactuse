import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useStatistics } from './useStatistics';

describe('useStatistics', () => {
  const { result } = renderHook(() => useStatistics());
  const { mean, median, mode, standardDeviation } = result.current;

  describe('mean', () => {
    it('should calculate the mean correctly', () => {
      expect(mean([1, 2, 3, 4, 5])).toBe(3);
      expect(mean([1, 1, 1, 1])).toBe(1);
      expect(mean([-1, 0, 1])).toBe(0);
    });

    it('should return null for an empty array', () => {
      expect(mean([])).toBeNull();
    });
  });

  describe('median', () => {
    it('should calculate the median correctly for odd-length arrays', () => {
      expect(median([1, 2, 3, 4, 5])).toBe(3);
      expect(median([5, 2, 1, 4, 3])).toBe(3);
    });

    it('should calculate the median correctly for even-length arrays', () => {
      expect(median([1, 2, 3, 4])).toBe(2.5);
      expect(median([4, 1, 3, 2])).toBe(2.5);
    });

    it('should return null for an empty array', () => {
      expect(median([])).toBeNull();
    });
  });

  describe('mode', () => {
    it('should calculate the mode correctly for unimodal data', () => {
      expect(mode([1, 2, 2, 3, 4])).toEqual([2]);
    });

    it('should calculate the mode correctly for multimodal data', () => {
      expect(mode([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });

    it('should return null when all values occur with equal frequency', () => {
      expect(mode([1, 2, 3, 4])).toBeNull();
    });

    it('should return null for an empty array', () => {
      expect(mode([])).toBeNull();
    });
  });

  describe('standardDeviation', () => {
    it('should calculate the standard deviation correctly', () => {
      expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.0, 2);
    });

    it('should return 0 for an array with all equal values', () => {
      expect(standardDeviation([5, 5, 5, 5])).toBe(0);
    });

    it('should return null for an empty array', () => {
      expect(standardDeviation([])).toBeNull();
    });

    describe('edge cases', () => {
      it('should handle arrays with a single element', () => {
        expect(mean([42])).toBe(42);
        expect(median([42])).toBe(42);
        expect(mode([42])).toBeNull();
        expect(standardDeviation([42])).toBe(0);
      });

      it('should handle arrays with very large numbers', () => {
        const largeNumbers = [1e15, 2e15, 3e15];
        expect(mean(largeNumbers)).toBe(2e15);
        expect(median(largeNumbers)).toBe(2e15);
        expect(mode(largeNumbers)).toBeNull();
        expect(standardDeviation(largeNumbers)).toBeCloseTo(
          8.16496580927726e14,
          0,
        );
      });

      it('should handle arrays with very small numbers', () => {
        const smallNumbers = [1e-15, 2e-15, 3e-15];
        expect(mean(smallNumbers)).toBe(2e-15);
        expect(median(smallNumbers)).toBe(2e-15);
        expect(mode(smallNumbers)).toBeNull();
        expect(standardDeviation(smallNumbers)).toBeCloseTo(
          8.16496580927726e-16,
          25,
        );
      });

      it('should handle arrays with mixed positive and negative numbers', () => {
        const mixedNumbers = [-5, -2, 0, 3, 7];
        expect(mean(mixedNumbers)).toBe(0.6);
        expect(median(mixedNumbers)).toBe(0);
        expect(mode(mixedNumbers)).toBeNull();
        expect(standardDeviation(mixedNumbers)).toBeCloseTo(4.4272, 4);
      });
    });

    describe('function stability', () => {
      it('should return the same function references on multiple renders', () => {
        const { result: result1 } = renderHook(() => useStatistics());
        const { result: result2 } = renderHook(() => useStatistics());

        expect(result1.current.mean).toBe(result2.current.mean);
        expect(result1.current.median).toBe(result2.current.median);
        expect(result1.current.mode).toBe(result2.current.mode);
        expect(result1.current.standardDeviation).toBe(
          result2.current.standardDeviation,
        );
      });
    });
  });
});

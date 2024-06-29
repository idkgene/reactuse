import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToNumber } from '../use-to-number';

describe('useToNumber', () => {
  it('should parse float numbers correctly', () => {
    const { result } = renderHook(() => useToNumber('3.14'));
    expect(result.current).toBe(3.14);
  });

  it('should parse integer numbers correctly', () => {
    const { result } = renderHook(() =>
      useToNumber('42', { method: 'parseInt' }),
    );
    expect(result.current).toBe(42);
  });

  it('should handle number inputs', () => {
    const { result } = renderHook(() => useToNumber(42));
    expect(result.current).toBe(42);
  });

  it('should parse numbers with different radix', () => {
    const { result } = renderHook(() =>
      useToNumber('1010', { method: 'parseInt', radix: 2 }),
    );
    expect(result.current).toBe(10);
  });

  it('should throw error for invalid radix', () => {
    expect(() => {
      renderHook(() => useToNumber('42', { method: 'parseInt', radix: 37 }));
    }).toThrow('Invalid radix. Must be between 2 and 36.');
  });

  it('should throw error for non-finite number input', () => {
    expect(() => {
      renderHook(() => useToNumber(Infinity));
    }).toThrow('Input number must be finite.');
  });

  it('should throw error for empty string input', () => {
    expect(() => {
      renderHook(() => useToNumber('   '));
    }).toThrow('Input string cannot be empty or only whitespace.');
  });

  it('should throw error for invalid input type', () => {
    expect(() => {
      renderHook(() => useToNumber(null as unknown as string));
    }).toThrow('Input must be a number or a string.');
  });

  it('should throw error for NaN result when nanToZero is false', () => {
    expect(() => {
      renderHook(() => useToNumber('not a number'));
    }).toThrow('Parsing resulted in NaN and nanToZero is false.');
  });

  it('should return 0 for NaN result when nanToZero is true', () => {
    const { result } = renderHook(() =>
      useToNumber('not a number', { nanToZero: true }),
    );
    expect(result.current).toBe(0);
  });

  it('should memoize the result', () => {
    const { result, rerender } = renderHook(
      ({ value, options }) => useToNumber(value, options),
      { initialProps: { value: '42', options: {} } },
    );

    const firstResult = result.current;
    rerender({ value: '42', options: {} });
    expect(result.current).toBe(firstResult);

    rerender({ value: '43', options: {} });
    expect(result.current).not.toBe(firstResult);
  });
});

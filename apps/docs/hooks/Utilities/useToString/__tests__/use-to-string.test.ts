import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToString } from '../use-to-string';

describe('useToString', () => {
  it('should convert a string value', () => {
    const { result } = renderHook(() => useToString('hello'));
    expect(result.current).toBe('hello');
  });

  it('should convert a number value', () => {
    const { result } = renderHook(() => useToString(42));
    expect(result.current).toBe('42');
  });

  it('should convert a boolean value', () => {
    const { result } = renderHook(() => useToString(true));
    expect(result.current).toBe('true');
  });

  it('should convert an object value', () => {
    const { result } = renderHook(() => useToString({ foo: 'bar' }));
    expect(result.current).toBe('[object Object]');
  });

  it('should convert an array value', () => {
    const { result } = renderHook(() => useToString([1, 2, 3]));
    expect(result.current).toBe('1,2,3');
  });

  it('should handle a function that returns a value', () => {
    const { result } = renderHook(() =>
      useToString(() => 'hello from function'),
    );
    expect(result.current).toBe('hello from function');
  });

  it('should throw an error for undefined value', () => {
    expect(() => {
      renderHook(() => useToString(undefined));
    }).toThrow('Cannot convert undefined or null to string');
  });

  it('should throw an error for null value', () => {
    expect(() => {
      renderHook(() => useToString(null));
    }).toThrow('Cannot convert undefined or null to string');
  });

  it('should throw an error if the function throws', () => {
    const errorFunction = (): never => {
      throw new Error('Function error');
    };
    expect(() => {
      renderHook(() => useToString(errorFunction));
    }).toThrow('Failed to resolve the value: Function error');
  });

  it('should throw an error if String() throws', () => {
    const badObject = {
      toString: () => {
        throw new Error('ToString error');
      },
    };
    expect(() => {
      renderHook(() => useToString(badObject));
    }).toThrow('Failed to convert value to string: ToString error');
  });

  it('should memoize the result', () => {
    const { result, rerender } = renderHook(({ value }) => useToString(value), {
      initialProps: { value: 'hello' },
    });

    const firstResult = result.current;
    rerender({ value: 'hello' });
    expect(result.current).toBe(firstResult);
  });
});

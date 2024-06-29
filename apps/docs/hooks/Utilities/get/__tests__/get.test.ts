import { expect, it, describe } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { get } from '../get';

describe('get', () => {
  it('should return the ref value when no key is provided', () => {
    const { result } = renderHook(() => useRef({ test: 'value' }));
    expect(get(result.current)).toEqual({ test: 'value' });
  });

  it('should return the specific property when a key is provided', () => {
    const { result } = renderHook(() => useRef({ test: 'value', num: 42 }));
    expect(get(result.current, 'test')).toBe('value');
    expect(get(result.current, 'num')).toBe(42);
  });

  it('should throw an error when ref is null', () => {
    const { result } = renderHook(() => useRef(null));
    expect(() => get(result.current)).toThrow('Ref is null or undefined');
  });

  it('should throw an error when ref is undefined', () => {
    const { result } = renderHook(() => useRef(undefined));
    expect(() => {
      get(result.current);
    }).toThrow('Ref is null or undefined');
  });

  it('should throw an error when key does not exist in ref value', () => {
    const { result } = renderHook(() => useRef({ test: 'value' }));
    expect(() =>
      get(result.current, 'nonexistent' as keyof typeof result.current.current),
    ).toThrow('Key "nonexistent" does not exist in ref value');
  });

  it('should throw an error when ref value is not an object and key is provided', () => {
    const { result } = renderHook(() => useRef('string value'));
    expect(() => get(result.current, 'length' as keyof string)).toThrow(
      'Key "length" does not exist in ref value',
    );
  });

  it('should work with array refs', () => {
    const { result } = renderHook(() => useRef(['a', 'b', 'c']));
    expect(get(result.current, 1)).toBe('b');
  });

  it('should work with function refs', () => {
    const testFn = (): string => 'test';
    const { result } = renderHook(() => useRef(testFn));
    expect(get(result.current)).toBe(testFn);
  });

  it('should work with symbol keys', () => {
    const symbolKey = Symbol('test');
    interface RefType {
      [symbolKey]: string;
    }
    const { result } = renderHook(() =>
      useRef<RefType>({ [symbolKey]: 'symbol value' }),
    );
    expect(get(result.current, symbolKey)).toBe('symbol value');
  });

  it('should work with number keys for array-like objects', () => {
    interface ArrayLike {
      0: string;
      1: string;
      length: number;
    }
    const { result } = renderHook(() =>
      useRef<ArrayLike>({ 0: 'zero', 1: 'one', length: 2 }),
    );
    expect(get(result.current, 0)).toBe('zero');
  });
});

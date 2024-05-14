import { getProperty, getValue } from '@/hooks/@Utilities/get';
import { MutableRefObject } from 'react';

describe('getValue', () => {
  it('should return the current value of a ref', () => {
    const ref: MutableRefObject<number> = { current: 42 };

    const result = getValue(ref);

    expect(result).toBe(42);
  });

  it('should return the current value of a ref with object type', () => {
    const ref: MutableRefObject<{ count: number }> = { current: { count: 42 } };

    const result = getValue(ref);

    expect(result).toEqual({ count: 42 });
  });
});

describe('getProperty', () => {
  it('should return the value of a specific property from the current ref value', () => {
    const ref: MutableRefObject<{ count: number }> = { current: { count: 42 } };

    const result = getProperty(ref, 'count');

    expect(result).toBe(42);
  });

  it('should return the value of a specific property from the current ref value with more complex object', () => {
    const ref: MutableRefObject<{ user: { name: string; age: number } }> = {
      current: { user: { name: 'John', age: 30 } },
    };

    const result = getProperty(ref, 'user');

    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('should return undefined if the property does not exist', () => {
    const ref: MutableRefObject<{ count?: number }> = { current: {} };

    const result = getProperty(ref, 'count');

    expect(result).toBeUndefined();
  });
});
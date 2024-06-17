import { MutableRefObject } from 'react';
import { get } from '../get';

describe('get', () => {
  test('should retrieve the entire value when key is not provided', () => {
    const myRef: MutableRefObject<number> = { current: 42 };
    const value = get(myRef);
    expect(value).toBe(42);
  });

  test('should retrieve a specific property when key is provided', () => {
    type Person = { name: string; age: number };
    const personRef: MutableRefObject<Person> = {
      current: { name: 'Alex', age: 20 },
    };
    const name = get(personRef, 'name');
    expect(name).toBe('Alex');
  });

  test('should retrieve undefined when accessing a non-existent property', () => {
    type Person = { name: string; age: number };
    const personRef: MutableRefObject<Person> = {
      current: { name: 'Alex', age: 20 },
    };
    const nonExistentProp = get(personRef, 'nonExistentProp' as keyof Person);
    expect(nonExistentProp).toBeUndefined();
  });

  test('should retrieve the entire value when key is explicitly set to undefined', () => {
    const myRef: MutableRefObject<number> = { current: 42 };
    const value = get(myRef, undefined);
    expect(value).toBe(42);
  });

  test('should retrieve the entire value when ref.current is null', () => {
    const myRef: MutableRefObject<number | null> = { current: null };
    const value = get(myRef);
    expect(value).toBeUndefined();
  });

  test('should retrieve undefined when accessing a property on a null value', () => {
    type Person = { name: string; age: number } | null;
    const personRef: MutableRefObject<Person> = { current: null };
    const name = get(personRef, 'name' as keyof Person);
    expect(name).toBeUndefined();
  });

  test('should retrieve the entire value when ref.current is undefined', () => {
    const myRef: MutableRefObject<number | undefined> = { current: undefined };
    const value = get(myRef);
    expect(value).toBeUndefined();
  });

  test('should retrieve undefined when accessing a property on an undefined value', () => {
    type Person = { name: string; age: number } | undefined;
    const personRef: MutableRefObject<Person> = { current: undefined };
    const name = get(personRef, 'name' as keyof Person);
    expect(name).toBeUndefined();
  });

  test('should retrieve undefined when accessing a non-existent nested property', () => {
    type NestedPerson = {
      info: { name: string; age: number };
      address: { city: string };
    };
    const nestedPersonRef: MutableRefObject<NestedPerson> = {
      current: {
        info: { name: 'Alex', age: 20 },
        address: { city: 'New York' },
      },
    };
    const nonExistentProp = get(
      nestedPersonRef,
      'info.nonExistentProp' as keyof NestedPerson
    );
    expect(nonExistentProp).toBeUndefined();
  });
});

import { useEffect, useRef } from 'react';

export function shallowEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  const keys = Object.keys(a) as Array<keyof T>;
  const { length } = keys;

  if (length !== Object.keys(b).length) {
    return false;
  }

  for (let i = 0; i < length; i += 1) {
    const key = keys[i];

    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

export function shallowCompare<T>(
  prevValue: React.DependencyList | null | undefined,
  currValue: React.DependencyList
): boolean {
  if (!prevValue || !currValue) {
    return false;
  }

  if (prevValue === currValue) {
    return true;
  }

  if (prevValue.length !== currValue.length) {
    return false;
  }

  for (let i = 0; i < prevValue.length; i += 1) {
    if (!shallowEqual(prevValue[i], currValue[i])) {
      return false;
    }
  }

  return true;
}

function useShallowCompare(
  dependencies: React.DependencyList | undefined | null
): [number] {
  const ref = useRef<React.DependencyList | null | undefined>(null);
  const updateRef = useRef<number>(0);

  if (!shallowCompare(ref.current, dependencies || [])) {
    ref.current = dependencies;
    updateRef.current += 1;
  }

  return [updateRef.current];
}

export function useShallowEffect(
  cb: () => void,
  dependencies: React.DependencyList | undefined | null
): void {
  useEffect(cb, useShallowCompare(dependencies));
}

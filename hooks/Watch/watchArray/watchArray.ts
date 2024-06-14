import * as React from 'react';

type WatchArrayCallback<T> = (
  newArray: T[],
  oldArray: T[],
  added: T[],
  removed: T[]
) => void;

function getArrayDifferences<T>(
  arr1: T[],
  arr2: T[]
): { added: T[]; removed: T[] } {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return {
    added: arr2.filter(item => !set1.has(item)),
    removed: arr1.filter(item => !set2.has(item)),
  };
}

export function useArrayWatcher<T>(
  array: T[],
  callback: WatchArrayCallback<T>
): void {
  const prevArrayRef = React.useRef<T[]>([]);
  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      const { added, removed } = getArrayDifferences(
        prevArrayRef.current,
        array
      );

      if (added.length || removed.length) {
        callback(array, prevArrayRef.current, added, removed);
      }
    }

    prevArrayRef.current = [...array];
  }, [array, callback]);
}
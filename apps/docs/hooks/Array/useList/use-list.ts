import { useState, useCallback } from 'react';

export interface UseListActions<T> {
  set: (l: T[]) => void;
  push: (element: T) => void;
  removeAt: (index: number) => void;
  insertAt: (index: number, element: T) => void;
  updateAt: (index: number, element: T) => void;
  clear: () => void;
}

export function useList<T>(defaultList: T[] = []): [T[], UseListActions<T>] {
  if (!Array.isArray(defaultList)) {
    throw new Error('useList: defaultList must be an array');
  }

  const [list, setList] = useState<T[]>(defaultList);

  const set = useCallback((l: T[]) => {
    if (!Array.isArray(l)) {
      throw new Error('useList.set: Argument must be an array');
    }
    setList(l);
  }, []);

  const push = useCallback((element: T) => {
    setList((l) => [...l, element]);
  }, []);

  const removeAt = useCallback((index: number) => {
    if (typeof index !== 'number' || index < 0) {
      throw new Error('useList.removeAt: Index must be a non-negative number');
    }
    setList((l) => {
      if (index >= l.length) {
        console.warn(`useList.removeAt: Index ${String(index)} is out of bounds, no removal performed`);
        return l;
      }
      return [...l.slice(0, index), ...l.slice(index + 1)];
    });
  }, []);

  const insertAt = useCallback((index: number, element: T) => {
    if (typeof index !== 'number' || index < 0) {
      throw new Error('useList.insertAt: Index must be a non-negative number');
    }
    setList((l) => {
      if (index > l.length) {
        console.warn(
          `useList.insertAt: Index ${String(index)} is out of bounds, inserting at end`, 
        );
        return [...l, element];
      }
      return [...l.slice(0, index), element, ...l.slice(index)];
    });
  }, []);

  const updateAt = useCallback((index: number, element: T) => {
    if (typeof index !== 'number' || index < 0) {
      throw new Error('useList.updateAt: Index must be a non-negative number');
    }
    setList((l) => {
      if (index >= l.length) {
        console.warn(
          `useList.updateAt: Index ${String(index)} is out of bounds, no update performed`,
        );
        return l;
      }
      return l.map((e, i) => (i === index ? element : e));
    });
  }, []);

  const clear = useCallback(() => {
    setList([]);
  }, []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}

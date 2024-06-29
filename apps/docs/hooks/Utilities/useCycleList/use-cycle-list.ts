import { useState, useCallback, useRef } from 'react';
import { type UseCycleListOptions, type UseCycleListReturn } from '../utilities';

export function useCycleList<T>(
  list: T[],
  options?: UseCycleListOptions<T>,
): UseCycleListReturn<T> {
  const {
    initialValue,
    fallbackIndex = 0,
    getIndexOf = (value: any, list: string | []) => list.indexOf(value),
  } = options ?? {};
  const listRef = useRef(list);
  const [state, setState] = useState(initialValue ?? list[fallbackIndex]);
  const [index, setIndex] = useState(getIndexOf(state, list));

  const next = useCallback(
    (n = 1) => {
      const newIndex = (index + n) % listRef.current.length;
      setIndex(newIndex);
      setState(listRef.current[newIndex]);
      return listRef.current[newIndex];
    },
    [index],
  );

  const prev = useCallback(
    (n = 1) => {
      const newIndex =
        (index - n + listRef.current.length) % listRef.current.length;
      setIndex(newIndex);
      setState(listRef.current[newIndex]);
      return listRef.current[newIndex];
    },
    [index],
  );

  const go = useCallback((i: number) => {
    const newIndex = (i + listRef.current.length) % listRef.current.length;
    setIndex(newIndex);
    setState(listRef.current[newIndex]);
    return listRef.current[newIndex];
  }, []);

  return { state, index, next, prev, go };
}

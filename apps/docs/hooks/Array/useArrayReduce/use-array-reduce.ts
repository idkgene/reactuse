import { useMemo } from 'react';

export type UseArrayReduceCallback<PV, CV, R> = (
  previousValue: PV,
  currentValue: CV,
  currentIndex: number,
  array: CV[],
) => R;

export function useArrayReduce<T, U>(
  list: T[] | null | undefined,
  reducer: UseArrayReduceCallback<U, T, U>,
  initialValue: U,
): U {
  return useMemo(() => {
    if (list === null) {
      console.warn(
        'useArrayReduce: list is null or undefined, returning initial value',
      );
      return initialValue;
    }

    if (!Array.isArray(list)) {
      throw new Error('useArrayReduce: list must be an array');
    }

    if (typeof reducer !== 'function') {
      throw new Error('useArrayReduce: reducer must be a function');
    }

    try {
      return list.reduce(reducer, initialValue);
    } catch (error) {
      console.error('useArrayReduce: Error during reduction:', error);
      return initialValue;
    }
  }, [list, reducer, initialValue]);
}

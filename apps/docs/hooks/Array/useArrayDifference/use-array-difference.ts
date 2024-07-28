import { useMemo } from 'react';

type KeySelector<T> = (item: T) => unknown;
type Comparator<T> = (a: T, b: T) => boolean;

function useArrayDifference<T>(
  list: readonly T[] | null | undefined,
  values: readonly T[] | null | undefined,
  keySelector?: KeySelector<T>,
  comparator?: Comparator<T>,
): readonly T[] {
  const difference = useMemo((): readonly T[] => {
    if (!Array.isArray(list) || !Array.isArray(values)) {
      return [];
    }

    if (comparator) {
      return list.filter(
        (item: T): boolean =>
          !values.some((otherItem: T) => comparator(item, otherItem)),
      ) as T[];
    }

    if (keySelector) {
      const valuesSet = new Set(values.map(keySelector));
      return list.filter(
        (item: T): boolean => !valuesSet.has(keySelector(item)),
      ) as T[];
    }

    const valuesSet = new Set(values);
    return list.filter((item: T): boolean => !valuesSet.has(item)) as T[];
  }, [list, values, keySelector, comparator]);

  return difference;
}

export { useArrayDifference };

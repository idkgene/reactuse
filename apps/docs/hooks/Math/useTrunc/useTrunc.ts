import * as React from 'react';
import type { TruncateNumberFn } from '../math';

export function useTrunc(initialValue = 0): [number, TruncateNumberFn] {
  const [result, setResult] = React.useState(initialValue);
  const truncateNumber: TruncateNumberFn = React.useCallback(
    (number: number) => {
      if (typeof number !== 'number') {
        console.error(
          "useTrunc: Input must be a number otherwise it'll return NaN",
        );
        return;
      }
      setResult(Math.trunc(number));
    },
    [],
  );

  return [result, truncateNumber];
}

import * as React from 'react';
import type { RoundNumberFn } from '../math';

export function useRound(initialValue = 0): [number, RoundNumberFn] {
  const [result, setResult] = React.useState<number>(initialValue);

  const roundNumber: RoundNumberFn = React.useCallback((number: number) => {
    if (typeof number !== 'number') {
      console.error(
        "useRound: Input must be a number otherwise it'll return NaN",
      );
      return;
    }
    setResult(Math.round(number));
  }, []);

  return [result, roundNumber];
}

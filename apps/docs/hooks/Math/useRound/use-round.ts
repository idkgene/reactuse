import { useState, useCallback } from 'react';

type RoundResult = number;
type RoundInput = number;

type RoundNumberFn = (number: RoundInput) => void;

export function useRound(
  initialValue: RoundInput = 0,
): [RoundResult, RoundNumberFn] {
  const [result, setResult] = useState<RoundResult>(() => {
    if (!Number.isFinite(initialValue)) {
      throw new Error('Initial value must be a finite number');
    }
    return Math.round(initialValue);
  });

  const roundNumber: RoundNumberFn = useCallback((number: RoundInput) => {
    if (!Number.isFinite(number)) {
      throw new Error('Input must be a finite number');
    }
    setResult(Math.round(number));
  }, []);

  return [result, roundNumber];
}

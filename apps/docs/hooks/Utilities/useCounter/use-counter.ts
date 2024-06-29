import { useCallback, useEffect, useState } from 'react';
import { type UseCounterOptions, type UseCounterResult } from '../utilities';

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {},
): UseCounterResult {
  const { min, max } = options;

  if (min !== undefined && max !== undefined && min > max) {
    throw new Error('Min value cannot be greater than max value');
  }

  const validateValue = useCallback((value: number): number => {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Counter value must be a valid number');
    }
    if (min !== undefined && value < min) {
      console.warn(`Value ${String(value)} is less than minimum ${String(min)}. Setting to ${String(min)}.`);
      return min;
    }
    if (max !== undefined && value > max) {
      console.warn(`Value ${String(value)} is greater than maximum ${String(max)}. Setting to ${String(max)}.`);
      return max;
    }
    return value;
  }, [min, max]);

  const [count, setCount] = useState(() => validateValue(initialValue));

  useEffect(() => {
    if (count !== validateValue(count)) {
      setCount(validateValue(count));
    }
  }, [count, validateValue]);

  const inc = useCallback((delta = 1) => {
    if (typeof delta !== 'number' || isNaN(delta)) {
      throw new Error('Increment delta must be a valid number');
    }
    setCount((prev) => validateValue(prev + delta));
  }, [validateValue]);

  const dec = useCallback((delta = 1) => {
    if (typeof delta !== 'number' || isNaN(delta)) {
      throw new Error('Decrement delta must be a valid number');
    }
    setCount((prev) => validateValue(prev - delta));
  }, [validateValue]);

  const get = useCallback(() => count, [count]);

  const set = useCallback((value: number) => {
    setCount(validateValue(value));
  }, [validateValue]);

  const reset = useCallback((value: number = initialValue) => {
    setCount(validateValue(value));
  }, [initialValue, validateValue]);

  return { count, inc, dec, get, set, reset };
}

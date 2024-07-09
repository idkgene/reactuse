import { useState, useCallback, useMemo } from 'react';

type RandomValue = number | null;

interface RandomOptions {
  min: number;
  max: number;
  isInteger: boolean;
}

interface RandomResult {
  value: RandomValue;
  generate: () => RandomValue;
  reset: () => void;
  setRange: (min: number, max: number) => void;
  toggleInteger: () => void;
}

const DEFAULT_OPTIONS: RandomOptions = {
  min: 0,
  max: 1,
  isInteger: false,
};

const validateOptions = ({ min, max }: Partial<RandomOptions>): void => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Min and max must be numbers');
  }

  if (min >= max) {
    throw new Error('Min must be less than max');
  }
};

const generateRandom = ({ min, max, isInteger }: RandomOptions): number => {
  const randomValue = Math.random() * (max - min) + min;
  return isInteger ? Math.round(randomValue) : Number(randomValue.toFixed(4));
};

const useRandom = (
  initialOptions: Partial<RandomOptions> = {},
): RandomResult => {
  const [options, setOptions] = useState<RandomOptions>({
    ...DEFAULT_OPTIONS,
    ...initialOptions,
  });
  const [value, setValue] = useState<RandomValue>(null);

  const generate = useCallback((): RandomValue => {
    try {
      validateOptions(options);
      const randomValue = generateRandom(options);
      setValue(randomValue);
      return randomValue;
    } catch (error) {
      console.error(
        'useRandom Error:',
        error instanceof Error ? error.message : 'Unexpected error',
      );
      setValue(null);
      return null;
    }
  }, [options]);

  const reset = useCallback(() => {
    setOptions(DEFAULT_OPTIONS);
    setValue(null);
  }, []);

  const setRange = useCallback((min: number, max: number) => {
    setOptions((prev) => ({ ...prev, min, max }));
  }, []);

  const toggleInteger = useCallback(() => {
    setOptions((prev) => ({ ...prev, isInteger: !prev.isInteger }));
  }, []);

  return useMemo(
    () => ({
      value,
      generate,
      reset,
      setRange,
      toggleInteger,
    }),
    [value, generate, reset, setRange, toggleInteger],
  );
};

export { useRandom as random, useRandom };
export type { RandomResult, RandomOptions };

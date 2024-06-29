import { useState, useCallback } from 'react';

interface UseRandomOptions {
  min?: number;
  max?: number;
  isInteger?: boolean;
}

const useRandom = (options: UseRandomOptions = {}) => {
  const { min = 0, max = 1, isInteger = false } = options;
  const [value, setValue] = useState<number | null>(null);

  const generate = useCallback(() => {
    try {
      if (min >= max) {
        throw new Error('Min must be less than max');
      }

      let randomValue = Math.random() * (max - min) + min;

      if (isInteger) {
        randomValue = Math.floor(randomValue);
      }

      setValue(randomValue);
      return randomValue;
    } catch (error) {
      console.error('Error in useRandom:', error);
      setValue(null);
      return null;
    }
  }, [min, max, isInteger]);

  return [value, generate] as const;
};

export { useRandom };
export const random = useRandom;

import { useState, useCallback } from 'react';

interface UseSqrtOptions {
  initialValue?: number;
}

interface UseSqrtReturn {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  calculate: () => number | null;
}

const useSqrt = (options: UseSqrtOptions = {}): UseSqrtReturn => {
  const { initialValue = 0 } = options;
  const [value, setValue] = useState<number>(initialValue);

  const calculate = useCallback(() => {
    try {
      if (value < 0) {
        throw new Error('Cannot calculate square root of a negative number');
      }
      return Math.sqrt(value);
    } catch (error) {
      console.error('Error in useSqrt:', error);
      return null;
    }
  }, [value]);

  return { value, setValue, calculate };
};

export { useSqrt };
export const sqrt = useSqrt;

import { useState, useCallback } from 'react';

interface UsePercentageOptions {
  initialValue?: number;
  total?: number;
}

interface UsePercentageReturn {
  value: number;
  setPercentage: (newValue: number) => void;
  getAbsolute: () => number;
}

const usePercentage = (options: UsePercentageOptions = {}): UsePercentageReturn  => {
  const { initialValue = 0, total = 100 } = options;
  const [value, setValue] = useState<number>(initialValue);

  const setPercentage = useCallback((newValue: number) => {
    try {
      if (newValue < 0 || newValue > 100) {
        throw new Error('Percentage must be between 0 and 100');
      }
      setValue(newValue);
    } catch (error) {
      console.error('Error in usePercentage:', error);
    }
  }, []);

  const getAbsolute = useCallback(() => {
    return (value / 100) * total;
  }, [value, total]);

  return { value, setPercentage, getAbsolute };
};

export { usePercentage };
export const percentage = usePercentage;

import * as React from 'react';

export const useSum = (array: number[]): number => {
  const [sum, setSum] = React.useState<number>(0);

  React.useEffect(() => {
    if (!Array.isArray(array)) {
      console.error('useSum: Input must be an array');
      return;
    }

    const isNumberArray = array.every((item) => typeof item === 'number');
    if (!isNumberArray) {
      console.error('useSum: Array must contain only numbers');
      return;
    }

    const total = array.reduce((acc, curr) => acc + curr, 0);
    setSum(total);
  }, [array]);

  return sum;
};

import { useCallback } from 'react';

type GCDFunction = (a: number, b: number) => number | null;

const useGCD = (): GCDFunction => {
  const gcd = useCallback((a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }, []);

  return useCallback(
    (a: number, b: number) => {
      try {
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
          throw new Error('GCD is only defined for integers');
        }
        return gcd(a, b);
      } catch (error) {
        console.error('Error in GCD calculation:', error);
        return null;
      }
    },
    [gcd],
  );
};

export { useGCD };
export const gcd = useGCD;

import { useCallback, useMemo } from 'react';

interface TrigFunctions {
  sin: (angle: number) => number;
  cos: (angle: number) => number;
  tan: (angle: number) => number;
  asin: (value: number) => number;
  acos: (value: number) => number;
  atan: (value: number) => number;
  atan2: (y: number, x: number) => number;
  sinh: (value: number) => number;
  cosh: (value: number) => number;
  tanh: (value: number) => number;
  asinh: (value: number) => number;
  acosh: (value: number) => number;
  atanh: (value: number) => number;
}

type TrigFunction = (...args: number[]) => number;

function useTrigonometry(): TrigFunctions {
  const createTrigFunction = useCallback(
    (mathFunction: TrigFunction, functionName: string): TrigFunction => {
      return (...args: number[]): number => {
        for (let i = 0; i < args.length; i++) {
          if (!Number.isFinite(args[i])) {
            throw new Error(
              `Invalid input for ${functionName}: argument ${String(i + 1)} must be a finite number`,
            );
          }
        }

        const result = mathFunction(...args);

        if (!Number.isFinite(result)) {
          throw new Error(
            `${functionName} calculation resulted in a non-finite number`,
          );
        }

        return result;
      };
    },
    [],
  );

  const trigFunctions = useMemo(
    () => ({
      sin: createTrigFunction(Math.sin, 'sin'),
      cos: createTrigFunction(Math.cos, 'cos'),
      tan: createTrigFunction(Math.tan, 'tan'),
      asin: createTrigFunction(Math.asin, 'asin'),
      acos: createTrigFunction(Math.acos, 'acos'),
      atan: createTrigFunction(Math.atan, 'atan'),
      atan2: createTrigFunction(Math.atan2, 'atan2'),
      sinh: createTrigFunction(Math.sinh, 'sinh'),
      cosh: createTrigFunction(Math.cosh, 'cosh'),
      tanh: createTrigFunction(Math.tanh, 'tanh'),
      asinh: createTrigFunction(Math.asinh, 'asinh'),
      acosh: createTrigFunction(Math.acosh, 'acosh'),
      atanh: createTrigFunction(Math.atanh, 'atanh'),
    }),
    [createTrigFunction],
  );

  return trigFunctions;
}

export { useTrigonometry };
export type { TrigFunctions };

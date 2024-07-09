import { useMemo } from 'react';

type DataPoint = number;
type DataSet = DataPoint[];

interface CorrelationResult {
  correlation: number;
  meanX: number;
  meanY: number;
  stdDevX: number;
  stdDevY: number;
}

function useCorrelation(): {
  calculateCorrelation: (dataX: DataSet, dataY: DataSet) => CorrelationResult;
} {
  return useMemo(
    () => ({
      calculateCorrelation: (
        dataX: DataSet,
        dataY: DataSet,
      ): CorrelationResult => {
        if (dataX.length !== dataY.length) {
          throw new Error('Data sets must have the same length');
        }

        if (dataX.length <= 1) {
          throw new Error('Data sets must contain at least two points');
        }

        const n = dataX.length;
        let sumX = 0,
          sumY = 0,
          sumXY = 0,
          sumX2 = 0,
          sumY2 = 0;

        for (let i = 0; i < n; i++) {
          const x = dataX[i];
          const y = dataY[i];

          if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Data sets must contain only numbers');
          }

          sumX += x;
          sumY += y;
          sumXY += x * y;
          sumX2 += x * x;
          sumY2 += y * y;
        }

        const meanX = sumX / n;
        const meanY = sumY / n;
        const stdDevX = Math.sqrt((sumX2 - (sumX * sumX) / n) / (n - 1));
        const stdDevY = Math.sqrt((sumY2 - (sumY * sumY) / n) / (n - 1));

        if (stdDevX === 0 || stdDevY === 0) {
          throw new Error('Standard deviation cannot be zero');
        }

        const correlation =
          (sumXY - (sumX * sumY) / n) / ((n - 1) * stdDevX * stdDevY);

        return { correlation, meanX, meanY, stdDevX, stdDevY };
      },
    }),
    [],
  );
}

export { useCorrelation };
export type { CorrelationResult };

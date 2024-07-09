import { useMemo } from 'react';

type DataSet = number[];

interface CovarianceResult {
  covariance: number;
  meanX: number;
  meanY: number;
}

function useCovariance(): {
  calculateCovariance: (dataX: DataSet, dataY: DataSet) => CovarianceResult;
} {
  return useMemo(
    () => ({
      calculateCovariance: (
        dataX: DataSet,
        dataY: DataSet,
      ): CovarianceResult => {
        if (dataX.length !== dataY.length || dataX.length <= 1) {
          throw new Error('Invalid data sets');
        }

        const n = dataX.length;
        const meanX = dataX.reduce((sum, x) => sum + x, 0) / n;
        const meanY = dataY.reduce((sum, y) => sum + y, 0) / n;

        const covariance =
          dataX.reduce(
            (sum, x, i) => sum + (x - meanX) * (dataY[i] - meanY),
            0,
          ) /
          (n - 1);

        return { covariance, meanX, meanY };
      },
    }),
    [],
  );
}

export { useCovariance };
export type { CovarianceResult };

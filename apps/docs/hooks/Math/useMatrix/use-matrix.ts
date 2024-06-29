import { useState, useCallback } from 'react';

type Matrix = number[][];

interface UseMatrixReturn {
  matrix: Matrix;
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>;
  add: (m: Matrix) => void;
  multiply: (m: Matrix) => void;
  transpose: () => void;
}

const useMatrix = (
  initialMatrix: Matrix = [[0]],
): {
  matrix: Matrix;
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>;
  add: (m: Matrix) => void;
  multiply: (m: Matrix) => void;
  transpose: () => void;
} => {
  const [matrix, setMatrix] = useState<Matrix>(initialMatrix);

  const add = useCallback(
    (m: Matrix) => {
      if (matrix.length !== m.length || matrix[0].length !== m[0].length) {
        throw new Error('Matrices must have the same dimensions');
      }
      setMatrix((prev) =>
        prev.map((row, i) => row.map((val, j) => val + (m[i][j] ?? 0))),
      );
    },
    [matrix],
  );

  const multiply = useCallback(
    (m: Matrix) => {
      if (matrix[0].length !== m.length) {
        throw new Error(
          'Number of columns in the first matrix must equal the number of rows in the second',
        );
      }
      const result = matrix.map((row) =>
        new Array(m[0].length)
          .fill(0)
          .map((_, i) => row.reduce((sum, cell, j) => sum + cell * m[j][i], 0)),
      );
      setMatrix(result);
    },
    [matrix],
  );

  const transpose = useCallback(() => {
    setMatrix((prev) => prev[0].map((_, i) => prev.map((row) => row[i])));
  }, []);

  return { matrix, setMatrix, add, multiply, transpose };
};

export { useMatrix };
export const matrix = useMatrix;

import { useState, useCallback, useMemo } from 'react';

type Numeric = number | { valueOf: () => number };

interface Vector3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

type VectorOperation = (v: Readonly<Vector3D>) => void;
type ScalarOperation = (scalar: Numeric) => void;

interface VectorMethods {
  add: VectorOperation;
  subtract: VectorOperation;
  scale: ScalarOperation;
  normalize: () => void;
  dot: (v: Readonly<Vector3D>) => number;
  cross: VectorOperation;
}

interface VectorProperties {
  readonly magnitude: number;
  readonly isZero: boolean;
  readonly unit: Vector3D;
}

type UseVectorReturn = Readonly<{
  vector: Readonly<Vector3D>;
  setVector: React.Dispatch<React.SetStateAction<Vector3D>>;
}> &
  VectorMethods &
  VectorProperties;

const EPSILON = 1e-10;

const isValidNumber = (n: unknown): n is number =>
  typeof n === 'number' && Number.isFinite(n);

const validateVector = (v: Readonly<Vector3D>): void => {
  if (!isValidNumber(v.x) || !isValidNumber(v.y) || !isValidNumber(v.z)) {
    throw new Error('Invalid vector: components must be finite numbers');
  }
};

const useVector = (
  initialVector: Readonly<Vector3D> = { x: 0, y: 0, z: 0 },
): UseVectorReturn => {
  validateVector(initialVector);
  const [vector, setVector] = useState<Vector3D>(initialVector);

  const createVectorOperation = useCallback(
    (operation: (a: number, b: number) => number): VectorOperation =>
      (v: Readonly<Vector3D>) => {
        validateVector(v);
        setVector((prev) => ({
          x: operation(prev.x, v.x),
          y: operation(prev.y, v.y),
          z: operation(prev.z, v.z),
        }));
      },
    [],
  );

  const add = useMemo(
    () => createVectorOperation((a, b) => a + b),
    [createVectorOperation],
  );
  const subtract = useMemo(
    () => createVectorOperation((a, b) => a - b),
    [createVectorOperation],
  );

  const scale = useCallback((scalar: Numeric) => {
    const value = Number(scalar);
    if (!isValidNumber(value)) {
      throw new Error('Invalid scalar: must be a finite number');
    }
    setVector((prev) => ({
      x: prev.x * value,
      y: prev.y * value,
      z: prev.z * value,
    }));
  }, []);

  const magnitude = useMemo(
    () => Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2),
    [vector],
  );

  const isZero = useMemo(() => magnitude < EPSILON, [magnitude]);

  const normalize = useCallback(() => {
    if (isZero) {
      throw new Error('Cannot normalize a zero vector');
    }
    setVector((prev) => {
      const mag = Math.sqrt(prev.x ** 2 + prev.y ** 2 + prev.z ** 2);
      return {
        x: prev.x / mag,
        y: prev.y / mag,
        z: prev.z / mag,
      };
    });
  }, [isZero]);

  const dot = useCallback(
    (v: Readonly<Vector3D>): number => {
      validateVector(v);
      return vector.x * v.x + vector.y * v.y + vector.z * v.z;
    },
    [vector],
  );

  const cross = useCallback((v: Readonly<Vector3D>) => {
    validateVector(v);
    setVector((prev) => ({
      x: prev.y * v.z - prev.z * v.y,
      y: prev.z * v.x - prev.x * v.z,
      z: prev.x * v.y - prev.y * v.x,
    }));
  }, []);

  const unit = useMemo((): Vector3D => {
    if (isZero) {
      return { x: 0, y: 0, z: 0 };
    }
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude,
      z: vector.z / magnitude,
    };
  }, [vector, magnitude, isZero]);

  return {
    vector,
    setVector,
    add,
    subtract,
    scale,
    normalize,
    dot,
    cross,
    magnitude,
    isZero,
    unit,
  };
};

export { useVector, useVector as vector };
export type { Vector3D, VectorOperation, ScalarOperation };
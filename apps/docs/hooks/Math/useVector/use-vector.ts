import { useState, useCallback, useMemo } from 'react';

type VectorComponent = number;
type Vector3D =
  | [VectorComponent, VectorComponent, VectorComponent]
  | readonly [VectorComponent, VectorComponent, VectorComponent];

enum VectorError {
  InvalidVector = 'Invalid vector: components must be finite numbers',
  ZeroVectorNormalization = 'Cannot normalize a zero vector',
  InvalidScalar = 'Invalid scalar: must be a finite number',
}

type VectorOperation = (v: Readonly<Vector3D>) => Vector3D;
type ScalarOperation = (scalar: number) => Vector3D;

interface VectorMethods {
  add: VectorOperation;
  subtract: VectorOperation;
  scale: ScalarOperation;
  normalize: () => Vector3D;
  dot: (v: Readonly<Vector3D>) => number;
  cross: VectorOperation;
  project: VectorOperation;
  clone: () => Vector3D;
}

interface VectorProperties {
  readonly magnitude: number;
  readonly isZero: boolean;
  readonly unit: Vector3D;
}

interface VectorComponents {
  getX: () => VectorComponent;
  getY: () => VectorComponent;
  getZ: () => VectorComponent;
}

interface UseVectorOptions {
  epsilon?: number;
}

type UseVectorReturn = Readonly<{
  vector: Readonly<Vector3D>;
  setVector: React.Dispatch<React.SetStateAction<Vector3D>>;
}> &
  VectorMethods &
  VectorProperties &
  VectorComponents;

const DEFAULT_EPSILON = 1e-10;

function isValidNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

function validateVector(v: Readonly<Vector3D>): void {
  if (!v.every(isValidNumber)) {
    throw new Error(VectorError.InvalidVector);
  }
}

function useVector(
  initialVector: Readonly<Vector3D> = [0, 0, 0],
  options: UseVectorOptions = {},
): UseVectorReturn {
  const { epsilon = DEFAULT_EPSILON } = options;

  validateVector(initialVector);
  const [vector, setVector] = useState<Vector3D>(initialVector);

  const createVectorOperation = useCallback(
    (operation: (a: number, b: number) => number): VectorOperation =>
      (v: Readonly<Vector3D>) => {
        validateVector(v);
        return vector.map((component, index) =>
          operation(component, v[index]),
        ) as Vector3D;
      },
    [vector],
  );

  const add = useCallback(
    (v: Readonly<Vector3D>) => createVectorOperation((a, b) => a + b)(v),
    [createVectorOperation],
  );

  const subtract = useCallback(
    (v: Readonly<Vector3D>) => createVectorOperation((a, b) => a - b)(v),
    [createVectorOperation],
  );

  const scale = useCallback(
    (scalar: number): Vector3D => {
      if (!isValidNumber(scalar)) {
        throw new Error(VectorError.InvalidScalar);
      }
      return vector.map((component) => component * scalar) as Vector3D;
    },
    [vector],
  );

  const magnitude = useMemo(
    () => Math.sqrt(vector.reduce((sum, component) => sum + component ** 2, 0)),
    [vector],
  );

  const isZero = useMemo(() => magnitude < epsilon, [magnitude, epsilon]);

  const normalize = useCallback((): Vector3D => {
    if (isZero) {
      throw new Error(VectorError.ZeroVectorNormalization);
    }
    return vector.map((component) => component / magnitude) as Vector3D;
  }, [vector, magnitude, isZero]);

  const dot = useCallback(
    (v: Readonly<Vector3D>): number => {
      validateVector(v);
      return vector.reduce(
        (sum, component, index) => sum + component * v[index],
        0,
      );
    },
    [vector],
  );

  const cross = useCallback(
    (v: Readonly<Vector3D>): Vector3D => {
      validateVector(v);
      const [ax, ay, az] = vector;
      const [bx, by, bz] = v;
      return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
    },
    [vector],
  );

  const project = useCallback(
    (v: Readonly<Vector3D>): Vector3D => {
      validateVector(v);
      const dotProduct = dot(v);
      const vMagnitudeSquared = v.reduce(
        (sum, component) => sum + component ** 2,
        0,
      );
      const scalar = dotProduct / vMagnitudeSquared;
      return scale(scalar);
    },
    [dot, scale],
  );

  const unit = useMemo((): Vector3D => {
    if (isZero) {
      return [0, 0, 0];
    }
    return vector.map((component) => component / magnitude) as Vector3D;
  }, [vector, magnitude, isZero]);

  const clone = useCallback((): Vector3D => [...vector], [vector]);

  const getX = useCallback(() => vector[0], [vector]);
  const getY = useCallback(() => vector[1], [vector]);
  const getZ = useCallback(() => vector[2], [vector]);

  return {
    vector,
    setVector,
    add,
    subtract,
    scale,
    normalize,
    dot,
    cross,
    project,
    magnitude,
    isZero,
    unit,
    clone,
    getX,
    getY,
    getZ,
  };
}

export { useVector };
export type { Vector3D, VectorOperation, ScalarOperation, UseVectorOptions };

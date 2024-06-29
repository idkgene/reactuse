import { useState, useCallback } from 'react';

interface Vector {
  x: number;
  y: number;
  z: number;
}

interface UseVectorReturn {
  vector: Vector;
  setVector: React.Dispatch<React.SetStateAction<Vector>>;
  add: (v: Vector) => void;
  subtract: (v: Vector) => void;
  scale: (scalar: number) => void;
  magnitude: () => number;
  normalize: () => void;
}

const useVector = (initialVector: Vector = { x: 0, y: 0, z: 0 }): UseVectorReturn => {
  const [vector, setVector] = useState<Vector>(initialVector);

  const add = useCallback((v: Vector) => {
    setVector((prev) => ({
      x: prev.x + v.x,
      y: prev.y + v.y,
      z: prev.z + v.z,
    }));
  }, []);

  const subtract = useCallback((v: Vector) => {
    setVector((prev) => ({
      x: prev.x - v.x,
      y: prev.y - v.y,
      z: prev.z - v.z,
    }));
  }, []);

  const scale = useCallback((scalar: number) => {
    setVector((prev) => ({
      x: prev.x * scalar,
      y: prev.y * scalar,
      z: prev.z * scalar,
    }));
  }, []);

  const magnitude = useCallback(() => {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
  }, [vector]);

  const normalize = useCallback(() => {
    const mag = magnitude();
    if (mag === 0) return;
    setVector((prev) => ({
      x: prev.x / mag,
      y: prev.y / mag,
      z: prev.z / mag,
    }));
  }, [magnitude]);

  return { vector, setVector, add, subtract, scale, magnitude, normalize };
};

export { useVector };
export const vector = useVector;

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVector, type Vector3D } from '../use-vector';

describe('useVector', () => {
  it('should initialize with default vector', () => {
    const { result } = renderHook(() => useVector());
    expect(result.current.vector).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('should initialize with provided vector', () => {
    const initialVector: Vector3D = { x: 1, y: 2, z: 3 };
    const { result } = renderHook(() => useVector(initialVector));
    expect(result.current.vector).toEqual(initialVector);
  });

  it('should throw an error for invalid vector components', () => {
    expect(() => useVector({ x: NaN, y: 0, z: 0 })).toThrowError();
    expect(() => useVector({ x: 0, y: Infinity, z: 0 })).toThrowError();
    expect(() => useVector({ x: 0, y: 0, z: -Infinity })).toThrowError();
  });

  it('should add vectors correctly', () => {
    const { result } = renderHook(() => useVector({ x: 1, y: 2, z: 3 }));
    act(() => {
      result.current.add({ x: 4, y: 5, z: 6 });
    });
    expect(result.current.vector).toEqual({ x: 5, y: 7, z: 9 });
  });

  it('should subtract vectors correctly', () => {
    const { result } = renderHook(() => useVector({ x: 5, y: 7, z: 9 }));
    act(() => {
      result.current.subtract({ x: 1, y: 2, z: 3 });
    });
    expect(result.current.vector).toEqual({ x: 4, y: 5, z: 6 });
  });

  it('should scale vector correctly', () => {
    const { result } = renderHook(() => useVector({ x: 1, y: 2, z: 3 }));
    act(() => {
      result.current.scale(2);
    });
    expect(result.current.vector).toEqual({ x: 2, y: 4, z: 6 });
  });

  it('should throw an error for invalid scalar', () => {
    const { result } = renderHook(() => useVector());
    expect(() => {
      act(() => {
        result.current.scale(NaN);
      });
    }).toThrowError();
    expect(() => {
      act(() => {
        result.current.scale(Infinity);
      });
    }).toThrowError();
  });

  it('should calculate magnitude correctly', () => {
    const { result } = renderHook(() => useVector({ x: 3, y: 4, z: 0 }));
    expect(result.current.magnitude).toBe(5);
  });

  it('should detect zero vector correctly', () => {
    const { result: zeroVector } = renderHook(() =>
      useVector({ x: 0, y: 0, z: 0 }),
    );
    expect(zeroVector.current.isZero).toBe(true);

    const { result: nonZeroVector } = renderHook(() =>
      useVector({ x: 1, y: 0, z: 0 }),
    );
    expect(nonZeroVector.current.isZero).toBe(false);
  });

  it('should normalize vector correctly', () => {
    const { result } = renderHook(() => useVector({ x: 3, y: 4, z: 0 }));
    act(() => {
      result.current.normalize();
    });
    expect(result.current.vector).toEqual({
      x: 0.6,
      y: 0.8,
      z: 0,
    });
  });

  it('should throw an error when normalizing a zero vector', () => {
    const { result } = renderHook(() => useVector({ x: 0, y: 0, z: 0 }));
    expect(() => {
      act(() => {
        result.current.normalize();
      });
    }).toThrowError();
  });

  it('should calculate dot product correctly', () => {
    const { result } = renderHook(() => useVector({ x: 1, y: 2, z: 3 }));
    const dotProduct = result.current.dot({ x: 4, y: 5, z: 6 });
    expect(dotProduct).toBe(32);
  });

  it('should calculate cross product correctly', () => {
    const { result } = renderHook(() => useVector({ x: 1, y: 2, z: 3 }));
    act(() => {
      result.current.cross({ x: 4, y: 5, z: 6 });
    });
    expect(result.current.vector).toEqual({ x: -3, y: 6, z: -3 });
  });

  it('should return the unit vector correctly', () => {
    const { result } = renderHook(() => useVector({ x: 3, y: 4, z: 0 }));
    expect(result.current.unit).toEqual({ x: 0.6, y: 0.8, z: 0 });
  });

  it('should return zero vector as the unit vector for a zero vector', () => {
    const { result } = renderHook(() => useVector({ x: 0, y: 0, z: 0 }));
    expect(result.current.unit).toEqual({ x: 0, y: 0, z: 0 });
  });
});

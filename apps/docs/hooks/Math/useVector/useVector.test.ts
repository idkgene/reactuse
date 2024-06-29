import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVector } from './use-vector';

describe('useVector', () => {
  it('should initialize with the correct initial vector', () => {
    const initialVector = { x: 1, y: 2, z: 3 };
    const { result } = renderHook(() => useVector(initialVector));
    expect(result.current.vector).toEqual(initialVector);
  });

  it('should initialize with the default vector when no initial vector is provided', () => {
    const { result } = renderHook(() => useVector());
    expect(result.current.vector).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('should set the vector correctly', () => {
    const { result } = renderHook(() => useVector());
    const newVector = { x: 4, y: 5, z: 6 };

    act(() => {
      result.current.setVector(newVector);
    });

    expect(result.current.vector).toEqual(newVector);
  });

  it('should add vectors correctly', () => {
    const initialVector = { x: 1, y: 2, z: 3 };
    const { result } = renderHook(() => useVector(initialVector));
    const vectorToAdd = { x: 4, y: 5, z: 6 };

    act(() => {
      result.current.add(vectorToAdd);
    });

    expect(result.current.vector).toEqual({ x: 5, y: 7, z: 9 });
  });

  it('should subtract vectors correctly', () => {
    const initialVector = { x: 4, y: 5, z: 6 };
    const { result } = renderHook(() => useVector(initialVector));
    const vectorToSubtract = { x: 1, y: 2, z: 3 };

    act(() => {
      result.current.subtract(vectorToSubtract);
    });

    expect(result.current.vector).toEqual({ x: 3, y: 3, z: 3 });
  });

  it('should scale the vector correctly', () => {
    const initialVector = { x: 1, y: 2, z: 3 };
    const { result } = renderHook(() => useVector(initialVector));
    const scalar = 2;

    act(() => {
      result.current.scale(scalar);
    });

    expect(result.current.vector).toEqual({ x: 2, y: 4, z: 6 });
  });

  it('should calculate the magnitude correctly', () => {
    const initialVector = { x: 3, y: 4, z: 0 };
    const { result } = renderHook(() => useVector(initialVector));

    const magnitude = result.current.magnitude();

    expect(magnitude).toBe(5);
  });

  it('should normalize the vector correctly', () => {
    const initialVector = { x: 3, y: 4, z: 0 };
    const { result } = renderHook(() => useVector(initialVector));

    act(() => {
      result.current.normalize();
    });

    expect(result.current.vector).toEqual({
      x: 0.6,
      y: 0.8,
      z: 0,
    });
  });

  it('should not normalize the vector when the magnitude is zero', () => {
    const initialVector = { x: 0, y: 0, z: 0 };
    const { result } = renderHook(() => useVector(initialVector));

    act(() => {
      result.current.normalize();
    });

    expect(result.current.vector).toEqual(initialVector);
  });
});

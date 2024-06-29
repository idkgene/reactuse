import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMatrix } from './use-matrix';

describe('useMatrix', () => {
  it('should initialize with default matrix', () => {
    const { result } = renderHook(() => useMatrix());
    expect(result.current.matrix).toEqual([[0]]);
  });

  it('should initialize with provided matrix', () => {
    const initialMatrix = [
      [1, 2],
      [3, 4],
    ];
    const { result } = renderHook(() => useMatrix(initialMatrix));
    expect(result.current.matrix).toEqual(initialMatrix);
  });

  it('should add matrices correctly', () => {
    const { result } = renderHook(() =>
      useMatrix([
        [1, 2],
        [3, 4],
      ]),
    );
    act(() => {
      result.current.add([
        [5, 6],
        [7, 8],
      ]);
    });
    expect(result.current.matrix).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it('should throw error when adding matrices of different dimensions', () => {
    const { result } = renderHook(() =>
      useMatrix([
        [1, 2],
        [3, 4],
      ]),
    );
    expect(() => {
      act(() => {
        result.current.add([
          [5, 6, 7],
          [8, 9, 10],
        ]);
      });
    }).toThrow('Matrices must have the same dimensions');
  });

  it('should multiply matrices correctly', () => {
    const { result } = renderHook(() =>
      useMatrix([
        [1, 2],
        [3, 4],
      ]),
    );
    act(() => {
      result.current.multiply([
        [5, 6],
        [7, 8],
      ]);
    });
    expect(result.current.matrix).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it('should throw error when multiplying incompatible matrices', () => {
    const { result } = renderHook(() =>
      useMatrix([
        [1, 2],
        [3, 4],
      ]),
    );
    expect(() => {
      act(() => {
        result.current.multiply([[5, 6, 7]]);
      });
    }).toThrow(
      'Number of columns in the first matrix must equal the number of rows in the second',
    );
  });

  it('should transpose matrix correctly', () => {
    const { result } = renderHook(() =>
      useMatrix([
        [1, 2],
        [3, 4],
      ]),
    );
    act(() => {
      result.current.transpose();
    });
    expect(result.current.matrix).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  it('should set matrix correctly', () => {
    const { result } = renderHook(() => useMatrix());
    act(() => {
      result.current.setMatrix([
        [5, 6],
        [7, 8],
      ]);
    });
    expect(result.current.matrix).toEqual([
      [5, 6],
      [7, 8],
    ]);
  });
});

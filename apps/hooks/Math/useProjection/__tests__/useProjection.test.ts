import { renderHook } from '@testing-library/react';
import { useProjection } from '../useProjection';
import { ProjectorFunction } from '../../math';

const customProjector: ProjectorFunction<number, number> = (
  value,
  fromMin,
  fromMax,
  toMin,
  toMax
) => {
  return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
};

describe('useProjection', () => {
  it('should project a value within the domain range', () => {
    const { result } = renderHook(() => useProjection(5, [0, 10], [0, 100]));
    expect(result.current).toBe(50);
  });

  it('should project a value at the minimum of the domain range', () => {
    const { result } = renderHook(() => useProjection(0, [0, 10], [0, 100]));
    expect(result.current).toBe(0);
  });

  it('should project a value at the maximum of the domain range', () => {
    const { result } = renderHook(() => useProjection(10, [0, 10], [0, 100]));
    expect(result.current).toBe(100);
  });

  it('should project a value outside the domain range', () => {
    const { result } = renderHook(() => useProjection(15, [0, 10], [0, 100]));
    expect(result.current).toBe(150);
  });

  it('should project a value using getter functions for input and domains', () => {
    const { result } = renderHook(() =>
      useProjection(
        () => 5,
        () => [0, 10] as const,
        () => [0, 100] as const
      )
    );
    expect(result.current).toBe(50);
  });

  it('should project a value using a custom projector function', () => {
    const customProjector = jest.fn((value, fromMin, fromMax, toMin, toMax) => {
      return (
        ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin
      );
    });

    const { result } = renderHook(() =>
      useProjection(5, [0, 10], [0, 100], customProjector)
    );
    expect(result.current).toBe(50);
    expect(customProjector).toHaveBeenCalledWith(5, 0, 10, 0, 100);
  });

  it('should memoize the projected value', () => {
    const projector = jest.fn((value, fromMin, fromMax, toMin, toMax) => {
      return (
        ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin
      );
    });

    const { result, rerender } = renderHook(
      ({ input, fromDomain, toDomain }) =>
        useProjection(input, fromDomain, toDomain, projector),
      {
        initialProps: {
          input: 5,
          fromDomain: [0, 10] as const,
          toDomain: [0, 100] as const,
        },
      }
    );

    expect(result.current).toBe(50);
    expect(projector).toHaveBeenCalledTimes(1);

    rerender({
      input: 5,
      fromDomain: [0, 10] as const,
      toDomain: [0, 100] as const,
    });

    expect(result.current).toBe(50);
    expect(projector).toHaveBeenCalledTimes(1);
  });

  test('should handle fromDomain as a function returning an array', () => {
    const fromDomainFn = () => [0, 10] as const;
    const { result } = renderHook(() =>
      useProjection(5, fromDomainFn, [0, 100])
    );
    expect(result.current).toBe(50);
  });

  test('should handle toDomain as a function returning an array', () => {
    const toDomainFn = () => [0, 100] as const;
    const { result } = renderHook(() => useProjection(5, [0, 10], toDomainFn));
    expect(result.current).toBe(50);
  });

  test('should handle both fromDomain and toDomain as functions returning arrays', () => {
    const fromDomainFn = () => [0, 10] as const;
    const toDomainFn = () => [0, 100] as const;
    const { result } = renderHook(() =>
      useProjection(5, fromDomainFn, toDomainFn)
    );
    expect(result.current).toBe(50);
  });

  test('should use the default projector when no custom projector is provided', () => {
    const { result } = renderHook(() => useProjection(5, [0, 10], [0, 100]));
    expect(result.current).toBe(50);
  });

  test('should project input value using a custom projector', () => {
    const { result } = renderHook(() =>
      useProjection(5, [0, 10], [0, 100], customProjector)
    );
    expect(result.current).toBe(50);
  });

  it('should handle fromDomain as an array', () => {
    const { result } = renderHook(() => useProjection(5, [0, 10], [0, 100]));
    expect(result.current).toBe(50);
  });

  it('should handle toDomain as an array', () => {
  const { result } = renderHook(() => useProjection(5, [0, 10], [0, 100]));
  expect(result.current).toBe(50);
});
});

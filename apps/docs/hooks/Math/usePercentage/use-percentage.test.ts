import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePercentage } from './use-percentage';

describe('usePercentage', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePercentage());
    expect(result.current.value).toBe(0);
    expect(result.current.getAbsolute()).toBe(0);
  });

  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => usePercentage({ initialValue: 50 }));
    expect(result.current.value).toBe(50);
    expect(result.current.getAbsolute()).toBe(50);
  });

  it('should initialize with provided total', () => {
    const { result } = renderHook(() =>
      usePercentage({ initialValue: 50, total: 200 }),
    );
    expect(result.current.value).toBe(50);
    expect(result.current.getAbsolute()).toBe(100);
  });

  it('should set percentage correctly', () => {
    const { result } = renderHook(() => usePercentage());
    act(() => {
      result.current.setPercentage(75);
    });
    expect(result.current.value).toBe(75);
    expect(result.current.getAbsolute()).toBe(75);
  });

  it('should not set percentage below 0', () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { result } = renderHook(() => usePercentage());
    act(() => {
      result.current.setPercentage(-10);
    });
    expect(result.current.value).toBe(0);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in usePercentage:',
      new Error('Percentage must be between 0 and 100'),
    );
    consoleSpy.mockRestore();
  });

  it('should not set percentage above 100', () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { result } = renderHook(() => usePercentage());
    act(() => {
      result.current.setPercentage(110);
    });
    expect(result.current.value).toBe(0);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error in usePercentage:',
      new Error('Percentage must be between 0 and 100'),
    );
    consoleSpy.mockRestore();
  });

  it('should calculate absolute value correctly', () => {
    const { result } = renderHook(() =>
      usePercentage({ initialValue: 25, total: 400 }),
    );
    expect(result.current.getAbsolute()).toBe(100);
  });
});

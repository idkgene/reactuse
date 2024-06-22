import { renderHook } from '@testing-library/react';
import { useSupported } from '../useSupported';
import { expect, it, describe } from 'vitest';

describe('useSupported', () => {
  it('should return true if the feature is supported', () => {
    const { result } = renderHook(() =>
      useSupported(() => 'getBattery' in navigator),
    );

    expect(result.current).toBe('getBattery' in navigator);
  });

  it('should return false if the feature is not supported', () => {
    const { result } = renderHook(() =>
      useSupported(() => 'someUnsupportedFeature' in navigator),
    );

    expect(result.current).toBe(false);
  });

  it('should handle errors gracefully and return false', () => {
    const { result } = renderHook(() =>
      useSupported(() => {
        throw new Error('Test error');
      }),
    );

    expect(result.current).toBe(false);
  });
});

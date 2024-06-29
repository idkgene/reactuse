import { renderHook } from '@testing-library/react';
import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest';
import { logicOr, or } from '../logicOr';

describe('logicOr function', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return false when called with no arguments', () => {
    const { result } = renderHook(() => logicOr());
    expect(result.current).toBe(false);
    expect(console.warn).toHaveBeenCalledWith(
      'logicOr called with no arguments',
    );
  });

  it('should return true if any argument is true', () => {
    const { result } = renderHook(() => logicOr(false, true, false));
    expect(result.current).toBe(true);
  });

  it('should return false if all arguments are false', () => {
    const { result } = renderHook(() => logicOr(false, false, false));
    expect(result.current).toBe(false);
  });

  it('should work with function arguments', () => {
    const { result } = renderHook(() =>
      logicOr(
        () => false,
        () => true,
        () => false,
      ),
    );
    expect(result.current).toBe(true);
  });

  it('should handle mixed value and function arguments', () => {
    const { result } = renderHook(() => logicOr(false, () => true, false));
    expect(result.current).toBe(true);
  });

  it('should return false if all function arguments return false', () => {
    const { result } = renderHook(() =>
      logicOr(
        () => false,
        () => false,
      ),
    );
    expect(result.current).toBe(false);
  });

  it('should handle errors in function arguments', () => {
    const errorFn = () => {
      throw new Error('Test error');
    };
    const { result } = renderHook(() => logicOr(errorFn, false, true));
    expect(result.current).toBe(true);
    expect(console.warn).toHaveBeenCalledWith(
      'Error evaluating argument in logicOr:',
      expect.any(Error),
    );
  });

  it('should return false if all arguments throw errors', () => {
    const errorFn1 = () => {
      throw new Error('Test error 1');
    };
    const errorFn2 = () => {
      throw new Error('Test error 2');
    };
    const { result } = renderHook(() => logicOr(errorFn1, errorFn2));
    expect(result.current).toBe(false);
    expect(console.warn).toHaveBeenCalledTimes(2);
  });

  it('should handle unexpected errors', () => {
    const unexpectedError = new Error('Unexpected error');
    const mockSome = vi.spyOn(Array.prototype, 'some');
    mockSome.mockImplementation(() => {
      throw unexpectedError;
    });
  
    const { result } = renderHook(() => logicOr(true, false));
    expect(result.current).toBe(false);
    expect(console.error).toHaveBeenCalledWith(
      'Unexpected error in logicOr:',
      unexpectedError,
    );
  
    mockSome.mockRestore();
  });

  it('should export logicOr as or', () => {
    expect(or).toBe(logicOr);
  });
});

describe('resolveValue function', () => {
  it('should resolve a value', () => {
    const { result } = renderHook(() => logicOr(true));
    expect(result.current).toBe(true);
  });

  it('should resolve a function', () => {
    const { result } = renderHook(() => logicOr(() => true));
    expect(result.current).toBe(true);
  });

  it('should handle errors in resolveValue', () => {
    const errorFn = () => {
      throw new Error('Test error');
    };
    const { result } = renderHook(() => logicOr(errorFn));
    expect(result.current).toBe(false);
  });
});

import { renderHook, act } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { useList } from '../use-list';

describe('useList', () => {
  it('should intialize with an empty array when no default is provided', () => {
    const { result } = renderHook(() => useList());
    expect(result.current[0]).toEqual([]);
  });

  it('should initialize with the provided default array', () => {
    const defaultArray = [1, 2, 3];
    const { result } = renderHook(() => useList(defaultArray));
    expect(result.current[0]).toEqual(defaultArray);
  });

  it('should throw an error if defaultList is not an array', () => {
    expect(() => {
      renderHook(() => useList('not an array' as unknown as never));
    }).toThrow('useList: defaultList must be an array');
  });

  it('should set the list', () => {
    const { result } = renderHook(() => useList<number>());
    act(() => {
      result.current[1].set([1, 2, 3]);
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('should throw an error when setting with a non-array', () => {
    const { result } = renderHook(() => useList<number>());
    expect(() => {
      act(() => {
        result.current[1].set('not an array' as unknown as never);
      });
    }).toThrow('useList.set: Argument must be an array');
  });

  it('should push an element to the list', () => {
    const { result } = renderHook(() => useList<number>([1, 2]));
    act(() => {
      result.current[1].push(3);
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('should remove an element at a specific index', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    act(() => {
      result.current[1].removeAt(1);
    });
    expect(result.current[0]).toEqual([1, 3]);
  });

  it('should throw an error when removing with a negative index', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    expect(() => {
      act(() => {
        result.current[1].removeAt(-1);
      });
    }).toThrow('useList.removeAt: Index must be a non-negative number');
  });

  it('should not remove when index is out of bounds', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {
      // noop
    });
    act(() => {
      result.current[1].removeAt(5);
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
    expect(spy).toHaveBeenCalledWith(
      'useList.removeAt: Index 5 is out of bounds, no removal performed',
    );
    spy.mockRestore();
  });

  it('should insert an element at a specific index', () => {
    const { result } = renderHook(() => useList<number>([1, 3]));
    act(() => {
      result.current[1].insertAt(1, 2);
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('should throw an error when inserting with a negative index', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    expect(() => {
      act(() => {
        result.current[1].insertAt(-1, 4);
      });
    }).toThrow('useList.insertAt: Index must be a non-negative number');
  });

  it('should insert at the end when index is out of bounds', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {
      // noop
    });
    act(() => {
      result.current[1].insertAt(5, 4);
    });
    expect(result.current[0]).toEqual([1, 2, 3, 4]);
    expect(spy).toHaveBeenCalledWith(
      'useList.insertAt: Index 5 is out of bounds, inserting at end',
    );
    spy.mockRestore();
  });

  it('should throw an error when updating with a negative index', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    expect(() => {
      act(() => {
        result.current[1].updateAt(-1, 4);
      });
    }).toThrow('useList.updateAt: Index must be a non-negative number');
  });

  it('should not update when index is out of bounds', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {
      // noop
    });
    act(() => {
      result.current[1].updateAt(5, 4);
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
    expect(spy).toHaveBeenCalledWith(
      'useList.updateAt: Index 5 is out of bounds, no update performed',
    );
    spy.mockRestore();
  });

  it('should update an element at a specific index', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    act(() => {
      result.current[1].updateAt(1, 4);
    });
    expect(result.current[0]).toEqual([1, 4, 3]);
  });

  it('should clear the list', () => {
    const { result } = renderHook(() => useList<number>([1, 2, 3]));
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0]).toEqual([]);
  });
});

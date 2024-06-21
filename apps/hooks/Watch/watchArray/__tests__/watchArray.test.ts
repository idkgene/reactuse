import { renderHook } from '@testing-library/react';
import { useArrayWatcher } from '../watchArray';

type WatchArrayCallback<T> = (
  newArray: T[],
  oldArray: T[],
  added: T[],
  removed: T[]
) => void;

describe('useArrayWatcher', () => {
  let callback: jest.Mock<WatchArrayCallback<number>>;

  beforeEach(() => {
    callback = jest.fn();
  });

  it('does not call the callback on the initial render', () => {
    renderHook(({ array }) => useArrayWatcher(array, callback), {
      initialProps: { array: [1, 2, 3] },
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('calls the callback when items are added', () => {
    const { rerender } = renderHook(
      ({ array }) => useArrayWatcher(array, callback),
      {
        initialProps: { array: [1, 2, 3] },
      }
    );

    rerender({ array: [1, 2, 3, 4, 5] });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      [1, 2, 3, 4, 5],
      [1, 2, 3],
      [4, 5],
      []
    );
  });

  it('calls the callback when items are removed', () => {
    const { rerender } = renderHook(
      ({ array }) => useArrayWatcher(array, callback),
      {
        initialProps: { array: [1, 2, 3, 4, 5] },
      }
    );

    rerender({ array: [1, 2] });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      [1, 2],
      [1, 2, 3, 4, 5],
      [],
      [3, 4, 5]
    );
  });

  it('calls the callback when items are added and removed', () => {
    const { rerender } = renderHook(
      ({ array }) => useArrayWatcher(array, callback),
      {
        initialProps: { array: [1, 2, 3, 4] },
      }
    );

    rerender({ array: [2, 3, 4, 5, 6] });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      [2, 3, 4, 5, 6],
      [1, 2, 3, 4],
      [5, 6],
      [1]
    );
  });

  it('calls the callback with no changes when arrays are identical', () => {
    const { rerender } = renderHook(
      ({ array }) => useArrayWatcher(array, callback),
      {
        initialProps: { array: [1, 2, 3] },
      }
    );

    rerender({ array: [1, 2, 3] });

    expect(callback).not.toHaveBeenCalled();
  });
});
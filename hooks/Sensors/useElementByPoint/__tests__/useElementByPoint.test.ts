import { renderHook, act } from '@testing-library/react';
import { useElementByPoint } from '../useElementByPoint';

const mockElement = document.createElement('div');
const mockElements = [mockElement, document.createElement('div')];

beforeAll(() => {
  Object.defineProperty(document, 'elementFromPoint', {
    value: jest.fn().mockReturnValue(mockElement),
  });
  Object.defineProperty(document, 'elementsFromPoint', {
    value: jest.fn().mockReturnValue(mockElements),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useElementByPoint', () => {
  it('should return correct element by given coordinates', () => {
    const { result } = renderHook(() => useElementByPoint({ x: 100, y: 50 }));
    expect(result.current.element).toBe(mockElement);
    expect(document.elementFromPoint).toHaveBeenCalledWith(100, 50);
  });

  it('should return an array of elements when multiple = true', () => {
    const { result } = renderHook(() =>
      useElementByPoint({ x: 100, y: 50, multiple: true })
    );
    expect(result.current.element).toEqual(mockElements);
    expect(document.elementsFromPoint).toHaveBeenCalledWith(100, 50);
  });

  it('should update the element when coordinates change', () => {
    const { result, rerender } = renderHook(
      ({ x, y }) => useElementByPoint({ x, y }),
      { initialProps: { x: 100, y: 50 } }
    );

    expect(result.current.element).toBe(mockElement);
    expect(document.elementFromPoint).toHaveBeenCalledWith(100, 50);

    act(() => {
      rerender({ x: 200, y: 100 });
    });

    expect(result.current.element).toBe(mockElement);
    expect(document.elementFromPoint).toHaveBeenCalledWith(200, 100);
  });

  it('should return null, if elementFromPoint returned null', () => {
    (document.elementFromPoint as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useElementByPoint({ x: 100, y: 50 }));
    expect(result.current.element).toBeNull();
  });

  it('should return null, if elementsFromPoint returned null', () => {
    (document.elementsFromPoint as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() =>
      useElementByPoint({ x: 100, y: 50, multiple: true })
    );
    expect(result.current.element).toBeNull();
  });
});

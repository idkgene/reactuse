import { renderHook, act, waitFor } from '@testing-library/react';
import { expect, it, describe, beforeEach, vi } from 'vitest';
import { useParentElement } from '../useParentElement';

describe('useParentElement', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div>
      <div id="parent">
        <div id="child"></div>
      </div>
    </div>
  `;
  });

  it('should return the parent element when using a ref object', () => {
    const childRef = { current: document.getElementById('child') };
    const { result } = renderHook(() => useParentElement(childRef));

    expect(result.current.current).toBe(document.getElementById('parent'));
  });

  it('should return the parent element when using a function', () => {
    const getChildElement = () => document.getElementById('child');
    const { result } = renderHook(() => useParentElement(getChildElement));

    expect(result.current.current).toBe(document.getElementById('parent'));
  });
});

it('should update the parent element when the DOM changes', async () => {
  const childRef = { current: document.getElementById('child') };
  const { result } = renderHook(() => useParentElement(childRef));

  expect(result.current.current).toBe(document.getElementById('parent'));

  act(() => {
    const newParent = document.createElement('div');
    newParent.id = 'new-parent';
    document.body.appendChild(newParent);

    const newChild = document.createElement('div');
    newChild.id = 'new-child';
    newParent.appendChild(newChild);
    childRef.current = newChild;
  });

  await waitFor(() => {
    expect(result.current.current).toBe(document.getElementById('new-parent'));
  });
});

it('should return undefined when the element ref is null', () => {
  const childRef = { current: null };
  const { result } = renderHook(() => useParentElement(childRef));

  expect(result.current.current).toBeUndefined();
});

it('should return undefined when the element ref is undefined', () => {
  const { result } = renderHook(() => useParentElement(undefined));

  expect(result.current.current).toBeUndefined();
});

it('should disconnect the MutationObserver on unmount', () => {
  const childRef = { current: document.getElementById('child') };
  const { unmount } = renderHook(() => useParentElement(childRef));

  const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect');

  unmount();

  expect(disconnectSpy).toHaveBeenCalled();
});

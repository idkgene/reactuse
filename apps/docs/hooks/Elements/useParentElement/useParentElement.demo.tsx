'use client';

import { useRef } from 'react';
import { useParentElement } from './useParentElement';

export default function ParentElementDemo() {
  const elementRef = useRef<HTMLDivElement>(null);
  const parentRef = useParentElement(elementRef);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white px-6 py-8 shadow-lg">
        <div className="mb-6">
          <label
            htmlFor="element"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Element
          </label>
          <div
            id="element"
            ref={elementRef}
            className="rounded-md border border-gray-300 p-4 text-gray-600"
          >
            This is the element.
          </div>
        </div>
        <div>
          <label
            htmlFor="parent"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Parent Element
          </label>
          <div
            id="parent"
            className="rounded-md border border-gray-300 p-4 text-gray-600"
            ref={parentRef}
          >
            {parentRef.current
              ? 'This is the parent element.'
              : 'No parent element found.'}
          </div>
        </div>
      </div>
    </div>
  );
}

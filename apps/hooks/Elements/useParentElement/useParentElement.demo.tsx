'use client';

import { useRef } from 'react';

import { useParentElement } from './useParentElement';

export default function ParentElementDemo() {
  const elementRef = useRef<HTMLDivElement>(null);
  const parentRef = useParentElement(elementRef);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <label
            htmlFor="element"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Element
          </label>
          <div
            id="element"
            ref={elementRef}
            className="border border-gray-300 rounded-md p-4 text-gray-600"
          >
            This is the element.
          </div>
        </div>
        <div>
          <label
            htmlFor="parent"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Parent Element
          </label>
          <div
            id="parent"
            className="border border-gray-300 rounded-md p-4 text-gray-600"
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

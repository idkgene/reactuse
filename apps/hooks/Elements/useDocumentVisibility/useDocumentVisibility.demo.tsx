'use client';

import { useDocumentVisibility } from './useDocumentVisibility';

export default function DocumentVisibilityDemo() {
  const visibilityState = useDocumentVisibility();

  return <h1>Document Visibility State: {visibilityState}</h1>;
}

'use client';

import { useDocumentVisibility } from './use-document-visibility';

export default function DocumentVisibilityDemo() {
  const visibilityState = useDocumentVisibility();

  return <h1>Document Visibility State: {visibilityState}</h1>;
}

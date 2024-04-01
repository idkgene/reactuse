/**
 * A React hook that provides the current readyState of the document.
 *
 * The readyState of the document can be one of the following values:
 * - 'loading': The document is still loading.
 * - 'interactive': The document has finished parsing but is still loading sub-resources.
 * - 'complete': The document and all sub-resources have finished loading.
 *
 * @module useDocumentReadyState
 * @returns {DocumentReadyState} The current readyState of the document.
 */

import { useEffect, useState } from 'react';

export function useDocumentReadyState(): DocumentReadyState {
  // Use the useState hook to manage the state of the readyState
  const [readyState, setReadyState] = useState<DocumentReadyState>(() => {
    // Check if the document object is available
    if (typeof document !== 'undefined') {
      // If available, return the current readyState
      return document.readyState as DocumentReadyState;
    }
    // If not available (e.g., server-side rendering), return 'loading'
    return 'loading';
  });

  useEffect(() => {
    // Check if the document object is available
    if (typeof document === 'undefined') {
      // If not available, return early to avoid accessing properties on undefined
      return;
    }

    // Define a function to handle readyState changes
    const onStateChange = () => {
      setReadyState(document.readyState as DocumentReadyState);
    };

    // Add an event listener for the 'readystatechange' event
    document.addEventListener('readystatechange', onStateChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('readystatechange', onStateChange);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Return the current readyState
  return readyState;
}
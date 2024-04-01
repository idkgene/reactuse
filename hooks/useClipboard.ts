/**
 * A React hook that provides functionality to copy text to the clipboard.
 *
 * @module useCopyToClipBoard
 * @param {string|null} [copiedValue=null] - The initial value of the copied text. Defaults to null.
 * @param {CopyFn} [copyFn] - A custom copy function to use instead of the default implementation.
 * @returns {[CopiedValue, CopyFn]} An array containing the current copied value and a copy function.
 *
 * @typedef {string|null} CopiedValue - The type representing the value of the copied text.
 * @typedef {(text: string) => Promise<boolean>} CopyFn - The type representing the copy function.
 */

import { useState, useCallback } from "react";

export type CopiedValue = string | null;
export type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipBoard(copiedValue: CopiedValue = null, copyFn?: CopyFn) {
  // Use the useState hook to manage the state of the copied text
  const [copiedText, setCopiedText] = useState<CopiedValue>(copiedValue);

/**
 * The default copy function used by the `useCopyToClipBoard` hook.
 *
 * @param {string} text - The text to be copied to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the copy operation was successful, or `false` otherwise.
 */  const copy: CopyFn = useCallback(async (text) => {
    // Check if the navigator.clipboard API is supported
    if (navigator?.clipboard) {
      try {
        // Use the navigator.clipboard.writeText method to copy the text to the clipboard
        await navigator.clipboard.writeText(text);
        // Update the copied text state with the successfully copied text
        setCopiedText(text);
        return true;
      } catch (error) {
        console.warn('Copy failed', error);
        // Reset the copied text state to null in case of an error
        setCopiedText(null);
        return false;
      }
    } else {
      console.warn('Clipboard not supported');
      return false;
    }
  }, []);

  // Return the current copied text state and the memoized copy function
  return [copiedText, copyFn || copy];
}
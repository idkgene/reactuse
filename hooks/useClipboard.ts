/**
 * @module useCopyToClipBoard
 * @param {string|null} [copiedValue=null] - The initial value of the copied text. Defaults to null.
 * @param {CopyFn} [copyFn] - A custom copy function to use instead of the default implementation.
 * @returns {[CopiedValue, CopyFn]} An array containing the current copied value and a copy function.
 *
 * @typedef {string|null} CopiedValue - The type representing the value of the copied text.
 * @typedef {(text: string) => Promise<boolean>} CopyFn - The type representing the copy function.
 */

import { useCallback, useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipBoard(copiedValue: CopiedValue = null, copyFn?: CopyFn): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(copiedValue);

/**
 * @param {string} text - The text to be copied to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the copy operation was successful, or `false` otherwise.
 */  const copy: CopyFn = useCallback(async (text) => {
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      } catch (error) {
        console.warn('useClipboard: Copy failed', error);
        setCopiedText(null);
        return false;
      }
    } else {
      console.warn('CuseClipboard: lipboard not supported');
      return false;
    }
  }, []);

  return [copiedText, copyFn || copy];
}
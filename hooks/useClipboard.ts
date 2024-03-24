/**
 * A React hook that provides functionality to copy text to the clipboard.
 *
 * @module useCopyToClipBoard
 * @param {string|null} copiedValue - The initial value of the copied text.
 * @param {CopyFn} copyFn - A custom copy function to use instead of the default implementation.
 * @returns {[CopiedValue, CopyFn]} An array containing the current copied value and a copy function.
 *
 * @typedef {string|null} CopiedValue - The type representing the value of the copied text.
 * @typedef {(text: string, callback: () => void) => Promise<boolean>} CopyFn - The type representing the copy function.
 */

import { useState } from "react";

export type CopiedValue = string | null;
export type CopyFn = (text: string, callback: () => void) => Promise<boolean>;

export function useCopyToClipBoard(copiedValue: CopiedValue, copyFn: CopyFn) {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);;

  const copy: CopyFn = async (text, callback) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      callback();
      return true;
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null);
      return false;
    }
  }

  return [copiedText, copy];
}
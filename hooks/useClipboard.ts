import { useState } from "react";

export type CopiedValue = string | null;
export type CopyFn = (text: string, callback: () => void) => Promise<boolean>;

/**
 *
 * @param text
 * @param callback
 * @returns
 */
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
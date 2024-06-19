import { useEffect, useState } from 'react';

/**
 * Configuration object for the useTextSelection hook.
 *
 * @typedef {Object} ConfigurableWindow
 * @property {Window} [window] - The window object to track selection in.
 * Defaults to the global window object.
 */
interface ConfigurableWindow {
  window?: Window;
}

/**
 * The Selection interface represents the range of text selected by the user or
 * the current position of the caret.
 *
 * @interface Selection
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Selection
 */
interface Selection {
  anchorNode: Node | null;
  anchorOffset: number;
  focusNode: Node | null;
  focusOffset: number;
  isCollapsed: boolean;
  rangeCount: number;
  type: string;
  addRange: (range: Range) => void;
  collapse: (node: Node | null, offset?: number | undefined) => void;
  collapseToEnd: () => void;
  collapseToStart: () => void;
  containsNode: (
    node: Node,
    allowPartialContainment?: boolean | undefined
  ) => boolean;
  deleteFromDocument: () => void;
  empty: () => void;
  extend: (node: Node, offset?: number | undefined) => void;
  getRangeAt: (index: number) => Range;
  modify: (
    alter?: string | undefined,
    direction?: string | undefined,
    granularity?: string | undefined
  ) => void;
  removeAllRanges: () => void;
  removeRange: (range: Range) => void;
  selectAllChildren: (node: Node) => void;
  setBaseAndExtent: (
    anchorNode: Node,
    anchorOffset: number,
    focusNode: Node,
    focusOffset: number
  ) => void;
  setPosition: (node: Node | null, offset?: number | undefined) => void;
  toString: () => string;
}

/**
 * Return type of the useTextSelection hook.
 *
 * @typedef {Object} UseTextSelectionReturn
 * @property {string} text - The currently selected text.
 * @property {DOMRect[]} rects - An array of DOMRect objects representing the
 * bounding rectangles of the selected text.
 * @property {Range[]} ranges - An array of Range objects representing the
 * selected ranges of text.
 * @property {Selection | null} selection - The current Selection object or null
 * if no text is selected.
 */
interface UseTextSelectionReturn {
  text: string;
  rects: DOMRect[];
  ranges: Range[];
  selection: Selection | null;
}

/**
 * Hook for tracking text selection in a window.
 *
 * @param {ConfigurableWindow} [options] - Optional configuration object.
 * @param {Window} [options.window] - The window object to track selection in.
 * Defaults to the global window object.
 * @returns {UseTextSelectionReturn} An object containing the selected text,
 * rects, ranges, and the selection object.
 *
 * @example
 * const { text, rects, ranges, selection } = useTextSelection();
 * console.log(`Selected text: ${text}`);
 * console.log(`Selection rects: ${rects}`);
 * console.log(`Selection ranges: ${ranges}`);
 * console.log(`Selection object: ${selection}`);
 */
export const useTextSelection = (
  options?: ConfigurableWindow
): UseTextSelectionReturn => {
  const { window = globalThis.window } = options || {};

  const [selection, setSelection] = useState<Selection | null>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      setSelection(selection as Selection);
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [window]);

  const text = selection?.toString() || '';
  const rects = selection
    ? Array.from(selection.getRangeAt(0).getClientRects())
    : [];
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, i) =>
        selection.getRangeAt(i)
      )
    : [];

  return {
    text,
    rects,
    ranges,
    selection,
  };
};

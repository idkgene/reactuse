import { useEffect, useState } from 'react';

interface ConfigurableWindow {
  window?: Window;
}

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
    allowPartialContainment?: boolean | undefined,
  ) => boolean;
  deleteFromDocument: () => void;
  empty: () => void;
  extend: (node: Node, offset?: number | undefined) => void;
  getRangeAt: (index: number) => Range;
  modify: (
    alter?: string | undefined,
    direction?: string | undefined,
    granularity?: string | undefined,
  ) => void;
  removeAllRanges: () => void;
  removeRange: (range: Range) => void;
  selectAllChildren: (node: Node) => void;
  setBaseAndExtent: (
    anchorNode: Node,
    anchorOffset: number,
    focusNode: Node,
    focusOffset: number,
  ) => void;
  setPosition: (node: Node | null, offset?: number | undefined) => void;
  toString: () => string;
}

interface UseTextSelectionReturn {
  text: string;
  rects: DOMRect[];
  ranges: Range[];
  selection: Selection | null;
}

export const useTextSelection = (
  options?: ConfigurableWindow,
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
        selection.getRangeAt(i),
      )
    : [];

  return {
    text,
    rects,
    ranges,
    selection,
  };
};

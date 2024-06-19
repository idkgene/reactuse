import * as React from 'react';

interface UseTextSelectionReturn {
  text: string;
  rects: DOMRect[];
  ranges: Range[];
  selection: Selection | null;
}

function useTextSelection(): UseTextSelectionReturn {
  const [text, setText] = React.useState('');
  const [rects, setRects] = React.useState<DOMRect[]>([]);
  const [ranges, setRanges] = React.useState<Range[]>([]);
  const [selection, setSelection] = React.useState<Selection | null>(null);

  React.useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection) {
        setText(selection.toString());
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        setRects(range ? Array.from(range.getClientRects()) : []);
        setRanges(range ? [range] : []);
        setSelection(selection);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return { text, rects, ranges, selection };
}

export default useTextSelection;

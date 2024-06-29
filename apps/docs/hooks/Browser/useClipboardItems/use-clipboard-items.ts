import { useCallback, useEffect, useState } from 'react';

export interface UseClipboardItemsOptions<Source> {
  read?: boolean;
  source?: Source;
  copiedDuring?: number;
}

export interface UseClipboardItemsReturn<Optional> {
  isSupported: boolean;
  content: ClipboardItems | null;
  copied: boolean;
  copy: Optional extends true
    ? () => Promise<void>
    : (text: ClipboardItems) => Promise<void>;
}

export function useClipboardItems(
  options: UseClipboardItemsOptions<ClipboardItems | undefined> = {},
): UseClipboardItemsReturn<boolean> {
  const { read = false, source, copiedDuring = 1500 } = options;
  const isSupported = typeof navigator.clipboard.write === 'function';
  const [content, setContent] = useState<ClipboardItems | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    if (!isSupported || !source) return;
    await navigator.clipboard.write(source);
    setContent(source);
    setCopied(true);
    setTimeout(() => { setCopied(false); }, copiedDuring);
  }, [isSupported, source, copiedDuring]);

  useEffect(() => {
    if (!isSupported || !read) return;
    const getContent = async () => {
      const content = await navigator.clipboard.read();
      setContent(content);
    };
    getContent();
  }, [isSupported, read]);

  return { isSupported, content, copied, copy };
}

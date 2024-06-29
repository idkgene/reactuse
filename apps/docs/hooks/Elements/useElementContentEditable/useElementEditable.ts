import { useRef, useState, useEffect, useCallback } from 'react';

interface ContentEditableOptions {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  sanitize?: (content: string) => string;
}

interface UseElementContentEditableReturn {
  ref: React.RefObject<HTMLElement>;
  content: string;
  isEditing: boolean;
  setEditable: (editable: boolean) => void;
  setContent: (content: string) => void;
}

export function useElementContentEditable(
  options: ContentEditableOptions = {},
): UseElementContentEditableReturn {
  const {
    initialContent = '',
    onContentChange,
    sanitize = (content: string) => content,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const updateContent = useCallback(() => {
    if (elementRef.current) {
      const newContent = sanitize(elementRef.current.innerHTML);
      setContent(newContent);
      onContentChange?.(newContent);
    }
  }, [sanitize, onContentChange]);

  const setEditable = useCallback(
    (editable: boolean) => {
      if (elementRef.current) {
        elementRef.current.contentEditable = editable.toString();
        setIsEditing(editable);
        if (editable) {
          elementRef.current.focus();
        } else {
          updateContent();
        }
      }
    },
    [updateContent],
  );

  const handleBlur = useCallback(() => {
    updateContent();
    setIsEditing(false);
  }, [updateContent]);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.addEventListener('blur', handleBlur);
      return () => {
        element.removeEventListener('blur', handleBlur);
      };
    }
  }, [handleBlur]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.innerHTML = content;
    }
  }, [content]);

  const setContentAndUpdate = useCallback(
    (newContent: string) => {
      const sanitizedContent = sanitize(newContent);
      setContent(sanitizedContent);
      if (elementRef.current) {
        elementRef.current.innerHTML = sanitizedContent;
      }
      onContentChange?.(sanitizedContent);
    },
    [sanitize, onContentChange],
  );

  return {
    ref: elementRef,
    content,
    isEditing,
    setEditable,
    setContent: setContentAndUpdate,
  };
}

import * as React from 'react';

export interface UseDropzoneReturn {
  files: File[] | null;
  isOverDropZone: boolean;
}

export interface UseDropzoneOptions {
  dataTypes?: string[] | ((types: readonly string[]) => boolean);
  onDrop?: (files: File[] | null, event: DragEvent) => void;
  onEnter?: (files: File[] | null, event: DragEvent) => void;
  onLeave?: (files: File[] | null, event: DragEvent) => void;
  onOver?: (files: File[] | null, event: DragEvent) => void;
}

export function useDropZone(
  target: React.RefObject<HTMLElement> | (() => HTMLElement | null | undefined),
  options?: UseDropzoneOptions | UseDropzoneOptions['onDrop'],
): UseDropzoneReturn {
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [isOverDropZone, setIsOverDropZone] = React.useState(false);

  const onDrop =
    options && typeof options === 'function' ? options : options?.onDrop;
  const onEnter =
    options && typeof options !== 'function' ? options.onEnter : undefined;
  const onLeave =
    options && typeof options !== 'function' ? options.onLeave : undefined;
  const onOver =
    options && typeof options !== 'function' ? options.onOver : undefined;
  const dataTypes =
    options && typeof options !== 'function' ? options.dataTypes : undefined;

  React.useEffect(() => {
    const element = typeof target === 'function' ? target() : target.current;
    if (!element) return;

    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      setIsOverDropZone(true);
      onEnter?.(Array.from(event.dataTransfer?.files || []), event);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      onOver?.(Array.from(event.dataTransfer?.files || []), event);
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      setIsOverDropZone(false);
      onLeave?.(Array.from(event.dataTransfer?.files || []), event);
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const droppedFiles = Array.from(event.dataTransfer?.files || []);
      setFiles(droppedFiles);
      setIsOverDropZone(false);
      onDrop?.(droppedFiles, event);
    };

    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', handleDrop);

    return () => {
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('drop', handleDrop);
    };
  }, [target, onDrop, onEnter, onLeave, onOver]);

  return { files, isOverDropZone };
}

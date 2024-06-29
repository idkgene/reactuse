import { useState, useCallback, useRef, useEffect } from 'react';

interface UseFileDialogOptions {
  accept?: string;
  multiple?: boolean;
  directory?: boolean;
}

interface UseFileDialogReturn {
  files: File[] | null;
  open: () => void;
  reset: () => void;
  onChange: (callback: (files: File[]) => void) => void;
}

export function useFileDialog(
  options: UseFileDialogOptions = {},
): UseFileDialogReturn {
  const [files, setFiles] = useState<File[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeCallback = useRef<((files: File[]) => void) | null>(null);

  const open = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const reset = useCallback(() => {
    setFiles(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const onChange = useCallback((callback: (files: File[]) => void) => {
    onChangeCallback.current = callback;
  }, []);

  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.accept = options.accept ?? '';
    input.multiple = options.multiple ?? false;
    if (options.directory) {
      input.webkitdirectory = true;
    }

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        const fileList = Array.from(target.files);
        setFiles(fileList);
        onChangeCallback.current?.(fileList);
      }
    };

    inputRef.current = input;
    document.body.appendChild(input);

    return () => {
      document.body.removeChild(input);
    };
  }, [options.accept, options.multiple, options.directory]);

  return { files, open, reset, onChange };
}

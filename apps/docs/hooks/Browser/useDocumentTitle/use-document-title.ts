import { useEffect } from 'react';

interface UseDocumentTitleOptions {
  initialTitle?: string;
  formatter?: (title: string) => string;
}

export function useDocumentTitle(
  title: string,
  options: UseDocumentTitleOptions = {},
) {
  const { initialTitle, formatter } = options;

  useEffect(() => {
    const formattedTitle = formatter ? formatter(title) : title;
    if (formattedTitle) {
      document.title = formattedTitle;
    } else if (initialTitle) {
      document.title = initialTitle;
    }
  }, [title, initialTitle, formatter]);
}

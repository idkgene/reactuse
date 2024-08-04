import { useCallback, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';

interface CodeResponse {
  content: string;
}

function useCodeHighlight(
  filePath: string,
  theme: string,
): {
  code: string | null;
  highlightedCode: string | null;
  error: string | null;
} {
  const [code, setCode] = useState<string | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAndHighlightCode = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/getCode?filePath=${encodeURIComponent(filePath)}`,
      );
      if (!response.ok) {
        const errorData: { message: string } = (await response.json()) as {
          message: string;
        };
        throw new Error(
          `HTTP error! status: ${response.status.toString()}, message: ${errorData.message}`,
        );
      }
      const data: CodeResponse = (await response.json()) as CodeResponse;
      setCode(data.content);

      const html = await codeToHtml(data.content, {
        lang: 'tsx',
        theme: theme === 'dark' ? 'github-dark' : 'github-light',
        transformers: [
          {
            name: 'keep-empty-lines',
            preprocess(codeContent: string) {
              return codeContent;
            },
          },
          transformerNotationDiff(),
          transformerNotationHighlight(),
          transformerNotationWordHighlight(),
          transformerRenderWhitespace(),
        ],
      });
      setHighlightedCode(html);
      setError(null);
    } catch (err: unknown) {
      console.error(
        `Failed to load or highlight demo code for ${filePath}`,
        err,
      );
      setError(
        `Failed to load or highlight demo code: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    }
  }, [filePath, theme]);

  useEffect(() => {
    fetchAndHighlightCode().catch((err: unknown) => {
      console.error('Error in fetchAndHighlightCode:', err);
    });
  }, [fetchAndHighlightCode]);

  return { code, highlightedCode, error };
}

export { useCodeHighlight };

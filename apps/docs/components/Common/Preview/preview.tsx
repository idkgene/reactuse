'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Pre, CodeBlock } from 'fumadocs-ui/components/codeblock';
import { codeToHtml } from 'shiki';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GithubIcon } from '../Icons';
import CopyButton from '../CopyButton/copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface DemoProps {
  name: string;
  category?: string;
  className?: string;
}

interface CodeResponse {
  content: string;
}

interface ErrorData {
  message: string;
}

export function Demo({ name, category, className }: DemoProps): JSX.Element {
  const [code, setCode] = useState<string | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const toKebabCase = (str: string): string => {
    return str
      .split('')
      .map((letter, idx) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
          : letter;
      })
      .join('');
  };

  const formattedName = toKebabCase(name);
  const filePath = `hooks/${String(category)}/${String(name)}/${formattedName}.demo.tsx`;

  const DemoComponent = dynamic(
    () =>
      import(
        `@/hooks/${String(category)}/${String(name)}/${String(formattedName)}.demo`
      ),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    },
  );

  const fetchAndHighlightCode = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/getCode?filePath=${encodeURIComponent(filePath)}`,
      );
      if (!response.ok) {
        const errorData: ErrorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status.toString()}, message: ${JSON.stringify(errorData)}`,
        );
      }
      const data: CodeResponse = await response.json();
      setCode(data.content);

      const html = await codeToHtml(data.content, {
        lang: 'tsx',
        theme: theme === 'dark' ? 'github-dark' : 'github-light',
        transformers: [
          {
            name: 'keep-empty-lines',
            preprocess(codeContent) {
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
      console.error(`Failed to load or highlight demo code for ${name}`, err);
      setError(
        `Failed to load or highlight demo code: ${err instanceof Error ? err.message : 'Unknown error'}`,
      );
    }
  }, [name, filePath, theme]);

  useEffect(() => {
    fetchAndHighlightCode().catch(console.error);
  }, [fetchAndHighlightCode]);

  const githubLink = `https://github.com/changeelog/reactuse/tree/master/apps/docs/${filePath}`;

  return (
    <div
      className={cn(
        'bg-card group relative my-4 flex flex-col space-y-2',
        className,
      )}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center">
              <CopyButton value={code ?? ''} />
              <Link href={githubLink}>
                <button type="button" aria-label="View on GitHub">
                  <GithubIcon />
                </button>
              </Link>
            </div>
          </div>
          <div className={cn('mx-auto w-full px-10')}>
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <DemoComponent />
            )}
          </div>
        </TabsContent>
        <TabsContent value="code">
          {highlightedCode ? (
            <CodeBlock className="!my-0 !rounded-sm !border-none">
              <Pre>
                <div
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  className="shiki-wrapper"
                />
              </Pre>
            </CodeBlock>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>Loading...</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

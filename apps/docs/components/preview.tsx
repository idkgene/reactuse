'use client';

import { useTheme } from 'next-themes';
import { useCodeHighlight } from '../lib/use-code-highlight';
import { DemoPreview } from './demo-preview';
import { CodeView } from './code-view';
import { toKebabCase, cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DemoProps {
  name: string;
  category?: string;
  className?: string;
}

export function Demo({ name, category, className }: DemoProps): JSX.Element {
  const { theme } = useTheme();
  const formattedName = toKebabCase(name);
  const filePath = `hooks/${String(category)}/${String(name)}/${formattedName}.demo.tsx`;
  const { code, highlightedCode, error } = useCodeHighlight(filePath, theme);

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
          <DemoPreview
            code={code}
            error={error}
            githubLink={githubLink}
            name={name}
            category={category}
          />
        </TabsContent>
        <TabsContent value="code">
          <CodeView highlightedCode={highlightedCode} error={error} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

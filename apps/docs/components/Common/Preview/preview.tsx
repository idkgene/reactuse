'use client';

import * as React from 'react';
import Link from 'next/link';
import { GithubIcon } from '../Icons';
import CopyButton from '../CopyButton/copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface DemoProps {
  name: string;
  category?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Demo({ name, category, className, children }: DemoProps) {
  const [code, setCode] = React.useState<string | null>(null);
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null,
  );

  React.useEffect(() => {
    const formattedName = name
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .slice(1);
    const demoPath = `@/hooks/${category}/${name}/${formattedName}.demo`;

    import(demoPath)
      .then((module) => {
        setComponent(() => module.default);
        // Предполагаем, что исходный код экспортируется как строка с именем `sourceCode`
        setCode(module.sourceCode);
      })
      .catch((err) => {
        console.error(`Failed to load demo for ${name}`, err);
      });
  }, [category, name]);

  const baseUrl =
    'https://github.com/changeelog/reactuse/tree/master/apps/docs/hooks';
  const formattedName = name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1);
  const link = `${baseUrl}/${category}/${name}/${formattedName}.demo.tsx`;

  return (
    <div
      className={cn(
        'bg-card group relative my-4 flex flex-col space-y-2 rounded-xl border p-[2em]',
        className,
      )}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <CopyButton value={code || ''} />
              <Link href={link}>
                <button
                  type="button"
                  className="focus-visible:ring-ring border-input bg-background text-foreground hover:bg-muted hover:text-foreground relative z-10 inline-flex size-7 items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium opacity-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5"
                  aria-label="View on GitHub"
                >
                  <GithubIcon />
                </button>
              </Link>
            </div>
          </div>
          <div
            className={cn(
              'preview flex min-h-[350px] w-full items-center justify-center p-10',
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              <pre className="language-tsx">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

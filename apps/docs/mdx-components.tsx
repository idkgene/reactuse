import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import Demo from './components/Common/Demo/demo';
import Code from './components/Common/Code/code';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Demo: ({
      category,
      title,
      children,
    }: {
      category: string;
      title: string;
      children: React.ReactNode;
    }) => (
      <Demo category={category} title={title}>
        {children}
      </Demo>
    ),
    Code: ({ filePath }: { filePath: string }) => <Code filePath={filePath} />,
  };
}

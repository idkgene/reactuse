import { pageTree } from '../source';
import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { layoutProps } from '../layout.shared';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...layoutProps}
      tree={pageTree}
      sidebar={{ defaultOpenLevel: 0 }}
    >
      {children}
    </DocsLayout>
  );
}

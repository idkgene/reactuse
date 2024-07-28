import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from 'lucide-react';
import { getPage, getPages } from '@/app/source';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const MDX = page.data.exports.default;

  return (
    <DocsPage
      toc={page.data.exports.toc}
      tableOfContent={{
        footer: (
          <a
            href={`https://github.com/changeelog/reactuse/tree/master/apps/docs/content/docs/${page.file.path}`}
            rel="noreferrer noopener"
            target="_blank"
            className="ring-offset-background focus-visible:ring-ring bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <ExternalLinkIcon className="size-3" /> Edit on GitHub
          </a>
        ),
      }}
      full={page.data.full}
    >
      <DocsBody>
        <h1 className="not-prose scroll-m-20 text-3xl font-bold tracking-tight">
          {page.data.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          {page.data.description}
        </p>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}

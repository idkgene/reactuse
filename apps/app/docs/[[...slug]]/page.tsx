import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from 'lucide-react';
import { RollButton } from 'fumadocs-ui/components/roll-button';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);

  if (!page) notFound();

  const Content = page.data.exports.default;

  return (
    <DocsPage
      toc={page.data.exports.toc}
      tableOfContent={{
        footer: (
          <a
            href={`https://github.com/changeelog/reactuse/tree/master/website/content/docs/${page.file.path}`}
            rel="noreferrer noopener"
            target="_blank"
            className="inline-flex w-full items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-xs gap-1.5"
          >
            <ExternalLinkIcon className="size-3" /> Edit on GitHub
          </a>
        ),
      }}
    >
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        {page.data.title}
      </h1>
      <p className="text-muted-foreground text-lg">{page.data.description}</p>
      <DocsBody>
        <Content />
        <RollButton />
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

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: {
        url: `/og${page.url}.png`,
        width: 1200,
        height: 630,
        alt: 'Banner',
      },
      title: page.data.title,
      description: page.data.description,
    },
  } satisfies Metadata;
}

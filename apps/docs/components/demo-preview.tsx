import dynamic, { type DynamicOptions } from 'next/dynamic';
import Link from 'next/link';
import { GithubIcon } from '@/components/Icons';
import CopyButton from '@/components/copy-button';
import { cn, toKebabCase } from '@/lib/utils';

interface DemoPreviewProps {
  code: string | null;
  error: string | null;
  githubLink: string;
  name: string;
  category?: string;
}

const createDemoComponent = (
  category: string | undefined,
  name: string,
): React.ComponentType => {
  const formattedName = toKebabCase(name);

  return dynamic(
    () =>
      import(
        `@/hooks/${String(category)}/${String(name)}/${String(formattedName)}.demo`
      ) as Promise<{
        default: React.ComponentType;
      }>,
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    } as DynamicOptions,
  );
};

export function DemoPreview({
  code,
  error,
  githubLink,
  name,
  category,
}: DemoPreviewProps): JSX.Element {
  const DemoComponent = createDemoComponent(category, name);

  return (
    <>
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
      <div className={cn('mx-auto w-full px-10 py-6')}>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DemoComponent />
        )}
      </div>
    </>
  );
}

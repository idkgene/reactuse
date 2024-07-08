import Link from 'next/link';
import GithubIcon from '../Icons/github-icon';

interface DemoProps {
  children: React.ReactNode;
  category: string;
  title: string;
}

export default function Demo({
  children,
  category,
  title,
}: DemoProps): JSX.Element {
  const baseUrl =
    'https://github.com/changeelog/reactuse/tree/master/apps/docs/hooks';

  const kebabTitle = title
    .replace(/(?<lower>[a-z])(?<upper>[A-Z])/g, '$<lower>-$<upper>')
    .toLowerCase();

  const demoFile = `${kebabTitle}.demo.tsx`;
  const link = `${baseUrl}/${category}/${title}/${demoFile}`;
  return (
    <div className="bg-card relative flex flex-col rounded-xl border p-[2em]">
      <div className="absolute right-3 top-3 flex gap-1 text-sm font-semibold">
        <button
          type="button"
          className="focus-visible:ring-ring border-input bg-background text-foreground hover:bg-muted hover:text-foreground relative z-10 inline-flex size-7 items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium opacity-100 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5"
        >
          <Link href={link}>
            <GithubIcon />
          </Link>{' '}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

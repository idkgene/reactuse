import Link from 'next/link';

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
      <Link
        href={link}
        className="absolute right-3 top-3 text-sm font-semibold"
      >
        source
      </Link>
      <div>{children}</div>
    </div>
  );
}

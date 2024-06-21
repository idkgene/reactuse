import { Highlights } from '@/components/Common/withHighlight';

import { Hero } from '@/components/Common/Hero/hero';

export default function HomePage(): React.ReactElement {
  return (
    <>
      <div
        className="absolute inset-x-0 top-[200px] h-[250px] max-md:hidden"
        style={{
          background:
            'repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px), repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)',
        }}
      />
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
        <div
          style={{
            background:
              'repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)',
          }}
        >
          <div className="relative">
            <Hero />
          </div>
          <div className="container border-x border-t py-24">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">
              Hooksmaxxing is cool.
              <br />
              Download and start using easily.
            </h2>
          </div>
          <Highlights />
        </div>
      </main>
    </>
  );
}

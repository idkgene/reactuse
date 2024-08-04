import RetroGrid from './retro-grid';

export default function HeroSection(): JSX.Element {
  return (
    <section id="hero">
      <div className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden">
        <RetroGrid />
      </div>
      <h1 className="mx-6 mt-12 w-[300px] bg-gradient-to-b from-black/80 to-black bg-clip-text pb-4  text-center text-5xl font-extrabold leading-tight text-transparent md:!w-full lg:!mt-20 lg:text-6xl xl:leading-snug dark:from-white dark:to-[#AAAAAA]">
        The Ultimate Collection of React Hooks
      </h1>
      <p className="mx-auto max-h-[112px] w-[315px] text-center font-mono text-xl text-[#666666] md:max-h-[96px] md:w-[700px] md:text-xl dark:text-[#888888]">
        Install individual hooks or individual packages - the choice is yours.
      </p>
    </section>
  );
}

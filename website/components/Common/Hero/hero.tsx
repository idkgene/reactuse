import Link from 'next/link';

import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

export function Hero() {
  return (
    <div className="container relative z-[2] flex flex-col items-center overflow-hidden border-x border-t bg-background px-6 pt-12 text-center md:pt-20">
      <h1 className="mb-6 text-4xl font-semibold md:text-5xl">
        Familiar. Comfortable.
      </h1>
      <p className="mb-6 h-fit p-2 text-muted-foreground md:max-w-[80%] md:text-xl">
        Reactuse is a collection of React hooks,{' '}
        <b className="font-medium text-foreground">insipred by VueUse, </b>
        that provides a powerful set of tools for enhancing your development
        experience.
      </p>
      <div className="inline-flex items-center gap-3">
        <Link
          href="/docs/"
          className={cn(
            buttonVariants({ size: 'lg', className: 'rounded-full' })
          )}
        >
          Getting Started
        </Link>
        <a
          href="https://github.com/changeelog/reactuse"
          className={cn(
            buttonVariants({
              size: 'lg',
              variant: 'outline',
              className: 'rounded-full bg-background',
            })
          )}
        >
          View on GitHub
        </a>
      </div>
      <svg
        viewBox="0 0 500 500"
        className="mb-[-150px] mt-16 size-[300px] duration-1000 animate-in slide-in-from-bottom-[500px] dark:invert md:mb-[-250px] md:size-[500px]"
      >
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="1"
              seed="15"
              result="turbulence"
            />
            <feComposite in="SourceGraphic" in2="turbulence" operator="in" />
            <feComposite in2="SourceGraphic" operator="lighter" />
          </filter>
          <radialGradient
            id="Gradient1"
            cx="50%"
            cy="50%"
            r="80%"
            fx="10%"
            fy="10%"
          >
            <stop stopColor="white" offset="35%" />
            <stop stopColor="black" offset="100%" />
          </radialGradient>
        </defs>
        <circle
          cx="250"
          cy="250"
          r="250"
          fill="url(#Gradient1)"
          filter="url(#noiseFilter)"
        />
      </svg>
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse at top, transparent 60%, hsl(var(--primary) / 0.2))',
            'linear-gradient(to bottom, transparent 30%, hsl(var(--primary) / 0.2))',
            'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)',
            'repeating-linear-gradient(45deg, transparent,transparent 60px, hsl(var(--primary)) 61px, transparent 62px)',
          ].join(', '),
        }}
      />
    </div>
  );
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-background bg-gradient-to-b from-primary to-primary/60 text-primary-foreground shadow-inner shadow-background/20 hover:bg-primary/90',
        outline:
          'border bg-gradient-to-t from-primary/10 shadow-inner shadow-primary/10 hover:bg-accent hover:text-accent-foreground',
        secondary:
          'border bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

import localFont from 'next/font/local';

const GeistVariable = localFont({
  src: '../public/fonts/GeistVF.woff2',
  fallback: ['system-ui', 'Roboto'],
});

const GeistMonoVariable = localFont({
  src: '../public/fonts/GeistMonoVF.woff2',
  fallback: ['monospace'],
});

export { GeistVariable, GeistMonoVariable };

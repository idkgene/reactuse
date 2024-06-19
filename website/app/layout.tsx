import './global.css';
import 'fumadocs-ui/twoslash.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Common/Footer/footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      {' '}
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

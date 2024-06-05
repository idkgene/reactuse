import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { GeistVariable } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://reactuse.vercel.app'),
  title: {
    default: 'ReactUse',
    template: '%s | ReactUse',
  },
  description:
    'A collection of custom React hooks that are designed to simplify and improve your React development experience.',
  openGraph: {
    title: 'ReactUse',
    description:
      'A collection of custom React hooks that are designed to simplify and improve your React development experience.',
    url: 'https://reactuse.vercel.app',
    siteName: 'ReactUse',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'ReactUse',
    card: 'summary_large_image',
    description:
      'A collection of custom React hooks that are designed to simplify and improve your React development experience.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistVariable.className} box-border m-0 w-full min-w-[320px] min-h-[100vh] leading-[24px] text-[16px] font-normal dark:text-[#f6f7f9] text-[#23272f];
`}
      >
        <ThemeProvider
          disableTransitionOnChange
          defaultTheme="light"
          attribute="class"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

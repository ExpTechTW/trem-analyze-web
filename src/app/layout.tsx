import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TREM | 檢知報告',
  description: 'Taiwan Real-time Earthquake Monitoring ( 臺灣即時地震監測 )',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          select-none antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}

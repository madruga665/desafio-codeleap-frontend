import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CodeLeap Network',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Analytics />
      <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

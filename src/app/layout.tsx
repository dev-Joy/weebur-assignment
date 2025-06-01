import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';

const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Products',
    template: '%s | Products',
  },
  description: 'DummyJSON Products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${poppins} antialiased relative`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

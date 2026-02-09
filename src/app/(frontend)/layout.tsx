import React from 'react';
import {
  Crimson_Pro,
  Cormorant_Garamond,
  League_Spartan,
  Charm,
  Lugrasimo,
} from 'next/font/google';
import './styles.css';
import { AuthStoreProvider } from '@/providers/auth-provider';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';

const crimsonPro = Crimson_Pro({
  variable: '--font-body-serif',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const leagueSpartan = League_Spartan({
  variable: '--font-body-sans',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const charmFont = Charm({
  variable: '--font-handwriting',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const lugrasimo = Lugrasimo({
  variable: '--font-subheading',
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata = {
  description:
    'Welcome to Dungeon Delvers Inc. where we chronical the adventures and events happening my campaign world. The current campaign is the Fall of Boltztail, set in the Greyhawk setting. The seals upon ancient giants are breaking, a draconic curse tied to their origins, and machinations of evil cults are rising in this fantasy campaign world.',
  title: 'Dungeon Delvers Inc. - Greyhawk Campaign World',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${lugrasimo.variable} ${cormorantGaramond.variable} ${leagueSpartan.variable} ${charmFont.variable} antialiased`}
      >
        <AuthStoreProvider>
          <Header />
          {children}
          <Footer />
        </AuthStoreProvider>
      </body>
    </html>
  );
}
